import React, { useState, useEffect, useCallback } from "react"

const images = [
  { src: "/images/golf.jpg", alt: "Tee Time: I enjoy golfing", rotate: "rotate-[2deg]" },
  { src: "/images/museum.jpg", alt: "going to museums", rotate: "-rotate-[1deg]" },
  { src: "/images/music.jpg", alt: "playing instruments", rotate: "rotate-[3deg]" },
  { src: "/images/ly.jpg", alt: "spending time with my niece", rotate: "-rotate-[2deg]" },
  { src: "/images/pim.jpg", alt: "and my nephew as well", rotate: "rotate-[1deg]" },
  { src: "/images/cafe.jpg", alt: "Cafe hopping", rotate: "-rotate-[3deg]" },
  { src: "/images/beach.jpg", alt: "being at the beach", rotate: "rotate-[2deg]" },
  { src: "/images/out.jpg", alt: "dilly dallying", rotate: "-rotate-[1deg]" },
  { src: "/images/beb.jpg", alt: "freestyle rapping with my partner", rotate: "-rotate-[3deg]" },
]

const INTERVAL_TIME = 5000

export function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  useEffect(() => {
    const timer = setTimeout(goToNext, INTERVAL_TIME)
    return () => clearTimeout(timer)
  }, [currentIndex, goToNext])

  return (
    <div className="relative w-full h-full overflow-hidden group">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${image.rotate} transform origin-center
            ${index === currentIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"}`}
        >
          {/* Holographic Polaroid Frame */}
          <div className="relative w-72 sm:w-80 bg-[#0c0c12]/90 border border-white/10 rounded-md shadow-[0_0_25px_rgba(0,255,255,0.2)] p-3 pb-8 backdrop-blur-md">
            
            {/* Animated Star Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_70%)] animate-pulse-slow rounded-md pointer-events-none" />

            {/* Image */}
            <img
              src={image.src}
              alt={image.alt}
              className="w-full aspect-square object-cover rounded-sm border border-white/10 shadow-inner"
            />

            {/* Caption */}
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center w-[90%] font-handwritten text-sm text-cyan-100 tracking-wide">
              {image.alt}
            </p>

            {/* Computer-style HUD Corners */}
            <span className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-accent/80 rounded-tl-sm" />
            <span className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-accent/80 rounded-tr-sm" />
            <span className="absolute bottom-1 left-1 w-4 h-4 border-l-2 border-b-2 border-accent/80 rounded-bl-sm" />
            <span className="absolute bottom-1 right-1 w-4 h-4 border-r-2 border-b-2 border-accent/80 rounded-br-sm" />

            {/* Circuit glow line */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-accent/60 to-transparent animate-glowline" />
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div className="absolute inset-0 flex justify-between items-center px-4 z-20">
        <button
          onClick={goToPrevious}
          className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/20 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/20 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
              ${index === currentIndex ? "bg-accent scale-125 shadow-[0_0_10px_rgba(0,255,255,0.8)]" : "bg-white/40 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </div>
  )
}