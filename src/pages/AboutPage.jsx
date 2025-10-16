import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Instagram,
  MapPin,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { RetroElements } from "../components/RetroElements";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("about");
  const [hoveredCert, setHoveredCert] = useState(null);

  const experiences = [
    {
      title: "Frontend Developer & UI/UX Designer - Freelance",
      company: "Kodah All Cars",
      period: "June - September of 2025",
      description:
        "Frontend Developer and UI/UX designer for Kodah All Cars website. Building scalable UI components and implementing modern design systems. Implemented complex features and funtionalities within the website while still keeping it user friendly.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Python", "Figma"],
    },
    {
      title: "UI/UX Designer - Intern",
      company: "Leentech Network Solutions",
      period: "June - August of 2024",
      description:
        "Designed user interface for Job Pilot, a platform developed for employers and people looking for jobs. Created design systems and prototype of the proposed UI. Improved user experience and interface with a team guided by our project manager.",
      tags: ["Figma", "Canva", "CSS"],
    },
    {
      title: "Digital Marketing Team Leader - Intern",
      company: "Leentech Network Solutions",
      period: "June - August of 2024",
      description:
        "Assigned as the team leader for the digital marketing team for Leentech Network Solutions. Tasked to ustilize various AI tools to generate for mascots, and designed banners and promotional materials that were proposed and used to promote project: StartUp Lab.",
      tags: ["Figma", "Canva", "Artlist.IO", "AI Image Generator"],
    },
  ];

  const education = [
    {
      title: "Bachelor of Science in Computer Science",
      institution: "Lyceum of the Philippines University - Cavite",
      year: "2021-2025",
      description: "Yes, I am a Computer Science graduate.",
    },
  ];
  const certificates = [
    {
      title: "UI/UX Designer Internship",
      institution: "Leentech",
      year: "2024",
      description: "Went through a 300-hour Internship at Leentech.",
      link: "/images/ojt.png",
      image: "/images/ojt.png",
    },
    {
      title: "IT Specialist - HTML and CSS",
      institution: "Certiport",
      year: "2024",
      description:
        "Passed a proctored exam on HTML and CSS at a Certiport Authorized Testing Center.",
      link: "https://www.credly.com/badges/6909ed15-43e2-4fdb-8a18-455841451952/public_url",
      image: "/images/it.png",
    },
    {
      title: "Networking Basics",
      institution: "Cisco",
      year: "2025",
      description:
        "Completed the whole course for Networking and passed the exam.",
      link: "/images/network.png",
      image: "/images/network.png",
    },
    {
      title: "Operating Systems Basics",
      institution: "Cisco",
      year: "2024",
      description:
        "Completed the course for Operating Systems and passed the exam.",
      link: "/images/os.png",
      image: "/images/os.png",
    },
  ];

  return (
    <section className="min-h-screen py-16 md:py-32 px-6 md:px-16 relative z-10">
      <RetroElements />
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[300px_1fr] gap-12">
          {/* Left Sidebar - Profile */}
          <div className="lg:sticky lg:top-24 h-fit space-y-8 animate-fade-in-up">
            {/* Profile Image */}
            <div className="relative group">
              <div className="w-fit h-fit mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-accent/20 group-hover:border-accent transition-colors duration-300">
                <img
                  src="/images/my-profile.JPG"
                  alt="Profile"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-accent rounded-full flex items-center justify-center border-4 border-background">
                <span className="text-2xl">👋</span>
              </div>
            </div>

            {/* Name & Title */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold mb-2">Linus Karl C. Sambile</h1>
              <p className="text-xl text-accent mb-4">Frontend Developer</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I build responsive, accessible, and pixel-perfect digital
                experiences using modern web technologies.
              </p>
            </div>

            {/* Location & Availability */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Cavite, PH</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4 text-accent" />
                <span>Available for Freelance || Full-time</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActiveTab("about")}
                className={`text-left px-4 py-2 rounded-lg transition-all ${
                  activeTab === "about"
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                }`}
              >
                ABOUT
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={`text-left px-4 py-2 rounded-lg transition-all ${
                  activeTab === "experience"
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                }`}
              >
                EXPERIENCE
              </button>
              <button
                onClick={() => setActiveTab("education")}
                className={`text-left px-4 py-2 rounded-lg transition-all ${
                  activeTab === "education"
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                }`}
              >
                EDUCATION
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/lineskyyy"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/linus-sambile-92ab77317/"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/linesssky/"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Twitter"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:linus.karlcs@gmail.com"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Email"
                target="_blank"
                rel="noreferrer"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="space-y-12">
            {/* About Tab */}
            {activeTab === "about" && (
              <div className="space-y-8 animate-fade-in-up">
                <div>
                  <h2 className="text-4xl font-bold mb-6">
                    I'm a{" "}
                    <span className="text-primary">Computer Science </span>{" "}
                    graduate that specializes in developing{" "}
                    <span className="text-secondary">accessible </span> and{" "}
                    <span className="text-accent">pixel-perfect</span> user
                    interfaces.
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      I am a front-end developer who is enthusiastic about
                      creating clean, responsive, and accessible web interfaces
                      using modern tools such as React, JavaScript, and Tailwind
                      CSS. My primary focus revolves around creating
                      user-friendly experiences that are meticulously designed
                      for performance and usability, in addition to their
                      aesthetic appeal.
                    </p>
                    <p>
                      Currently, I am a{" "}
                      <span className="text-accent font-semibold">
                        Freelance Frontend Developer
                      </span>{" "}
                      working on a project for{" "}
                      <span className="text-yellow-500 font-semibold">
                        Kodah All Cars
                      </span>
                      . I contribute to the creation and maintenance of UI
                      components that power our platform's frontend, ensuring
                      our applications meet web accessibility standards and best
                      practices to deliver an inclusive user experience.
                    </p>
                    <p>
                      In the past, I've had the opportunity to develop software
                      across a variety of settings — from{" "}
                      <span className="text-accent">
                        academic resource center
                      </span>{" "}
                      to <span className="text-primary">tech startups</span> to{" "}
                      <span className="text-secondary">
                        car dealership website
                      </span>
                      .
                      {/* Additionally, I also released a{" "}
                      <span className="text-accent font-semibold">comprehensive video course</span> a few years ago,
                      guiding learners through building modern web applications. */}
                    </p>
                    <p>
                      In my spare time, I'm usually exploring new web
                      technologies, making music, hanging out with friends,
                      playing golf or working on side projects that push my
                      creative boundaries and sometimes try to hone my skills as
                      a
                      <span className="text-primary"> Fullstack developer</span>{" "}
                      by working on personal websites.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <div className="space-y-8 animate-fade-in-up">
                <h2 className="text-3xl font-bold mb-8">
                  Professional Experiences
                </h2>
                <div className="space-y-12">
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="group relative pl-8 border-l-2 border-border hover:border-accent transition-colors"
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent border-4 border-background group-hover:scale-125 transition-transform" />

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                              {exp.title}
                            </h3>
                            <a
                              href="#"
                              className="text-muted-foreground hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                          <p className="text-accent font-semibold mb-1">
                            {exp.company}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {exp.period}
                          </p>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full border border-accent/20 hover:bg-accent/20 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === "education" && (
              <div className="space-y-8 animate-fade-in-up">
                <h2 className="text-3xl font-bold mb-8">Education</h2>
                <div className="grid gap-6">
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      className="group p-6 rounded-xl border border-border hover:border-accent bg-card hover:bg-accent/5 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                          {edu.title}
                        </h3>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-accent font-semibold mb-2">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  ))}
                </div>

                <h2 className="text-3xl font-bold mb-8">Certifications</h2>
                <div className="grid gap-6 relative">
                  {certificates.map((cert, index) => (
                    <a
                      key={index}
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveredCert(index)}
                      onMouseLeave={() => setHoveredCert(null)}
                      className="group p-6 rounded-xl border border-border hover:border-accent bg-card hover:bg-accent/5 transition-all cursor-pointer block relative"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        {/* Wrapper for title and hover preview to use flexbox */}
                        <div className="flex items-center gap-4 relative">
                          <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                            {cert.title}
                          </h3>
                          {/* ********** HOVER PREVIEW LOCATION ********** */}
                          {hoveredCert === index && (
                            <div className="absolute left-full ml-4 top-0 z-50 animate-fade-in pointer-events-none hidden md:block">
                              <div className="bg-background border border-accent rounded-lg shadow-xl overflow-hidden w-[180px] sm:w-[200px]">
                                <img
                                  src={cert.image}
                                  alt={`${cert.title} preview`}
                                  className="object-cover w-full h-[120px] rounded-t-lg"
                                />
                                <div className="p-2 bg-card text-center">
                                  <h4 className="font-semibold text-sm text-accent">
                                    {cert.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground">
                                    {cert.year}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {cert.year}
                          </span>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
                        </div>
                      </div>
                      <p className="text-accent font-semibold mb-2">
                        {cert.institution}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {cert.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}