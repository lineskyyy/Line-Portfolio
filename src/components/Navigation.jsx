import { useState, useEffect, useRef } from "react";
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

  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

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

        {/* Mobile controls */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((s) => !s)}
            ref={toggleRef}
            className="ml-3 p-2 rounded-md border border-border text-muted-foreground"
          >
            {/* simple hamburger/close icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {mobileOpen ? (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu instance controlled by mobileOpen state */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} scrollToSection={scrollToSection} toggleRef={toggleRef} />
    </nav>
  );
}

// Render MobileMenu from default export file-scope for convenience
export default function NavigationWrapper(props) {
  // Reuse Navigation component (named export) to preserve original API
  return <Navigation {...props} />;
}

// Also mount mobile menu as a sibling when using the named Navigation component

// Mobile menu placed outside nav for simpler layering if needed
export function MobileMenu({ open, onClose, scrollToSection, toggleRef }) {
  const menuRefLocal = useRef(null);

  // When menu closes, if focus is inside the menu, blur it and restore focus to the toggle button.
  useEffect(() => {
    if (!open) {
      try {
        const active = document.activeElement;
        if (menuRefLocal.current && active && menuRefLocal.current.contains(active)) {
          active.blur();
          if (toggleRef && toggleRef.current) toggleRef.current.focus();
        }
      } catch (e) {
        // fail silently
      }
    } else {
      // when opened, move focus to the first focusable element for accessibility
      setTimeout(() => {
        try {
          const first = menuRefLocal.current && menuRefLocal.current.querySelector('a,button');
          if (first) first.focus();
        } catch (e) {}
      }, 120);
    }
  }, [open, toggleRef]);

  return (
    <div
      ref={menuRefLocal}
      className={`md:hidden fixed inset-x-0 top-16 z-40 transition-transform duration-200 transform origin-top ${
        open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div className="bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
        <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
          <Link to="/about" onClick={onClose} className="text-lg text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link to="/work" onClick={onClose} className="text-lg text-muted-foreground hover:text-foreground">
            Work
          </Link>
          <button
            onClick={() => {
              onClose();
              scrollToSection("services");
            }}
            className="text-lg text-muted-foreground hover:text-foreground text-left"
          >
            Services
          </button>
          <button
            onClick={() => {
              onClose();
              scrollToSection("contact");
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 w-max"
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
}

// We export default Navigation below (keeps module API backward compatible)
