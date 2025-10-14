import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export function ScrollIndicator() {
  const [showIndicator, setShowIndicator] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setShowIndicator(window.scrollY < 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!showIndicator) return null

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce">
      <button
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }}
        className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center hover:bg-accent/20 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-5 h-5 text-accent" />
      </button>
    </div>
  )
}
