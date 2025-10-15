// import Saturn from "./Saturn"

export function About() {
  return (
    <section id="about" className="min-h-screen py-20 px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in-up">
          About <span className="text-accent">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate <span className="text-primary font-semibold">UI/UX Designer</span> and{" "}
              <span className="text-accent font-semibold">Frontend Developer</span> who loves implementing seamless,
              functional, and user-centered digital experiences.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With a keen eye for design and a strong foundation in modern web technologies, I bridge the gap between
              design and development to build products that not only look great but work flawlessly.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My approach focuses on creating designs that balance{" "}
              <span className="text-secondary font-semibold">efficiency</span>,{" "}
              <span className="text-white font-semibold">aesthetics</span>,{" "}
              <span className="text-primary font-semibold">responsiveness</span>, and{" "}
              <span className="text-accent font-semibold">functionality</span>.
            </p>
          </div>

          {/* Empty Card: Insert Saturn.jsx here */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 p-8 flex items-center justify-center">
              <div className="text-center space-y-4 w-full h-full">
                {/* The Saturn component is placed here. 
                  It uses absolute positioning and w-full h-full to fill the parent card's space 
                  while maintaining a transparent background.
                */}
                {/* <Saturn /> */}
                WIP lol
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}