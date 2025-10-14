import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : ""
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Line's Portfolio<span className="text-accent">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/about" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
            About
          </Link>
          {/* <button
            onClick={() => scrollToSection("projects")}
            className="text-muted-foreground hover:text-foreground hover:underline transition-colors"
          >
            Work
          </button> */}
          <Link to="/work" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
            Work
          </Link>
          <button
            onClick={() => scrollToSection("services")}
            className="text-muted-foreground hover:text-foreground hover:underline transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Me
          </button>
        </div>
      </div>
    </nav>
  )
}
