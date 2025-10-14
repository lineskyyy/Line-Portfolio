import { Mail, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Let's work <span className="text-accent">together</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Have a project in mind? I'm always open to discussing new
          opportunities, creative ideas, or partnerships.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <a
            href="mailto:linus.karlcs@gmail.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            target="_blank"
          >
            <Mail className="w-5 h-5" />
            linus.karlcs@gmail.com
          </a>
          <div
            // href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <MapPin className="w-5 h-5" />
            General Trias, Cavite, PH
          </div>
        </div>

        <a
          href="mailto:linus.karlcs@gmail.com?subject=Inquiry%20from%20Portfolio&body=Hi%20Linus,%0D%0A%0D%0AI%20would%20like%20to%20get%20in%20touch%20regarding..."
          className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors inline-block"
          target="_blank"
        >
          Get In Touch
        </a>
      </div>
    </section>
  );
}
