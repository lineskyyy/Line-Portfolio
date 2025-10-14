import { useEffect, useRef, useState } from "react";

// Color Configuration (Matching Hero.jsx aesthetic)
const COLOR_CYAN = [52, 211, 235]; // light cyan/teal
const COLOR_PURPLE = [168, 85, 247]; // medium purple
const COLOR_YELLOW = [250, 204, 21]; // yellow/amber

// Other Configuration
const LINE_DISTANCE = 60;
// 🟢 AGGRESSIVELY REDUCED: Decreased from 30 to 15 for max performance gain.
const NUM_ORBIT_PARTICLES = 15;
// 🟢 AGGRESSIVELY INCREASED: Increased from 10 to 12. Fewer text particles = less lag.
const TEXT_GAP = 12;
const MOVEMENT_SMOOTHNESS = 0.07;
const MORPH_DELAY_MAX = 60;
const TEXT_DRIFT_FORCE = 0.015;

// Function to smoothly interpolate between three RGB colors based on a value (0 to 1)
const interpolateColor = (value) => {
  let r, g, b;
  if (value < 0.5) {
    // Transition from CYAN (0) to PURPLE (0.5)
    const normalized = value / 0.5; // 0 to 1
    r = COLOR_CYAN[0] + (COLOR_PURPLE[0] - COLOR_CYAN[0]) * normalized;
    g = COLOR_CYAN[1] + (COLOR_PURPLE[1] - COLOR_CYAN[1]) * normalized;
    b = COLOR_CYAN[2] + (COLOR_PURPLE[2] - COLOR_CYAN[2]) * normalized;
  } else {
    // Transition from PURPLE (0.5) to YELLOW (1.0)
    const normalized = (value - 0.5) / 0.5; // 0 to 1
    r = COLOR_PURPLE[0] + (COLOR_YELLOW[0] - COLOR_PURPLE[0]) * normalized;
    g = COLOR_PURPLE[1] + (COLOR_YELLOW[1] - COLOR_PURPLE[1]) * normalized;
    b = COLOR_PURPLE[2] + (COLOR_YELLOW[2] - COLOR_PURPLE[2]) * normalized;
  }
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, A_VALUE)`; // A_VALUE is a placeholder
};

class Particle {
  constructor(x, y, targetX, targetY, isTextParticle = false) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.size = 1.5;
    this.isTextParticle = isTextParticle;

    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * 50 + 50;
    this.speed = Math.random() * 0.01 + 0.003;

    this.morphDelay = 0;
    this.color = `rgba(255, 255, 255, A_VALUE)`;
  }

  update(isHovered, centerX, centerY) {
    if (this.isTextParticle) {
      if (isHovered) {
        // Text particle morphing
        if (this.morphDelay > 0) {
          this.morphDelay--;
          this.vx *= 0.95;
          this.vy *= 0.95;
        } else {
          // Morph: Move towards target position with subtle drift
          const dx = this.targetX - this.x;
          const dy = this.targetY - this.y;

          this.vx = dx * MOVEMENT_SMOOTHNESS;
          this.vy = dy * MOVEMENT_SMOOTHNESS;

          this.vx += (Math.random() - 0.5) * TEXT_DRIFT_FORCE;
          this.vy += (Math.random() - 0.5) * TEXT_DRIFT_FORCE;
        }
      } else {
        // Text particles drifting
        if (this.morphDelay < MORPH_DELAY_MAX) {
          this.morphDelay = Math.floor(MORPH_DELAY_MAX * Math.random());
        }

        this.vx += (Math.random() - 0.5) * 0.2;
        this.vy += (Math.random() - 0.5) * 0.2;
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Simple boundary check for drift particles
        if (this.x < 0 || this.x > centerX * 2) this.vx *= -1;
        if (this.y < 0 || this.y > centerY * 2) this.vy *= -1;
      }
    } else {
      // Orbit particles: ALWAYS orbit, regardless of hover state
      this.angle += this.speed;

      const newX = centerX + Math.cos(this.angle) * this.radius;
      const newY = centerY + (Math.sin(this.angle) * this.radius) / 2;

      const dx = newX - this.x;
      const dy = newY - this.y;

      this.vx = dx * 0.1;
      this.vy = dy * 0.1;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx, isHovered, centerX, centerY) {
    let opacity = 0.6; // Reduced from 0.8 to 0.6 for more subtle appearance

    if (this.isTextParticle && isHovered && this.morphDelay > 0) {
      opacity = 0.6 * (1 - this.morphDelay / MORPH_DELAY_MAX);
    }

    if (this.isTextParticle && !isHovered) {
      opacity = 0.4;
    }

    // Use the particle's pre-calculated color string
    ctx.fillStyle = this.color.replace("A_VALUE", opacity.toFixed(2));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function ParticleText() {
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const particlesRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [lineOpacity, setLineOpacity] = useState(0);

  let centerX, centerY;

  /**
   * Helper function to render a line of text to the canvas and extract particle positions.
   * @param {Canvas} tempCanvas - The temporary canvas.
   * @param {CanvasRenderingContext2D} tempCtx - The temporary canvas context.
   * @param {string} text - The text string to render.
   * @param {number} yPos - The Y position for the text baseline.
   * @param {number} initialXOffset - X offset for initial random particle position.
   * @param {number} initialYOffset - Y offset for initial random particle position.
   * @returns {Array<{x: number, y: number}>} Array of target positions.
   */
  const extractTextPositions = (tempCanvas, tempCtx, text, yPos, initialXOffset, initialYOffset) => {
    tempCtx.fillText(text, tempCanvas.width / 2, yPos);

    const imageData = tempCtx.getImageData(
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    );
    const textPositions = [];

    const gap = TEXT_GAP;
    let minX = tempCanvas.width;
    let maxX = 0;

    // Pass 1: Find valid positions and X range for coloring
    for (let y = 0; y < tempCanvas.height; y += gap) {
      for (let x = 0; x < tempCanvas.width; x += gap) {
        const index = (y * tempCanvas.width + x) * 4;
        const alpha = imageData.data[index + 3];

        if (alpha > 128) {
          textPositions.push({ x, y });
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
        }
      }
    }

    const rangeX = maxX - minX;
    const newParticles = [];

    // Pass 2: Create particles, assign color and sequential delay
    textPositions.forEach(({ x, y }) => {
      const initialX = tempCanvas.width / 2 + (Math.random() - 0.5) * initialXOffset;
      const initialY = tempCanvas.height / 2 + (Math.random() - 0.5) * initialYOffset;
      const newParticle = new Particle(initialX, initialY, x, y, true);

      // Normalize X position across the entire text block for coloring
      const normalizedX = rangeX > 0 ? (x - minX) / rangeX : 0;
      newParticle.morphDelay = Math.floor(normalizedX * MORPH_DELAY_MAX);
      newParticle.color = interpolateColor(normalizedX);

      newParticles.push(newParticle);
    });

    return newParticles;
  }

  // Function to create text particles with sequential delay
  const createTextParticles = (canvas, textLines) => {
    const dpr = window.devicePixelRatio || 1;
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = canvas.width / dpr;
    tempCanvas.height = canvas.height / dpr;

    // 1. Determine Font Size
    let fontSize = Math.min(tempCanvas.width / (textLines[0].length * 0.42), 380);
    // Find the longest line to size the text
    const longestLine = textLines.reduce((a, b) => a.length > b.length ? a : b);
    fontSize = Math.min(tempCanvas.width / (longestLine.length * 0.42), 380);

    tempCtx.font = `bold ${fontSize}px Arial`;

    // Adjust for width constraint
    let textWidth = tempCtx.measureText(longestLine).width;
    if (textWidth > tempCanvas.width * 0.9) {
      fontSize *= (tempCanvas.width * 0.9) / textWidth;
      tempCtx.font = `bold ${fontSize}px Arial`;
    }

    // Cap the maximum font size
    fontSize = Math.min(fontSize, 360);
    fontSize = Math.max(fontSize, 120); // Cap the minimum font size

    tempCtx.font = `bold ${fontSize}px Arial`;
    tempCtx.fillStyle = "white";
    tempCtx.textAlign = "center";
    tempCtx.textBaseline = "middle";

    const allParticles = [];
    const lineHeight = fontSize * 1.1; // 110% of font size for line spacing
    const totalHeight = textLines.length * lineHeight;

    // Calculate the Y position for the first line to vertically center the block
    let startY = (tempCanvas.height / 2) - (totalHeight / 2) + (lineHeight / 2);

    textLines.forEach((text, index) => {
      // Clear the canvas for accurate pixel extraction for the current line
      tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

      const yPos = startY + index * lineHeight;

      // Initial scatter position offset
      const initialXOffset = 200;
      const initialYOffset = 200;

      const particles = extractTextPositions(tempCanvas, tempCtx, text, yPos, initialXOffset, initialYOffset);
      allParticles.push(...particles);
    });

    // Re-calculate morph delay and color based on the *entire* text block's X range
    // This ensures smooth color transition across both lines.
    let minX = tempCanvas.width;
    let maxX = 0;
    allParticles.forEach(p => {
        minX = Math.min(minX, p.targetX);
        maxX = Math.max(maxX, p.targetX);
    });

    const rangeX = maxX - minX;

    allParticles.forEach(p => {
        const normalizedX = rangeX > 0 ? (p.targetX - minX) / rangeX : 0;
        p.morphDelay = Math.floor(normalizedX * MORPH_DELAY_MAX);
        p.color = interpolateColor(normalizedX);
    });


    return allParticles;
  };

  const createOrbitParticles = (canvas) => {
    const dpr = window.devicePixelRatio || 1;
    const particles = [];
    centerX = canvas.width / dpr / 2;
    centerY = canvas.height / dpr / 2;

    for (let i = 0; i < NUM_ORBIT_PARTICLES; i++) {
      const p = new Particle(centerX, centerY);
      p.angle = Math.random() * Math.PI * 2;
      p.radius = Math.random() * 50 + 50;
      p.x = centerX + Math.cos(p.angle) * p.radius;
      p.y = centerY + (Math.sin(p.angle) * p.radius) / 2;

      p.color = `rgba(${COLOR_PURPLE.join(",")}, A_VALUE)`;

      particles.push(p);
    }
    return particles;
  };

  // Draw lines every frame, using the faded-in opacity state
  const drawLines = (ctx, isHovered, lineOpacity) => {
    // Lines are HIDDEN on hover
    if (isHovered) return;

    ctx.beginPath();

    // Use Cyan color for the lines, with the lineOpacity state controlling fade
    ctx.strokeStyle = `rgba(${COLOR_CYAN.join(",")}, ${lineOpacity * 0.1})`;
    ctx.lineWidth = 1;

    const particles = particlesRef.current;
    if (!particles) return;

    const LINE_DIST_SQ = LINE_DISTANCE * LINE_DISTANCE;

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distanceSq = dx * dx + dy * dy;

        // The logic for drawing lines scales with the SQUARE of the number of particles (n^2).
        // By reducing the particle count, we get a huge performance gain here.
        if (distanceSq < LINE_DIST_SQ) {
          const distance = Math.sqrt(distanceSq);
          const opacity = 1 - distance / LINE_DISTANCE;
          ctx.globalAlpha = opacity;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      }
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    let particlesInitialized = particlesRef.current !== null;

    // Define the desired text lines here
    const TEXT_LINES = ["Welcome,", "I'm LINUS"];

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);

      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      centerX = canvas.width / dpr / 2;
      centerY = canvas.height / dpr / 2;

      if (!particlesInitialized) {
        // Pass the array of lines to the updated function
        const textParticles = createTextParticles(canvas, TEXT_LINES);
        const orbitParticles = createOrbitParticles(canvas);
        particlesRef.current = [...textParticles, ...orbitParticles];
        particlesInitialized = true;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      if (lineOpacity < 1) {
        setLineOpacity((prev) => Math.min(1, prev + 0.01));
      }

      drawLines(ctx, isHovered, lineOpacity);

      const particles = particlesRef.current;
      if (particles) {
        particles.forEach((particle) => {
          particle.update(isHovered, centerX, centerY);
          particle.draw(ctx, isHovered, centerX, centerY);
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, lineOpacity]);

  return (
    <canvas
      ref={canvasRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-auto h-[250px] md:h-[550px] cursor-pointer mx-auto"
    />
  );
}