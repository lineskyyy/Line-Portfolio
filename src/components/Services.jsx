import { Code, Palette, Smartphone, Zap } from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Creating intuitive and visually stunning interfaces that prioritize user experience and accessibility.",
  },
  {
    icon: Code,
    title: "Frontend Development",
    description: "Building responsive, performant web applications using modern frameworks and best practices.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Ensuring seamless experiences across all devices with mobile-first design principles.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Optimizing applications for speed, efficiency, and exceptional user experience.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-32 px-6 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fade-in-up">
          WHAT I <span className="text-accent">DO</span>
        </h2>
        <p
          className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Specialized services to bring your digital vision to life
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-lg bg-card border border-border hover:border-accent transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)] animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
