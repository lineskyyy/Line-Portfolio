import { Hero } from "../components/Hero"
import { About } from "../components/About"
import { Projects } from "../components/Projects"
import { Skills } from "../components/Skills"
import { Services } from "../components/Services"
import { Contact } from "../components/Contact"

export default function HomePage() {
  return (
    // **APPLY overflow-x-hidden HERE**
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