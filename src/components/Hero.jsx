import { Github, Linkedin, Instagram, Mail } from "lucide-react"
import { RetroElements } from "./RetroElements"
import ParticleText from "./ParticleText"

const scrollToSection = (sectionId) => {
  if (location.pathname !== "/") {
    window.location.href = `/#${sectionId}`
  } else {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
}

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative z-10 overflow-hidden gradient-bg-1">
      <RetroElements />

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <p className="text-muted-foreground text-sm uppercase tracking-wider animate-fade-in-up">
            Hey, why don't you try to hover on these particles :D
          </p>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <ParticleText />
          </div>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            Welcome to my <span className="text-primary">personal</span>{" "}and{" "}
            <span className="text-accent">professional</span>{" "}<span className="text-secondary">portfolio</span>.
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
              href="/resume.pdf"
              download="Linus_Sambile_Resume.pdf"
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
              aria-label="Twitter"
              target="_blank"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/lineskyyy"
              className="text-muted-foreground hover:text-primary transition-all hover:scale-125"
              aria-label="GitHub"
              target="_blank"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/linus-sambile-92ab77317/"
              className="text-muted-foreground hover:text-primary transition-all hover:scale-125"
              aria-label="LinkedIn"
              target="_blank"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:linus.karlcs@gmail.com"
              className="text-muted-foreground hover:text-primary transition-all hover:scale-125"
              aria-label="Email"
              target="_blank"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
