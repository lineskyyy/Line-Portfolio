import { useEffect } from 'react'
import { Hero } from "../components/Hero"
import { About } from "../components/About"
import { Projects } from "../components/Projects"
import { Skills } from "../components/Skills"
import { Services } from "../components/Services"
import { Contact } from "../components/Contact"

export default function HomePage() {
  
  // New useEffect to handle scrolling based on the URL hash
  useEffect(() => {
    // Get the hash from the URL (e.g., "#services")
    const hash = window.location.hash
    if (hash) {
      // Extract the ID (e.g., "services")
      const id = hash.substring(1) 
      const element = document.getElementById(id)
      
      // Add a slight delay to ensure all components are fully rendered 
      // before attempting to scroll.
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
          // Optional: Clear the hash from the URL after scrolling
          window.history.replaceState({}, document.title, window.location.pathname);
        }, 100) 
      }
    }
  }, []) // Empty dependency array means this runs only once on mount

  return (
    <div className="overflow-x-hidden">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Services />
      <Contact />
    </div>
  )
}