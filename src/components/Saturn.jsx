import { useEffect, useRef, useState } from "react"

// Configuration
const PARTICLE_COUNT = 1500
const RING_THICKNESS = 10 
const SATURN_RADIUS = 100
const RING_RADIUS = 150
const RING_SPEED = 0.005 // Speed of the ring rotation
const MOVEMENT_SMOOTHNESS = 0.05
const BASE_OPACITY = 0.9

// MODIFIED: Significantly increased force to make the particles visibly "scatter"
const SCATTERING_DRIFT_FORCE = 0.5 

// Particle class
class Particle {
  constructor(x, y, targetX, targetY, isRingParticle = false) {
    this.x = x
    this.y = y
    this.targetX = targetX
    this.targetY = targetY
    this.vx = (Math.random() - 0.5) * 4
    this.vy = (Math.random() - 0.5) * 4
    this.size = 1.0 // Smaller particles for detail
    this.isRingParticle = isRingParticle
    
    // Properties for random movement when not formed
    this.angle = Math.random() * Math.PI * 2 
    this.radius = Math.random() * 50 + 50 
    this.speed = Math.random() * 0.005 + 0.001 
  }

  update(isHovered, centerX, centerY, currentRingRotation) {
    if (isHovered) {
      // 1. Hovered: Form Saturn and Rotate Ring
      
      let targetX = this.targetX
      let targetY = this.targetY
      
      if (this.isRingParticle) {
        // Apply continuous rotation to ring particles' target coordinates
        const dx = this.targetX - centerX
        const dy = this.targetY - centerY
        const dist = Math.sqrt(dx*dx + dy*dy)
        const angle = Math.atan2(dy, dx) + currentRingRotation; // Add rotation
        
        // Ring targets rotate around the center
        targetX = centerX + Math.cos(angle) * dist
        targetY = centerY + Math.sin(angle) * dist * 0.3 // Use 0.3 for elliptical ring
      }
      
      // Morph: Move towards the dynamic target position
      const dx = targetX - this.x
      const dy = targetY - this.y
      this.vx = dx * MOVEMENT_SMOOTHNESS
      this.vy = dy * MOVEMENT_SMOOTHNESS
      
    } else {
      // 2. Not Hovered: Smooth Orbital movement with significant SCATTERING drift
      this.angle += this.speed
      
      const newX = centerX + Math.cos(this.angle) * this.radius
      const newY = centerY + Math.sin(this.angle) * this.radius / 2 
      
      const dx = newX - this.x
      const dy = newY - this.y
      
      // Base velocity for smooth circular orbit
      this.vx = dx * 0.1 
      this.vy = dy * 0.1
      
      // ADD SCATTERING: Significant random noise
      this.vx += (Math.random() - 0.5) * SCATTERING_DRIFT_FORCE
      this.vy += (Math.random() - 0.5) * SCATTERING_DRIFT_FORCE
      
      // Damping to keep movement from accelerating out of control
      this.vx *= 0.98 
      this.vy *= 0.98
    }

    this.x += this.vx
    this.y += this.vy
  }

  draw(ctx) { 
    ctx.fillStyle = `rgba(255, 255, 255, ${BASE_OPACITY})`;
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

export default function Saturn() {
  const canvasRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const particlesRef = useRef([])
  const animationFrameRef = useRef(null)
  const ringRotationRef = useRef(0) // Track ring rotation angle
  
  let centerX, centerY; 

  const createSaturnParticles = (canvas) => {
    const dpr = window.devicePixelRatio || 1
    const particles = []
    
    centerX = canvas.width / dpr / 2
    centerY = canvas.height / dpr / 2
    
    const totalParticles = PARTICLE_COUNT; 
    const ringRatio = 0.4; // 40% of particles form the ring
    const numRingParticles = Math.floor(totalParticles * ringRatio);
    const numSaturnParticles = totalParticles - numRingParticles;

    // --- 1. Create SATURN (Body) Particles ---
    for (let i = 0; i < numSaturnParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.sqrt(Math.random()) * SATURN_RADIUS;
        
        const targetX = centerX + Math.cos(angle) * dist;
        const targetY = centerY + Math.sin(angle) * dist;
        
        const initialX = centerX + (Math.random() - 0.5) * 300;
        const initialY = centerY + (Math.random() - 0.5) * 300;
        
        particles.push(new Particle(initialX, initialY, targetX, targetY, false));
    }

    // --- 2. Create RING Particles ---
    for (let i = 0; i < numRingParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = RING_RADIUS - (RING_THICKNESS / 2) + Math.random() * RING_THICKNESS; 
        
        const targetX = centerX + Math.cos(angle) * dist;
        const targetY = centerY + Math.sin(angle) * dist * 0.3; // Elliptical projection
        
        const initialX = centerX + (Math.random() - 0.5) * 300;
        const initialY = centerY + (Math.random() - 0.5) * 300;

        particles.push(new Particle(initialX, initialY, targetX, targetY, true));
    }
    
    return particles
  }


  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const dpr = window.devicePixelRatio || 1
    let particlesInitialized = particlesRef.current.length > 0;

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
          particlesRef.current = createSaturnParticles(canvas)
          particlesInitialized = true;
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr); 
      
      if (isHovered) {
          ringRotationRef.current += RING_SPEED; 
          
          // Draw the solid Saturn body and ring for visual depth
          // Draw the ring ellipse (front half) - Darker color for perspective
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, RING_RADIUS + RING_THICKNESS/2, (RING_RADIUS + RING_THICKNESS/2) * 0.3, 0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(30, 30, 30, 0.5)';
          ctx.fill();
          
          // Draw the Saturn body (sphere)
          ctx.beginPath();
          ctx.arc(centerX, centerY, SATURN_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(50, 50, 50, 0.8)';
          ctx.fill();

          // Draw the ring ellipse (back half) - Lighter color
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, RING_RADIUS + RING_THICKNESS/2, (RING_RADIUS + RING_THICKNESS/2) * 0.3, 0, 0, Math.PI);
          ctx.fillStyle = 'rgba(70, 70, 70, 0.5)';
          ctx.fill();
      }

      particlesRef.current.forEach((particle) => {
        particle.update(isHovered, centerX, centerY, ringRotationRef.current)
        particle.draw(ctx) 
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isHovered]) 

  return (
    <canvas
      ref={canvasRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute top-0 left-0 w-full h-full cursor-pointer"
    />
  )
}