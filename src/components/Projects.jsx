import { ProjectCard } from "./ProjectCard"
import { Link } from "react-router-dom"

const projects = [
  {
    title: "Kodah All Cars",
    subtitle: "Car Dealership",
    description:
      "Kodah All Cars is a curated platform for reliable vehicle listings across brands, designed for both dealers and buyers. Explore, compare, and connect—all in one place.",
    image: "/images/kodah-home.png",
    hoverImage: "/images/kodah-inv.png",
    tags: ["React", "JavaScript", "Tailwind CSS", "Node.js", "MySQL", "Python", "Vite"],
    link: "https://kodahallcars.com/",
  },
  {
    title: "Arcadia",
    subtitle: "Library Management System",
    description:
      "Arcadia is an LMS that caters to both the Library Staff and Students of LPU - Cavite. It was developed as a thesis project that included a large scope of features.",
    image: "/images/arcadia-login.png",
    hoverImage: "/images/arcadia-home.png",
    tags: ["React", "Vite", "Supabase", "Tailwind CSS", "JavaScript", "Node.js", "Python", "SVM", "CMS", "Hybrid & Content-based Recommendation System"],
    link: "#",
  },
  {
    title: "AI-Driven School Projects",
    subtitle: "AI Portfolio",
    description:
      "A collection of my Artificial Intelligence projects during 3rd College.",
    image: "/images/ai-proj.png",
    hoverImage: "/images/ai-projects.png",
    tags: ["HTML", "Bootstrap", "CSS", "Machine Learning", "JavaScript", "Python"],
    link: "/projects/index.html",
  },
]

export function Projects() {
  return (
    // <section id="projects" className="py-32 px-6 bg-muted/30">
    <section id="projects" className="py-8 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            My <span className="text-accent">Projects</span>
          </h2>
          <Link to="/work" className="text-muted-foreground hover:text-accent transition-colors hidden md:block">
            See all my works →
          </Link>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
