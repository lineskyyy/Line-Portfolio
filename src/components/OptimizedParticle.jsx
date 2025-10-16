import { useEffect, useRef, useState } from "react"
import { useTheme } from "../contexts/ThemeContext"

// Dark mode colors (bright)
const COLOR_CYAN_DARK = [52, 211, 235]
const COLOR_PURPLE_DARK = [168, 85, 247]
const COLOR_YELLOW_DARK = [250, 204, 21]

// Light mode colors (darker versions)
const COLOR_CYAN_LIGHT = [6, 182, 212]
const COLOR_PURPLE_LIGHT = [126, 34, 206]
const COLOR_YELLOW_LIGHT = [202, 138, 4]

const LINE_DISTANCE = 60
const MOVEMENT_SMOOTHNESS = 0.07
const MORPH_DELAY_MAX = 60
const TEXT_DRIFT_FORCE = 0.015
const TRANSITION_SMOOTHNESS = 0.08

const getDeviceSettings = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const cores = navigator.hardwareConcurrency || 2
  const isLowEnd = isMobile || cores <= 4

  return {
    textGap: isLowEnd ? 24 : 18,
    orbitParticles: isLowEnd ? 3 : 5,
    enableLines: !isLowEnd,
    targetFPS: isLowEnd ? 30 : 60,
    canvasScale: isLowEnd ? 0.75 : 1,
  }
}

