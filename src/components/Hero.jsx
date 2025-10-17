import { useState, useCallback, useEffect } from "react"
import { Github, Linkedin, Instagram, Mail } from "lucide-react"
import { RetroElements } from "./RetroElements"
import ParticleText from "./ParticleText"
import OptimizedParticle from "./OptimizedParticle"
export function Hero() {
  const [particleMode, setParticleMode] = useState("optimized")

  // Force original ParticleText on small screens (mobile) and hide the toggle there.
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return

    const mq = window.matchMedia('(max-width: 767px)')

    const apply = (e) => {
      if (e.matches) {
        setParticleMode('original')
      }
    }

    // Initial check
    if (mq.matches) setParticleMode('original')

    // Listen for changes to handle orientation/resize
    mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply)

    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', apply) : mq.removeListener(apply)
    }
  }, [])

  const scrollToSection = useCallback((sectionId) => {
    if (typeof window === "undefined") return
    if (window.location.pathname !== "/") {
      window.location.href = `/#${sectionId}`
      return
    }
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative z-10 overflow-hidden gradient-bg-1">
      <RetroElements />

      <div className="container mx-auto relative z-10">
        {/* increase vertical spacing on mobile: more breathing room between paragraphs and particle area */}
        {/* <div className="max-w-5xl mx-auto text-center space-y-11 md:space-y-3"> */}
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-muted-foreground text-sm uppercase mb-20 md:mb-4 tracking-wider animate-fade-in-up">
            Hey, why don't you try to hover on these particles :D
          </p>

          <div className="animate-fade-in-up relative flex flex-col  mb-20 md:mb-2 items-center" style={{ animationDelay: "0.2s" }}>
            {particleMode === "optimized" ? <OptimizedParticle key="optimized" /> : <ParticleText key="original" />}

            <button
              onClick={() => setParticleMode((prev) => (prev === "optimized" ? "original" : "optimized"))}
              // Hidden on small screens; visible on md and up. Positioning preserved for larger viewports.
              className="hidden md:inline-block md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 mt-3 md:mt-0 w-auto px-2 py-1 border border-gray-600 hover:bg-primary hover:border-primary hover:text-white text-gray-600 text-xs rounded-full transition-colors shadow-lg z-10"
              aria-pressed={particleMode === "optimized"}
              aria-label="Toggle particle mode"
              type="button"
            >
              {particleMode === "optimized" ? "Switch to Original Mode" : "Switch to Optimized Mode"}
            </button>
          </div>

          <p
            className="text-lg md:text-xl mt-12 md:mt-16 text-muted-foreground mb-4 md:mb-2 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            Welcome to my personal and professional <span className="text-primary">portfolio</span>.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 hover:scale-105 transition-transform"
            >
              View My Work
            </button>
            <a
              href="/Linus Sambile_Resume.pdf"
              download="Linus Sambile_Resume.pdf"
              className="px-6 py-3 border border-border rounded-lg hover:scale-105 transition-transform bg-transparent inline-block"
            >
              Download Resume
            </a>
          </div>

          <div
            className="flex items-center justify-center gap-6 pt-8 animate-fade-in-up"
            style={{ animationDelay: "0.7s" }}
          >
            <a
              href="https://www.instagram.com/linesssky/"
              className="text-muted-foreground hover:text-primary transition-all hover:scale-125"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/lineskyyy"
              className="text-muted-foreground hover:text-primary transition-all hover:scale-125"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/linus-sambile-92ab77317/"
              className="text-muted-foreground hover:text-primary transition-all hover:scale-125"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:linus.karlcs@gmail.com"
              className="text-muted-foreground hover:text-primary transition-all hover:scale-125"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
