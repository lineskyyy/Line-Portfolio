import { useState } from "react";

// Example setup (you can replace these with your actual SVG imports or URLs)
// import NodeJs from "/icons/nodejs-icon.svg";

const skills = [
  { name: "JavaScript", icon: "/icons/javascript.svg" }, // fallback emoji example
  { name: "Node.js", icon: "/icons/nodejs-icon.svg" },
  { name: "Figma", icon: "/icons/figma.svg" },
  { name: "GitHub", icon: "/icons/github.svg" },
  { name: "HTML5", icon: "/icons/html5.svg" },
  { name: "CSS3", icon: "/icons/css.svg" },
  { name: "MySQL", icon: "/icons/mysql.svg" },
  { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
  { name: "React", icon: "/icons/react.svg" },
  { name: "Python", icon: "/icons/py.svg" },
  { name: "TypeScript", icon: "/icons/ts.svg" },
  { name: "Java", icon: "/icons/java.svg" },
  { name: "Vite", icon: "/icons/vite.svg" },
  { name: "Supabase", icon: "/icons/supabase.svg" },
];

export function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // The fade-out color will now be dynamic, matching the theme's background color
  const fadeGradientColor = `rgb(var(--background))`;

  return (
    <section id="skills" className="pt-32 px-6 md:px-16 relative">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-primary">Tools</span> &{" "}
          <span className="text-accent">Technologies</span>
        </h2>

        {/* Desktop marquee (md+) */}
        <div className="hidden md:relative md:block h-auto pt-12 pb-24 overflow-hidden">
          <div className="flex gap-12 animate-scroll">
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={index}
                className="flex-shrink-0 relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                <div
                  className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-primary/90 backdrop-blur-md text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap z-20 border border-primary/30 shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all duration-300 ${
                    hoveredIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {skill.name}
                </div>

                {/* Icon container with hover glow */}
                <div className="w-20 h-20 flex items-center justify-center text-5xl relative cursor-pointer transition-transform duration-300 ease-out group-hover:scale-125">
                  <div className="absolute inset-0 bg-accent/10 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-accent/20 shadow-[0_0_25px_rgba(20,184,166,0.3)]" />

                  {/* Render SVG or emoji */}
                  {typeof skill.icon === "string" &&
                  !skill.icon.endsWith(".svg") ? (
                    <span className="relative z-10 select-none">
                      {skill.icon}
                    </span>
                  ) : (
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-12 h-12 relative z-10 select-none object-contain"
                    />
                  )}
                </div>

                {/* Reflection */}
                <div
                  className="absolute left-0 w-20 h-20 flex items-center justify-center text-5xl opacity-40 pointer-events-none select-none"
                  style={{
                    top: "calc(100% + 6px)",
                    transform: "scaleY(-1)",
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 80%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 80%)",
                  }}
                >
                  {typeof skill.icon === "string" &&
                  !skill.icon.endsWith(".svg") ? (
                    <span>{skill.icon}</span>
                  ) : (
                    <img
                      src={skill.icon}
                      alt={`${skill.name} reflection`}
                      className="w-12 h-12 object-contain"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile marquee (continuous movement like desktop) */}
        <div className="md:hidden relative h-auto pt-8 pb-12 overflow-hidden">
          <div className="flex gap-6 animate-scroll">
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-28 relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-primary/90 backdrop-blur-md text-primary-foreground px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap z-20 border border-primary/30 shadow-[0_0_16px_rgba(20,184,166,0.35)] transition-all duration-300 ${
                    hoveredIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {skill.name}
                </div>

                <div className="w-20 h-20 flex items-center justify-center text-4xl relative cursor-pointer transition-transform duration-300 ease-out group-hover:scale-110 mx-auto">
                  <div className="absolute inset-0 bg-accent/10 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-accent/20" />
                  {typeof skill.icon === "string" &&
                  !skill.icon.endsWith(".svg") ? (
                    <span className="relative z-10 select-none">
                      {skill.icon}
                    </span>
                  ) : (
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-12 h-12 relative z-10 select-none object-contain"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fade edges - show on all screen sizes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-20">
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)",
            }}
          ></div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-20">
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