const interpolateColor = (value, theme = "dark") => {
  const COLOR_CYAN = theme === "light" ? COLOR_CYAN_LIGHT : COLOR_CYAN_DARK
  const COLOR_PURPLE = theme === "light" ? COLOR_PURPLE_LIGHT : COLOR_PURPLE_DARK
  const COLOR_YELLOW = theme === "light" ? COLOR_YELLOW_LIGHT : COLOR_YELLOW_DARK

  let r, g, b
  if (value < 0.5) {
    const normalized = value / 0.5
    r = COLOR_CYAN[0] + (COLOR_PURPLE[0] - COLOR_CYAN[0]) * normalized
    g = COLOR_CYAN[1] + (COLOR_PURPLE[1] - COLOR_CYAN[1]) * normalized
    b = COLOR_CYAN[2] + (COLOR_PURPLE[2] - COLOR_CYAN[2]) * normalized
  } else {
    const normalized = (value - 0.5) / 0.5
    r = COLOR_PURPLE[0] + (COLOR_YELLOW[0] - COLOR_PURPLE[0]) * normalized
    g = COLOR_PURPLE[1] + (COLOR_YELLOW[1] - COLOR_PURPLE[1]) * normalized
    b = COLOR_PURPLE[2] + (COLOR_YELLOW[2] - COLOR_PURPLE[2]) * normalized
  }
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, A_VALUE)`
}

class Particle {
  constructor(x, y, targetX, targetY, isTextParticle = false) {
    this.x = x
    this.y = y
    this.targetX = targetX
    this.targetY = targetY
    this.vx = (Math.random() - 0.5) * 4
    this.vy = (Math.random() - 0.5) * 4
    this.size = 2
    this.isTextParticle = isTextParticle

    // Fixed orbit parameters for performance
    this.orbitRadius = Math.random() * 150 + 50
    this.orbitAngle = Math.random() * Math.PI * 2
    this.orbitSpeed = (Math.random() - 0.5) * 0.02 + 0.01
    this.orbitTilt = Math.random() * 0.6 + 0.3
    this.orbitPhase = Math.random() * Math.PI * 2
    this.orbitCenterX = 0
    this.orbitCenterY = 0

    this.morphDelay = 0
    this.color = `rgba(255, 255, 255, A_VALUE)`

    this.isTransitioning = false
    this.transitionProgress = 0
  }

  setOrbitCenter(centerX, centerY) {
    this.orbitCenterX = centerX
    this.orbitCenterY = centerY
  }

  update(isHovered, centerX, centerY) {
    if (this.isTextParticle) {
      if (isHovered) {
        this.isTransitioning = false
        this.transitionProgress = 0

        if (this.morphDelay > 0) {
          this.morphDelay--
          this.vx *= 0.95
          this.vy *= 0.95
        } else {
          const dx = this.targetX - this.x
          const dy = this.targetY - this.y

          this.vx = dx * MOVEMENT_SMOOTHNESS
          this.vy = dy * MOVEMENT_SMOOTHNESS

          this.vx += (Math.random() - 0.5) * TEXT_DRIFT_FORCE
          this.vy += (Math.random() - 0.5) * TEXT_DRIFT_FORCE
        }

        this.x += this.vx
        this.y += this.vy
      } else {
        if (!this.isTransitioning) {
          this.isTransitioning = true
          this.transitionProgress = 0
        }

        if (this.transitionProgress < 1) {
          this.transitionProgress += TRANSITION_SMOOTHNESS
          this.transitionProgress = Math.min(1, this.transitionProgress)

          const targetOrbitX = this.orbitCenterX + Math.cos(this.orbitAngle + this.orbitPhase) * this.orbitRadius
          const targetOrbitY =
            this.orbitCenterY + Math.sin(this.orbitAngle + this.orbitPhase) * this.orbitRadius * this.orbitTilt

          this.x += (targetOrbitX - this.x) * this.transitionProgress * 0.15
          this.y += (targetOrbitY - this.y) * this.transitionProgress * 0.15

          this.orbitAngle += this.orbitSpeed * this.transitionProgress
        } else {
          this.orbitAngle += this.orbitSpeed
          this.x = this.orbitCenterX + Math.cos(this.orbitAngle + this.orbitPhase) * this.orbitRadius
          this.y = this.orbitCenterY + Math.sin(this.orbitAngle + this.orbitPhase) * this.orbitRadius * this.orbitTilt
        }

        if (this.morphDelay < MORPH_DELAY_MAX) {
          this.morphDelay = Math.floor(MORPH_DELAY_MAX * Math.random())
        }
      }
    } else {
      // Non-text particles use simple circular motion
      this.orbitAngle += this.orbitSpeed

      this.x = centerX + Math.cos(this.orbitAngle) * this.orbitRadius
      this.y = centerY + Math.sin(this.orbitAngle) * this.orbitRadius * this.orbitTilt
    }
  }

  draw(ctx, isHovered, centerX, centerY) {
    // Base opacity and increased contrast/size on hover for text-shaped particles
    let opacity = 0.6

    if (this.isTextParticle && isHovered && this.morphDelay > 0) {
      opacity = 0.6 * (1 - this.morphDelay / MORPH_DELAY_MAX)
    }

    if (this.isTextParticle && !isHovered) {
      opacity = 0.4
    }

    // When hovered, increase prominence but keep modest to avoid heavy rendering
    // Final tuned hover: modest boost to reduce lag
    if (this.isTextParticle && isHovered) {
      opacity = Math.max(opacity, 0.78)
    }

    const drawSize = this.isTextParticle && isHovered ? this.size * 1.2 : this.size

    // Skip heavy shadow effects on low-end devices to preserve performance
    const cores = navigator.hardwareConcurrency || 2
    const isLowEndDevice = cores <= 4 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    ctx.save()
    if (this.isTextParticle && isHovered && !isLowEndDevice) {
      const glowColor = this.color.replace("A_VALUE", "0.8")
      ctx.shadowColor = glowColor
      ctx.shadowBlur = 3
    } else {
      ctx.shadowBlur = 0
    }

    ctx.fillStyle = this.color.replace("A_VALUE", opacity.toFixed(2))
    ctx.beginPath()
    ctx.arc(this.x, this.y, drawSize, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

export default function OptimizedParticle() {
  const canvasRef = useRef(null)
  // Use refs for hover and line opacity inside the animation loop to avoid
  // re-creating the entire effect when these change (prevents blinking).
  // Keep a small React state for `isHovered` so event handlers have a setter
  // (re-renders are cheap and the animation effect is mounted once).
  const isHoveredRef = useRef(false)
  const [isHovered, setIsHovered] = useState(false)
  const [lineOpacity, setLineOpacity] = useState(0)
  const lineOpacityRef = useRef(0)
  const particlesRef = useRef(null)
  const animationFrameRef = useRef(null)
  const { theme } = useTheme()

  const deviceSettingsRef = useRef(getDeviceSettings())
  const lastFrameTimeRef = useRef(0)

  let centerX, centerY

  const extractTextPositions = (tempCanvas, tempCtx, text, yPos, initialXOffset, initialYOffset, theme, textGap) => {
    tempCtx.fillText(text, tempCanvas.width / 2, yPos)

    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
    const textPositions = []

    const gap = textGap
    let minX = tempCanvas.width
    let maxX = 0

    for (let y = 0; y < tempCanvas.height; y += gap) {
      for (let x = 0; x < tempCanvas.width; x += gap) {
        const index = (y * tempCanvas.width + x) * 4
        const alpha = imageData.data[index + 3]

        if (alpha > 128) {
          textPositions.push({ x, y })
          minX = Math.min(minX, x)
          maxX = Math.max(maxX, x)
        }
      }
    }

    const rangeX = maxX - minX
    const newParticles = []

    textPositions.forEach(({ x, y }) => {
      const initialX = tempCanvas.width / 2 + (Math.random() - 0.5) * initialXOffset
      const initialY = tempCanvas.height / 2 + (Math.random() - 0.5) * initialYOffset
      const newParticle = new Particle(initialX, initialY, x, y, true)

      const normalizedX = rangeX > 0 ? (x - minX) / rangeX : 0
      newParticle.morphDelay = Math.floor(normalizedX * MORPH_DELAY_MAX)
      newParticle.color = interpolateColor(normalizedX, theme)

      newParticle.setOrbitCenter(tempCanvas.width / 2, tempCanvas.height / 2)

      newParticles.push(newParticle)
    })

    return newParticles
  }

  const createTextParticles = (canvas, textLines, theme, textGap) => {
    const dpr = deviceSettingsRef.current.canvasScale
    const tempCanvas = document.createElement("canvas")
    const tempCtx = tempCanvas.getContext("2d")

    tempCanvas.width = canvas.width / dpr
    tempCanvas.height = canvas.height / dpr

    let fontSize = Math.min(tempCanvas.width / (textLines[0].length * 0.42), 380)
    const longestLine = textLines.reduce((a, b) => (a.length > b.length ? a : b))
    fontSize = Math.min(tempCanvas.width / (longestLine.length * 0.42), 380)

    tempCtx.font = `bold ${fontSize}px Arial`

    const textWidth = tempCtx.measureText(longestLine).width
    if (textWidth > tempCanvas.width * 0.9) {
      fontSize *= (tempCanvas.width * 0.9) / textWidth
      tempCtx.font = `bold ${fontSize}px Arial`
    }

    fontSize = Math.min(fontSize, 280)
    fontSize = Math.max(fontSize, 120)

    tempCtx.font = `bold ${fontSize}px Arial`
    tempCtx.fillStyle = "white"
    tempCtx.textAlign = "center"
    tempCtx.textBaseline = "middle"

    const allParticles = []
    const lineHeight = fontSize * 1.1
    const totalHeight = textLines.length * lineHeight

    const startY = tempCanvas.height / 2 - totalHeight / 2 + lineHeight / 2

    textLines.forEach((text, index) => {
      tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height)

      const yPos = startY + index * lineHeight

      const initialXOffset = 200
      const initialYOffset = 200

      const particles = extractTextPositions(
        tempCanvas,
        tempCtx,
        text,
        yPos,
        initialXOffset,
        initialYOffset,
        theme,
        textGap,
      )
      allParticles.push(...particles)
    })

    let minX = tempCanvas.width
    let maxX = 0
    allParticles.forEach((p) => {
      minX = Math.min(minX, p.targetX)
      maxX = Math.max(maxX, p.targetX)
    })

    const rangeX = maxX - minX

    allParticles.forEach((p) => {
      const normalizedX = rangeX > 0 ? (p.targetX - minX) / rangeX : 0
      p.morphDelay = Math.floor(normalizedX * MORPH_DELAY_MAX)
      p.color = interpolateColor(normalizedX, theme)
    })

    return allParticles
  }

  const createOrbitParticles = (canvas, theme, numParticles) => {
    const dpr = deviceSettingsRef.current.canvasScale
    const particles = []
    centerX = canvas.width / dpr / 2
    centerY = canvas.height / dpr / 2

    const COLOR_PURPLE = theme === "light" ? COLOR_PURPLE_LIGHT : COLOR_PURPLE_DARK

    for (let i = 0; i < numParticles; i++) {
      const p = new Particle(centerX, centerY, centerX, centerY, false)

      p.orbitAngle = Math.random() * Math.PI * 2
      p.orbitRadius = Math.random() * 100 + 80
      p.orbitSpeed = (Math.random() - 0.5) * 0.015 + 0.008
      p.orbitTilt = Math.random() * 0.5 + 0.4
      p.x = centerX + Math.cos(p.orbitAngle) * p.orbitRadius
      p.y = centerY + Math.sin(p.orbitAngle) * p.orbitRadius * p.orbitTilt

      p.color = `rgba(${COLOR_PURPLE.join(",")}, A_VALUE)`

      particles.push(p)
    }
    return particles
  }

  const drawLines = (ctx, isHovered, lineOpacity, theme, enableLines) => {
    if (isHovered || !enableLines) return

    const particles = particlesRef.current
    if (!particles) return

    const COLOR_CYAN = theme === "light" ? COLOR_CYAN_LIGHT : COLOR_CYAN_DARK
    ctx.lineWidth = 0.8

    const LINE_DIST_SQ = LINE_DISTANCE * LINE_DISTANCE
    let linesDrawn = 0
    const MAX_LINES = 120

    const connections = []

    for (let i = 0; i < particles.length && linesDrawn < MAX_LINES; i++) {
      const p1 = particles[i]
      for (let j = i + 1; j < particles.length && linesDrawn < MAX_LINES; j++) {
        const p2 = particles[j]
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const distanceSq = dx * dx + dy * dy

        if (distanceSq < LINE_DIST_SQ) {
          const shouldDraw = Math.random() > 0.3
          if (shouldDraw) {
            const distance = Math.sqrt(distanceSq)
            connections.push({ p1, p2, distance })
            linesDrawn++
          }
        }
      }
    }

    connections.forEach(({ p1, p2, distance }) => {
      const baseOpacity = 0.15
      const opacity = (1 - distance / LINE_DISTANCE) * lineOpacity * baseOpacity
      ctx.strokeStyle = `rgba(${COLOR_CYAN.join(",")}, ${opacity})`
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.stroke()
    })
  }

  // Main mount effect: set up canvas and animation loop once to avoid
  // tearing down/recreating on every small state change which causes blink.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true })
    const settings = deviceSettingsRef.current
    const dpr = settings.canvasScale

    let particlesInitialized = particlesRef.current !== null

  // Use a shorter word on mobile/low-end devices where particle density is lower
  const cores = navigator.hardwareConcurrency || 2
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const TEXT_LINES = isMobileUA || cores <= 4 ? ["HI"] : ["L1N3'S", "W0RLD"]

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      // reset transform and set an explicit scale so we don't accumulate
      // multiple scales when the effect runs multiple times
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"

      centerX = canvas.width / dpr / 2
      centerY = canvas.height / dpr / 2

      if (!particlesInitialized) {
        const textParticles = createTextParticles(canvas, TEXT_LINES, theme, settings.textGap)
        const orbitParticles = createOrbitParticles(canvas, theme, settings.orbitParticles)
        particlesRef.current = [...textParticles, ...orbitParticles]
        particlesInitialized = true
      } else {
        // update orbit centers when resizing
        const particles = particlesRef.current
        if (particles) {
          particles.forEach((p) => p.setOrbitCenter(centerX, centerY))
        }
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const frameInterval = 1000 / settings.targetFPS

    const animate = (currentTime) => {
      const elapsed = currentTime - lastFrameTimeRef.current

      if (elapsed > frameInterval) {
        lastFrameTimeRef.current = currentTime - (elapsed % frameInterval)

        // clear with device-pixel-correct dimensions
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

        // update line opacity in a ref to avoid re-running this effect
        if (lineOpacityRef.current < 1) {
          lineOpacityRef.current = Math.min(1, lineOpacityRef.current + 0.01)
          // update React state occasionally so UI-consumers can read a stable value
          if (Math.abs(lineOpacityRef.current - lineOpacity) > 0.03) {
            setLineOpacity(lineOpacityRef.current)
          }
        }

        drawLines(ctx, isHoveredRef.current, lineOpacityRef.current, theme, settings.enableLines)

        const particles = particlesRef.current
        if (particles) {
          particles.forEach((particle) => {
            particle.update(isHoveredRef.current, centerX, centerY)
            particle.draw(ctx, isHoveredRef.current, centerX, centerY)
          })
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
    // Intentionally run on mount only. Theme changes are handled in a
    // separate, lightweight effect below to recolor particles without
    // recreating the canvas/loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // When theme changes, recolor text/particles in-place for a smooth update
  useEffect(() => {
    const particles = particlesRef.current
    if (!particles) return

    // Recompute colors for text particles based on their targetX position
    let minX = Infinity
    let maxX = -Infinity
    particles.forEach((p) => {
      if (p.isTextParticle) {
        minX = Math.min(minX, p.targetX)
        maxX = Math.max(maxX, p.targetX)
      }
    })
    const rangeX = maxX - minX

    particles.forEach((p) => {
      if (p.isTextParticle) {
        const normalizedX = rangeX > 0 ? (p.targetX - minX) / rangeX : 0
        p.color = interpolateColor(normalizedX, theme)
      }
    })
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      onPointerEnter={() => {
        isHoveredRef.current = true
        setIsHovered(true)
      }}
      onPointerLeave={() => {
        isHoveredRef.current = false
        setIsHovered(false)
      }}
      onTouchStart={() => {
        // treat a touch start as a hover-equivalent
        isHoveredRef.current = true
        setIsHovered(true)
      }}
      onTouchEnd={() => {
        isHoveredRef.current = false
        setIsHovered(false)
      }}
      className="block w-full max-w-[900px] h-[180px] sm:h-[250px] md:h-[550px] cursor-pointer mx-auto"
      style={{ willChange: "transform" }}
    />
  )
}
