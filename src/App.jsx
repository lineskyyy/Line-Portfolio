import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { ThemeProvider } from "./contexts/ThemeContext"
import { Navigation } from "./components/Navigation"
import { ScrollIndicator } from "./components/ScrollIndicatior"
import { AnimatedBackground } from "./components/AnimatedBackground"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import WorkPage from "./pages/WorkPage"

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
          <AnimatedBackground />
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<WorkPage />} />
          </Routes>
          <ScrollIndicator />
        </main>
      </Router>
    </ThemeProvider>
  )
}

export default App
