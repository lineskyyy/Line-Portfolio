import { Sun, Moon } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`p-2 rounded-lg bg-muted/70 hover:bg-muted/80 transition-colors flex items-center justify-center ${className}`}
    >
      {theme === "dark" ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-accent" />}
    </button>
  )
}
