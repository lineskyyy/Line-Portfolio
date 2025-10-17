export function RetroElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Gears - Position adjusted for mobile (more centered) and opacity/size reduced on small screens */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 sm:top-20 sm:left-10 sm:translate-x-0 animate-spin-slow opacity-10 sm:opacity-20 scale-50 sm:scale-100">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M60 20L65 35H75L67 43L70 58L60 50L50 58L53 43L45 35H55L60 20Z"
            fill="currentColor"
            className="text-accent"
          />
          <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="8" className="text-accent" />
          <circle cx="60" cy="25" r="5" fill="currentColor" className="text-accent" />
          <circle cx="60" cy="95" r="5" fill="currentColor" className="text-accent" />
          <circle cx="25" cy="60" r="5" fill="currentColor" className="text-accent" />
          <circle cx="95" cy="60" r="5" fill="currentColor" className="text-accent" />
          <circle cx="35" cy="35" r="5" fill="currentColor" className="text-accent" />
          <circle cx="85" cy="85" r="5" fill="currentColor" className="text-accent" />
          <circle cx="85" cy="35" r="5" fill="currentColor" className="text-accent" />
          <circle cx="35" cy="85" r="5" fill="currentColor" className="text-accent" />
        </svg>
      </div>

      {/* Small Gear - Moved and scaled for mobile */}
      <div className="absolute bottom-10 right-10 sm:bottom-32 sm:right-20 animate-spin-reverse opacity-10 sm:opacity-15 scale-75 sm:scale-100">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="25" stroke="currentColor" strokeWidth="6" className="text-primary" />
          <circle cx="40" cy="15" r="4" fill="currentColor" className="text-primary" />
          <circle cx="40" cy="65" r="4" fill="currentColor" className="text-primary" />
          <circle cx="15" cy="40" r="4" fill="currentColor" className="text-primary" />
          <circle cx="65" cy="40" r="4" fill="currentColor" className="text-primary" />
          <circle cx="25" cy="25" r="4" fill="currentColor" className="text-primary" />
          <circle cx="55" cy="55" r="4" fill="currentColor" className="text-primary" />
        </svg>
      </div>

      {/* Retro Laptop - Hidden on small screens to reduce clutter, visible from 'md' breakpoint */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 animate-float opacity-10 hidden md:block">
        <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Laptop Screen */}
          <rect x="30" y="10" width="140" height="90" rx="4" fill="currentColor" className="text-secondary" />
          <rect x="40" y="20" width="120" height="70" fill="currentColor" className="text-background" />

          {/* Screen Content - Code Lines */}
          <line x1="50" y1="30" x2="100" y2="30" stroke="currentColor" strokeWidth="2" className="text-accent" />
          <line x1="50" y1="40" x2="130" y2="40" stroke="currentColor" strokeWidth="2" className="text-primary" />
          <line x1="50" y1="50" x2="110" y2="50" stroke="currentColor" strokeWidth="2" className="text-accent" />
          <line x1="50" y1="60" x2="140" y2="60" stroke="currentColor" strokeWidth="2" className="text-secondary" />
          <line x1="50" y1="70" x2="90" y2="70" stroke="currentColor" strokeWidth="2" className="text-primary" />

          {/* Laptop Base */}
          <path
            d="M20 100 L30 100 L40 110 L160 110 L170 100 L180 100 L190 120 L10 120 Z"
            fill="currentColor"
            className="text-secondary"
          />

          {/* Keyboard */}
          <rect
            x="50"
            y="105"
            width="100"
            height="10"
            rx="1"
            fill="currentColor"
            className="text-background opacity-50"
          />
        </svg>
      </div>

      {/* Pixel Art Elements - Hidden on small screens */}
      <div className="absolute top-40 right-1/4 animate-bounce-slow opacity-20 hidden md:block">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="20" width="10" height="10" fill="currentColor" className="text-accent" />
          <rect x="10" y="10" width="10" height="10" fill="currentColor" className="text-accent" />
          <rect x="20" y="0" width="20" height="10" fill="currentColor" className="text-accent" />
          <rect x="40" y="10" width="10" height="10" fill="currentColor" className="text-accent" />
          <rect x="50" y="20" width="10" height="10" fill="currentColor" className="text-accent" />
          <rect x="10" y="20" width="40" height="10" fill="currentColor" className="text-accent" />
          <rect x="0" y="30" width="60" height="10" fill="currentColor" className="text-accent" />
          <rect x="10" y="40" width="40" height="10" fill="currentColor" className="text-accent" />
          <rect x="20" y="50" width="20" height="10" fill="currentColor" className="text-accent" />
        </svg>
      </div>

      {/* Retro Computer Monitor - Position adjusted and hidden on mobile */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 sm:bottom-40 sm:left-20 sm:translate-x-0 animate-pulse-slow opacity-10 scale-75 sm:scale-100 hidden sm:block">
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Monitor */}
          <rect x="20" y="20" width="110" height="80" rx="8" fill="currentColor" className="text-primary" />
          <rect x="30" y="30" width="90" height="60" fill="currentColor" className="text-background" />

          {/* Screen glow */}
          <rect x="35" y="35" width="80" height="50" fill="currentColor" className="text-accent opacity-30" />

          {/* Stand */}
          <rect x="60" y="100" width="30" height="10" fill="currentColor" className="text-primary" />
          <rect x="40" y="110" width="70" height="5" rx="2" fill="currentColor" className="text-primary" />
        </svg>
      </div>

      {/* Floating Brackets - Scaled down for mobile */}
      <div className="absolute top-1/4 left-5 sm:top-1/3 sm:left-1/4 animate-float-delayed opacity-15 scale-75 sm:scale-100">
        <span className="text-4xl sm:text-6xl font-bold text-secondary">{"{ }"}</span>
      </div>

      {/* Floating Angle Brackets - Scaled down for mobile */}
      <div className="absolute bottom-1/4 right-5 sm:bottom-1/3 sm:right-1/3 animate-float opacity-15 scale-75 sm:scale-100">
        <span className="text-4xl sm:text-6xl font-bold text-primary">{"< />"}</span>
      </div>

      {/* Retro Grid Lines - Opacity reduced on mobile for less distraction */}
      <div className="absolute inset-0 opacity-2 sm:opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  )
}