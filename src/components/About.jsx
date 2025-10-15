// import { ImageGallery } from "./ImageGallery"
import RotatingGlobe from "./RotatingGlobe";

export function About() {
  return (
    <section id="about" className="min-h-screen py-20 px-6 relative z-10 ">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in-up">
          About <span className="text-accent">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              I'm a passionate <span className="text-primary font-semibold">UI/UX Designer</span> and{" "}
              <span className="text-accent font-semibold">Frontend Developer</span> who loves crafting seamless, functional, and human-centered digital experiences.
            </p>
            <p className="text-lg leading-relaxed">
              Even with a keen eye for detail and a strong foundation in modern web technologies, I still try to push my creative capabilities to create interfaces that feel intuitive and pleasisng to the eye.
            </p>
            <p className="text-lg leading-relaxed">
              My design approach blends <span className="text-secondary font-semibold">efficiency</span>,{" "}
              <span className="text-primary font-semibold">aesthetics</span>,{" "}
              <span className="text-accent font-semibold">responsiveness</span>, and{" "}
              <span className="text-amber-600 font-semibold">functionality</span>—heavily influenced by modern design and nostalgic simplicity.
            </p>
          </div>

          {/* Rotating controlled Globe Display */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="h-auto w-full rounded-2xl border border-white/10 p-4 shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-md flex flex-col items-center justify-start overflow-hidden relative">
              
              {/* Subtle space glow */}
              {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]" /> */}

              {/* <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-4 tracking-wide font-mono">
                Unrelated Hobbies of Mine
              </h3>

              <div className="relative w-full h-full flex items-center justify-center">
                <ImageGallery />
              </div> */}
              <RotatingGlobe />

              {/* Futuristic corner nodes */}
              <span className="absolute top-4 left-4 w-3 h-3 bg-accent/70 rounded-full blur-sm shadow-[0_0_10px_rgba(0,255,255,0.6)]" />
              <span className="absolute top-4 right-4 w-3 h-3 bg-pink-400/70 rounded-full blur-sm shadow-[0_0_10px_rgba(255,0,128,0.6)]" />
              <span className="absolute bottom-4 left-4 w-3 h-3 bg-yellow-300/70 rounded-full blur-sm shadow-[0_0_10px_rgba(255,255,0,0.6)]" />
              <span className="absolute bottom-4 right-4 w-3 h-3 bg-accent/70 rounded-full blur-sm shadow-[0_0_10px_rgba(0,255,255,0.6)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
