import { useState } from "react";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { RetroElements } from "../components/RetroElements";

// function ParticleLayer() {
//   const particles = Array.from({ length: 75 });
//
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {particles.map((_, i) => {
//         const size = Math.random() * 3 + 1;
//         const left = Math.random() * 100;
//         const delay = Math.random() * 5;
//         const duration = Math.random() * 15 + 10;
//
//         return (
//           <span
//             key={i}
//             className="absolute rounded-full bg-accent/70 blur-sm animate-float"
//             style={{
//               left: `${left}%`,
//               width: `${size}px`,
//               height: `${size}px`,
//               animationDelay: `${delay}s`,
//               animationDuration: `${duration}s`,
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// }

export default function WorkPage() {
  const works = [
    {
      title: "1. Kodah All Cars",
      subtitle: "Car Dealership Website - Freelance",
      description:
        "This project is a curated web platform that connects car dealers and buyers through verified vehicle listings across multiple brands. I led the UI/UX design and handled the frontend development, ensuring the platform delivered a smooth, responsive, mobile support and visually engaging experience. Since the project covered both the client-facing and admin sides, I designed and built key features that improved usability and efficiency. These included a vehicle recommendation system, fast and dynamic search, content management system, and a user management system. My work focused on creating a cohesive interface and seamless interaction flow that made browsing, managing, and showcasing vehicles intuitive and enjoyable for all users.",
      desc2:
        "As the UI/UX designer and frontend developer, I was responsible for the end-to-end design and implementation of the platform's user interface. I began by developing a consistent design system that emphasized clarity, accessibility, and brand identity. From wireframes to polished interfaces, I ensured every element supported an intuitive and responsive experience across all devices.",
      desc3:
        "The project's scope extended beyond the client-facing side to include a full admin dashboard, where I designed and built functional tools for content and data management. Key features I developed include a Recommendation System that intelligently suggests vehicles based on user preferences, a Fast Search System for efficient browsing across various filters, a Content Management System (CMS) for handling listings and promotions, and a User Management Module that streamlines dealer and buyer accounts.",
      desc4:
        "Throughout the development, I collaborated closely with backend engineers to integrate dynamic data and ensure smooth communication between the frontend and database. I focused on maintaining clean, maintainable code while optimizing performance and responsiveness using React, Tailwind CSS, and Vite.",
      desc5:
        "Ultimately, the project resulted in a high-performing, user-friendly platform that provides a modern, efficient, and personalized experience for both car dealers and buyers. It not only showcases my skills in frontend development and UI/UX design but also reflects my ability to translate complex business requirements into a functional, scalable digital product.",
      images: [
        "/images/kodah-home.png",
        "/images/kodah-inv.png",
        "/images/kodah-car.png",
        "/images/kodah-services.png",
        "/images/kodah-admin.png",
      ],
      tags: [
        "React",
        "Tailwind CSS",
        "JavaScript",
        "Node.js",
        "Vite",
        "MySQL",
        "Python",
        "CMS",
        "Recommendation System",
      ],
      link: "https://kodahallcars.com/",
    },
    {
      title: "2. Arcadia",
      subtitle: "Library Management System - Thesis Project",
      description:
        "Arcadia is an innovative Library Management and Research Repository System developed for the Lyceum of the Philippines University – Cavite. It was designed to modernize the university's Academic Resource Center (ARC) by digitizing administrative operations, improving accessibility, and enhancing the overall research experience for students and staff. As the lead frontend developer and system designer, I was responsible for creating a clean, responsive, and data-driven interface built with React, Tailwind CSS, and Vite, integrated seamlessly with Supabase as the backend.",
      desc2:
        "Arcadia includes a range of intelligent features such as a Support Vector Machine (SVM)-powered research classifier, a hybrid book recommendation system, optical character recognition (OCR) for digitizing thesis works, and automated book circulation management. I also designed and implemented multiple dashboards for both admin and user sides—covering analytics, complete CMS, user management, and digital resource tracking—to ensure efficient system operation and a smooth user experience.",
      desc3:
        "The project demonstrates my ability to merge AI-driven functionality with modern web development, delivering a scalable system that promotes digital transformation in academic institutions. Arcadia stands as a comprehensive showcase of my expertise in frontend development, UI/UX design, system integration, and applied AI for education technology.",
      images: [
        "/images/arcadia-login.png",
        "/images/arcadia-home.png",
        "/images/arc-bk.png",
        "/images/arc-admin.png",
        "/images/arc-bk-mng.png",
      ],
      tags: [
        "React",
        "Supabase",
        "Tailwind CSS",
        "JavaScript",
        "SVM",
        "OCR",
        "AI",
        "Python",
        "Node.js",
        "Hybrid and Content-Based Recommendation System",
        "Barcode Scanner",
      ],
      link: "#",
    },
    {
      title: "3. Job Pilot",
      subtitle: "UI/UX Designer for StartUp Lab - Intern",
      description:
        "During my three-month internship at Leentech Network Solutions, I had the opportunity to work as a UI/UX Designer for their project Job Pilot, a modern job portal platform developed under the larger initiative called StartUp Lab. The goal of Job Pilot was to create a seamless and engaging job-hunting experience for both employers and job seekers through an intuitive, well-structured design system. Using Figma and Canva as my main tools, I was responsible for designing and prototyping user interfaces that emphasized usability, visual balance, and accessibility across multiple user types.",
      desc2:
        "As part of my tasks, I developed interactive prototypes that demonstrated user flows such as job searching, account creation and verification, and dashboard navigation. I also designed dedicated interfaces for both the employer and employee sides, ensuring consistency and coherence in user experience. Some of the main features I focused on included Saved Candidates, Saved Jobs, Plans & Billings, and a Messaging System, all designed to make communication and hiring processes more efficient. Throughout the process, I collaborated closely with developers and other designers, refining layouts and interactions based on feedback and usability considerations.",
      desc3:
        "This internship not only strengthened my technical and creative skills but also gave me valuable insight into how a product evolves from concept to prototype in a real-world development environment. Working on Job Pilot allowed me to apply user-centered design principles and contribute meaningfully to a project that supports career growth and business innovation within the StartUp Lab ecosystem.",
      images: [
        "/images/job-sign.png",
        "/images/job-portal.png",
        "/images/job-portal2.png",
        "/images/job2.png",
        "/images/job3.png",
      ],
      tags: ["Figma", "Canva", "HTML", "CSS", "Bootstrap"],
    },
    {
      title: "4. Digital Marketing Banners",
      subtitle: "Team Leader for Digital Marketing - Intern",
      description:
        "In addition to my work as a UI/UX Designer, I also took on the role of Team Leader for the Digital Marketing Team during my internship at Leentech Network Solutions. This position allowed me to further develop my leadership, creativity, and collaboration skills while contributing to the promotion of StartUp Lab, the main initiative under which Job Pilot was developed. As team leader, I was responsible for creating marketing banners and promotional materials, guiding my team through the creative process, and ensuring that all outputs aligned with the project’s branding and objectives.",
      desc2:
        "One of the key aspects of our digital marketing approach was the integration of AI image generation tools. We were encouraged to experiment with and leverage these tools to produce visually appealing and innovative content that reflected StartUp Lab’s identity as a forward-thinking, tech-driven brand. My team and I collaborated closely to conceptualize and design campaigns that highlighted the project’s innovative nature, focusing on clean aesthetics, strong messaging, and consistency across platforms.",
      desc3:
        "As a leader, I also took an active role in reviewing and approving my team’s designs, providing constructive feedback, and ensuring that every output met professional standards before presenting them to our Project Manager. By the end of our internship, we successfully achieved our marketing goals, delivering high-quality visuals that effectively communicated StartUp Lab’s mission and vision. This experience strengthened my ability to lead a creative team, balance design quality with deadlines, and utilize AI tools in the modern marketing landscape.",
      images: [
        "/images/market3.png",
        "/images/market2.png",
        "/images/market.png",
        "/images/market4.png",
        "/images/market5.png",
      ],
      tags: ["Figma", "Canva", "Adobe"],
    },
    {
      title: "5. AI Projects",
      subtitle: "Compilation from my AI Subject activities",
      description:
        "This project was one of my first assignments from my third-year Artificial Intelligence course. This included several AI technologies, such as an expert system, chatbot, and image classifier. I was still honing my UI/UX design capabilities at this point, but through a variety of exercises, I was able to improve my ability to create websites that have a aesthetic appearance and seamless functionality.",

      images: [
        "/images/ai-proj.png",
        "/images/ai-projects.png",
        "/images/ai-img-class.png",
        "/images/ai-chat.png",
        "/images/ai-exp.png",
      ],
      tags: [
        "HTML",
        "Bootstrap",
        "JavaScript",
        "CSS",
        "Chat Bot",
        "Image Classification",
        "Expert System",
        "AI",
      ],
      link: "/projects/index.html",
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden gradient-bg-2">
      {/* 3. USE the new component */}
      <AnimatedBackground />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32 max-w-7xl mx-auto space-y-32">
        <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-20 pb-8 animate-fade-in-up border-b-2 border-e-primary-foreground">
          My <span className="text-accent">Projects</span>
        </h1>

        {works.map((work, index) => (
          <WorkGallery key={index} {...work} index={index} />
        ))}
      </div>
    </div>
  );
}

function WorkGallery({
  title,
  subtitle,
  description,
  desc2,
  desc3,
  desc4,
  desc5,
  images,
  tags,
  link,
  index,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const allDescs = [description, desc2, desc3, desc4, desc5].filter(Boolean);
  const hasMultipleDescs = allDescs.length > 1;

  const highlightText = (text) => {
    const keywords = {
      primary: [
        "UI/UX design",
        "frontend development",
        "design system",
        "user interface",
        "wireframes",
        "polished interfaces",
        "Artificial Intelligence",
        "image classifier",
        "Job Portal",
        "UI/UX Designer",
        "internship",
        "team leader",
        "aesthetics",
      ],
      accent: [
        "React",
        "Tailwind CSS",
        "Vite",
        "Supabase",
        "responsive",
        "modern",
        "innovative",
        "seamless functionality",
        "expert system",
        "Figma",
        "Canva",
        "digital marketing team",
      ],
      secondary: [
        "recommendation system",
        "CMS",
        "Content Management System",
        "admin dashboard",
        "User Management",
        "AI-driven",
        "SVM",
        "OCR",
        "aesthetic appearance",
        "chatbot",
        "Startup Lab",
        "seamless",
        "Leentech Network Solutions",
        "AI image generation tools",
      ],
    };

    let result = text;

    Object.entries(keywords).forEach(([color, words]) => {
      words.forEach((word) => {
        const regex = new RegExp(`\\b(${word})\\b`, "gi");
        result = result.replace(
          regex,
          `<span class="text-${color} font-medium">$1</span>`
        );
      });
    });

    return result;
  };

  return (
    <section
      className="relative flex flex-col items-center text-center animate-fade-in-up"
      style={{ animationDelay: `${index * 0.2}s` }}
    >   
    <RetroElements />
      <div
        className="mb-8 w-full max-w-4xl px-2 sm:px-4 animate-fade-in-up"
        style={{ animationDelay: `${index * 0.2 + 0.1}s` }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 hover:text-accent transition-colors duration-300">
          {title}
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm uppercase tracking-wider mb-6">
          {subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs sm:text-sm rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-accent hover:translate-x-1 transition-transform duration-300 text-sm sm:text-base"
          >
            View Live →
          </a>
        )}
      </div>

      <div
        className="relative w-full max-w-6xl mb-8 animate-fade-in-up"
        style={{ animationDelay: `${index * 0.2 + 0.2}s` }}
      >
        <div
          className="relative w-full h-[280px] sm:h-[340px] md:h-[400px]"
          style={{ perspective: "2000px" }}
        >
          {images.map((img, i) => {
            const total = images.length;
            const relativeIndex = (i - selectedIndex + total) % total;
            const offset =
              relativeIndex <= total / 2
                ? relativeIndex
                : relativeIndex - total;
            const isSelected = i === selectedIndex;

            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 transition-transform duration-700 ease-in-out cursor-pointer"
                style={{
                  transform: `
                    translate(-50%, -50%)
                    translateX(${offset * 160}px)
                    translateZ(${isSelected ? "100px" : "0px"})
                    rotateY(${offset * -25}deg) /* Updated angle to 45° */
                    scale(${isSelected ? 1.05 : 0.9})
                    translateY(${isSelected ? "0px" : "15px"})
                `,
                  zIndex: 10 - Math.abs(offset),
                  opacity: Math.abs(offset) > 2 ? 0 : 1,
                  transition: "transform 0.7s ease, opacity 0.7s ease",
                }}
                onClick={() => setSelectedIndex(i)}
              >
                {/* Main Image */}
                <img
                  src={img || "/placeholder.svg"}
                  alt={`${title} preview ${i + 1}`}
                  className="w-[240px] sm:w-[280px] md:w-[320px] h-[140px] sm:h-[180px] md:h-[200px] object-cover rounded-xl border border-accent/20 shadow-[0_0_40px_rgba(20,184,166,0.25)]"
                />

                {/* Reflection */}
                <div
                  className="absolute left-0 right-0"
                  style={{ top: "calc(100% + 8px)" }}
                >
                  
                  <div
                  className="absolute left-0 right-0"
                  style={{ top: "calc(100% + 8px)" }}
                >
                    <img
                    src={img || "/placeholder.svg"}
                    alt=""
                    className="w-[240px] sm:w-[280px] md:w-[320px] h-[60px] sm:h-[80px] md:h-[90px] object-cover object-bottom rounded-xl scale-y-[-1]"
                    style={{
                      opacity: isSelected ? 0.4 : 0.35,
                      maskImage:
                        "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)",
                    }}
                  />
                  {/* <img
                    src={img || "/placeholder.svg"}
                    alt=""
                    className="w-[240px] sm:w-[280px] md:w-[320px] h-[60px] sm:h-[80px] md:h-[90px] object-cover object-bottom rounded-xl scale-y-[-1]"
                    style={{
                      opacity: isSelected ? 0.4 : 0.35,
                      maskImage:
                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                    }}
                  /> */}
                </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 sm:mt-12 md:mt-16 text-xs sm:text-sm text-muted-foreground">
          Click on an image to bring it forward.
        </p>
      </div>

      <div
        className="relative w-full max-w-4xl text-justify leading-relaxed px-4 sm:px-6 animate-fade-in-up"
        style={{ animationDelay: `${index * 0.2 + 0.3}s` }}
      >
        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            expanded ? "max-h-[4000px]" : "max-h-[220px]"
          }`}
        >
          <div className="space-y-5 text-sm sm:text-base text-muted-foreground">
            {allDescs.map((desc, i) => (
              <p
                key={i}
                className={`transition-all duration-300 ${
                  i === 0 ? "text-muted-foreground" : "text-muted-foreground"
                }`}
                dangerouslySetInnerHTML={{ __html: highlightText(desc) }}
              />
            ))}
          </div>
        </div>

        {!expanded && hasMultipleDescs && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none" />
        )}

        {hasMultipleDescs && (
          <div className="pt-6 flex justify-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-4 py-2 text-xs sm:text-sm rounded-full bg-accent/10 hover:bg-accent/20 text-accent backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              {expanded ? "Show Less" : "Read More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
