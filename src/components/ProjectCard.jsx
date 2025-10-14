import { ExternalLink } from "lucide-react";

export function ProjectCard({
  title,
  subtitle,
  description,
  image,
  hoverImage,
  tags,
  link,
  index,
}) {
  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Image container */}
        <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
          <div className="relative aspect-[3/2] rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm border border-border transition-all duration-500 hover:border-accent hover:shadow-[0_0_40px_rgba(20,184,166,0.4)] hover:-translate-y-2 hover:bg-card/80 group/image">
            
            {/* Default image */}
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                hoverImage ? "group-hover/image:opacity-0" : "hover:scale-105"
              }`}
            />

            {/* Hover image (if available) */}
            {hoverImage && (
              <img
                src={hoverImage}
                alt={`${title} preview`}
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover/image:opacity-100"
              />
            )}

            {/* Glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        {/* Text section */}
        <div className={`space-y-4 ${index % 2 === 1 ? "md:order-1" : ""}`}>
          <div>
            <h3 className="text-3xl font-bold mb-2 hover:text-accent transition-colors duration-300">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">{subtitle}</p>
          </div>

          <p className="text-muted-foreground leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-primary/10 backdrop-blur-sm text-primary border border-primary/20 hover:bg-primary/20 hover:scale-105 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-all duration-300 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Opens in new tab */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all duration-300 hover:translate-x-1"
          >
            View Project <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
