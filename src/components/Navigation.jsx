import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  // const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : ""
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          <div className="relative h-9 w-44">
            {/* Dark logo (default) */}
            <img
              src="/images/lkcs2.png"
              alt="L1N3'S W0RLD Logo"
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${
                theme === "dark" ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            />

            {/* Light logo - visible in light theme */}
            <img
              src="/images/lkcsb.png"
              alt="L1N3'S W0RLD Logo (light)"
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${
                theme === "light" ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/about"
            className="text-muted-foreground hover:text-foreground hover:underline transition-colors"
          >
            About
          </Link>
          <Link
            to="/work"
            className="text-muted-foreground hover:text-foreground hover:underline transition-colors"
          >
            Work
          </Link>
          <button
            onClick={() => scrollToSection("services")}
            className="text-muted-foreground hover:text-foreground hover:underline transition-colors"
          >
            Services
          </button>
          <ThemeToggle />
          <button
            onClick={() => scrollToSection("contact")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Me
          </button>
        </div>
      </div>
    </nav>
  );
}
