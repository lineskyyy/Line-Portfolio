import { Github, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="w-full border-t border-border bg-background/60">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Identity & Socials (Visual Height Adjusted) */}
          <div className="space-y-6">
            <div className="space-y-6">
              {/* The container for the logo and paragraph. Added 'items-center' here. */}
              <div className="flex gap-x-3 items-center">
                {/* Logo: Increased size (h-10) and paired with the brand name for visual weight */}
                <a
                  href="/"
                  aria-label="Home"
                  className="flex items-center gap-3 w-fit"
                >
                  <img
                    src={
                      theme === "light"
                        ? "/images/lkcs.png"
                        : "/images/lkcsw.png"
                    }
                    alt="L1N3'S Logo"
                    className="h-20 w-auto object-contain" // Height increased to 10
                    loading="lazy"
                  />
                  {/* Adding the brand name here to give the logo block more visual height */}
                </a>

                {/* Tagline. Removed the redundant 'items-center' from here. */}
                <p className="text-muted-foreground max-w-sm leading-relaxed text-sm">
                  Bridging the gap between creative vision, I specialize in
                  building pixel-perfect, intuitive user interfaces.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/lineskyyy"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="GitHub"
                target="_blank"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/linus-sambile-92ab77317/"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="LinkedIn"
                target="_blank"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/linesssky/"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Instagram"
                target="_blank"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Useful Links (Standard) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>
                <a
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/work"
                  className="hover:text-foreground transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/#skills"
                  className="hover:text-foreground transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="hover:text-foreground transition-colors"
                >
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information (Cleaned Up) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-accent flex-shrink-0" />
              <a
                href="mailto:linus.karlcs@gmail.com"
                className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              >
                linus.karlcs@gmail.com
              </a>
            </div>

            {/* <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-muted-foreground text-sm">
                (+63) 9XX XXX XXXX
              </span>
            </div> */}

            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-muted-foreground text-sm">Cavite, PH</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} L1N3'S W0RLD. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
