"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "../contexts/ThemeContext"

// Dark mode colors (bright)
const COLOR_CYAN_DARK = [52, 211, 235] // light cyan/teal
const COLOR_PURPLE_DARK = [168, 85, 247] // medium purple
const COLOR_YELLOW_DARK = [250, 204, 21] // yellow/amber

// Light mode colors (darker versions)
const COLOR_CYAN_LIGHT = [6, 182, 212] // darker cyan
const COLOR_PURPLE_LIGHT = [126, 34, 206] // darker purple
const COLOR_YELLOW_LIGHT = [202, 138, 4] // darker yellow

const LINE_DISTANCE = 60
const NUM_ORBIT_PARTICLES = 5 // Reduced from 10 to 5 for lighter performance
const TEXT_GAP = 18 // Increased from 8 to 18 to greatly reduce text particles
const MOVEMENT_SMOOTHNESS = 0.07
const MORPH_DELAY_MAX = 60
const TEXT_DRIFT_FORCE = 0.015

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
    this.size = 2 // Increased base size from 1.5 to 2 for better visibility
    this.isTextParticle = isTextParticle

    this.angle = Math.random() * Math.PI * 2
    this.radius = Math.random() * 50 + 50
    this.speed = Math.random() * 0.01 + 0.003

    this.morphDelay = 0
    this.color = `rgba(255, 255, 255, A_VALUE)`
  }

  update(isHovered, centerX, centerY) {
    if (this.isTextParticle) {
      if (isHovered) {
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
      } else {
        if (this.morphDelay < MORPH_DELAY_MAX) {
          this.morphDelay = Math.floor(MORPH_DELAY_MAX * Math.random())
        }

        this.vx += (Math.random() - 0.5) * 0.2
        this.vy += (Math.random() - 0.5) * 0.2
        this.vx *= 0.98
        this.vy *= 0.98

        if (this.x < 0 || this.x > centerX * 2) this.vx *= -1
        if (this.y < 0 || this.y > centerY * 2) this.vy *= -1
      }
    } else {
      this.angle += this.speed

      const newX = centerX + Math.cos(this.angle) * this.radius
      const newY = centerY + (Math.sin(this.angle) * this.radius) / 2

      const dx = newX - this.x
      const dy = newY - this.y

      this.vx = dx * 0.1
      this.vy = dy * 0.1
    }

    this.x += this.vx
    this.y += this.vy
  }

  draw(ctx, isHovered, centerX, centerY) {
    let opacity = 0.6

    if (this.isTextParticle && isHovered && this.morphDelay > 0) {
      opacity = 0.6 * (1 - this.morphDelay / MORPH_DELAY_MAX)
    }

    if (this.isTextParticle && !isHovered) {
      opacity = 0.4
    }

    const drawSize = this.isTextParticle && isHovered ? this.size * 1.6 : this.size

    ctx.fillStyle = this.color.replace("A_VALUE", opacity.toFixed(2))
    ctx.beginPath()
    ctx.arc(this.x, this.y, drawSize, 0, Math.PI * 2)
    ctx.fill()
  }
}

export default function ParticleText() {
  const canvasRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const particlesRef = useRef(null)
  const animationFrameRef = useRef(null)
  const [lineOpacity, setLineOpacity] = useState(0)
  const { theme } = useTheme()

  let centerX, centerY

  const extractTextPositions = (tempCanvas, tempCtx, text, yPos, initialXOffset, initialYOffset, theme) => {
    tempCtx.fillText(text, tempCanvas.width / 2, yPos)

    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
    const textPositions = []

    const gap = TEXT_GAP
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

      newParticles.push(newParticle)
    })

    return newParticles
  }

  const createTextParticles = (canvas, textLines, theme) => {
    const dpr = window.devicePixelRatio || 1
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

      const particles = extractTextPositions(tempCanvas, tempCtx, text, yPos, initialXOffset, initialYOffset, theme)
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

  const createOrbitParticles = (canvas, theme) => {
    const dpr = window.devicePixelRatio || 1
    const particles = []
    centerX = canvas.width / dpr / 2
    centerY = canvas.height / dpr / 2

    const COLOR_PURPLE = theme === "light" ? COLOR_PURPLE_LIGHT : COLOR_PURPLE_DARK

    for (let i = 0; i < NUM_ORBIT_PARTICLES; i++) {
      const p = new Particle(centerX, centerY)
      p.angle = Math.random() * Math.PI * 2
      p.radius = Math.random() * 50 + 50
      p.x = centerX + Math.cos(p.angle) * p.radius
      p.y = centerY + (Math.sin(p.angle) * p.radius) / 2

      p.color = `rgba(${COLOR_PURPLE.join(",")}, A_VALUE)`

      particles.push(p)
    }
    return particles
  }

  const drawLines = (ctx, isHovered, lineOpacity, theme) => {
    if (isHovered) return

    ctx.beginPath()

    const COLOR_CYAN = theme === "light" ? COLOR_CYAN_LIGHT : COLOR_CYAN_DARK
    ctx.strokeStyle = `rgba(${COLOR_CYAN.join(",")}, ${lineOpacity * 0.1})`
    ctx.lineWidth = 1

    const particles = particlesRef.current
    if (!particles) return

    const LINE_DIST_SQ = LINE_DISTANCE * LINE_DISTANCE

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i]
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const distanceSq = dx * dx + dy * dy

        if (distanceSq < LINE_DIST_SQ) {
          const distance = Math.sqrt(distanceSq)
          const opacity = 1 - distance / LINE_DISTANCE
          ctx.globalAlpha = opacity
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
        }
      }
    }
    ctx.stroke()
    ctx.globalAlpha = 1
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const dpr = window.devicePixelRatio || 1

    let particlesInitialized = particlesRef.current !== null

    const TEXT_LINES = ["L1N3'S", "W0RLD"]

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      ctx.scale(dpr, dpr)

      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"

      centerX = canvas.width / dpr / 2
      centerY = canvas.height / dpr / 2

      if (!particlesInitialized) {
        const textParticles = createTextParticles(canvas, TEXT_LINES, theme)
        const orbitParticles = createOrbitParticles(canvas, theme)
        particlesRef.current = [...textParticles, ...orbitParticles]
        particlesInitialized = true
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

      if (lineOpacity < 1) {
        setLineOpacity((prev) => Math.min(1, prev + 0.01))
      }

      drawLines(ctx, isHovered, lineOpacity, theme)

      const particles = particlesRef.current
      if (particles) {
        particles.forEach((particle) => {
          particle.update(isHovered, centerX, centerY)
          particle.draw(ctx, isHovered, centerX, centerY)
        })
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isHovered, lineOpacity, theme])

  return (
    <canvas
      ref={canvasRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-auto h-[250px] md:h-[550px] cursor-pointer mx-auto"
    />
  )
}
