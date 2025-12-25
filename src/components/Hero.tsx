"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700" />

      {/* Decorative circles - hidden on very small screens */}
      <div className="absolute top-20 left-10 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-blue-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 sm:w-64 md:w-96 h-40 sm:h-64 md:h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-white/5 rounded-full" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Logo - responsive sizing */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-blue-600 font-bold text-xl sm:text-2xl md:text-3xl">BCDC</span>
          </div>
        </div>

        {/* Slogan - responsive text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight">
          Step Towards
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white/90 mb-4 sm:mb-6 md:mb-8">
          Sustainable Career
        </h2>

        {/* Subtitle - responsive */}
        <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-2">
          BUFT Career Development Club - Your gateway to professional excellence
          at BGMEA University of Fashion & Technology
        </p>

        {/* CTA Buttons - stack on mobile */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
          <Link
            href="#membership"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
          >
            Join BCDC
          </Link>
          <Link
            href="#about"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all text-sm sm:text-base"
          >
            Learn More
          </Link>
        </div>

        {/* Stats - responsive grid */}
        <div className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">
          <div className="text-center p-2 sm:p-0">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">2018</div>
            <div className="text-white/70 text-xs sm:text-sm">Founded</div>
          </div>
          <div className="text-center p-2 sm:p-0">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">500+</div>
            <div className="text-white/70 text-xs sm:text-sm">Members</div>
          </div>
          <div className="text-center p-2 sm:p-0">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">50+</div>
            <div className="text-white/70 text-xs sm:text-sm">Events</div>
          </div>
          <div className="text-center p-2 sm:p-0">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">100+</div>
            <div className="text-white/70 text-xs sm:text-sm">Placements</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hide on very small screens */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
