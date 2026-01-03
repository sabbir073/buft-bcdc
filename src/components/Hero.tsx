"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

const heroImages = [
  "/hero/1.jpg",
  "/hero/2.png",
  "/hero/3.png",
  "/hero/7.png",
];

const stats = [
  { value: 2018, label: "Founded", suffix: "", icon: "calendar" },
  { value: 500, label: "Members", suffix: "+", icon: "users" },
  { value: 50, label: "Events", suffix: "+", icon: "event" },
  { value: 100, label: "Placements", suffix: "+", icon: "briefcase" },
];

// Counter Hook
function useCounter(end: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
}

// Stat Card Component
function StatCard({ stat, index, isVisible }: { stat: typeof stats[0]; index: number; isVisible: boolean }) {
  const count = useCounter(stat.value, 2500, isVisible);

  const icons: Record<string, JSX.Element> = {
    calendar: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    users: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    event: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    briefcase: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  const colors = [
    "from-blue-500 to-blue-600",
    "from-emerald-500 to-emerald-600",
    "from-purple-500 to-purple-600",
    "from-orange-500 to-orange-600",
  ];

  return (
    <div
      className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors[index]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${colors[index]} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {icons[stat.icon]}
      </div>

      {/* Counter Value */}
      <div className="relative">
        <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${colors[index]} bg-clip-text text-transparent mb-2`}>
          {count}{stat.suffix}
        </div>
        <div className="text-gray-600 font-semibold text-lg uppercase tracking-wider">
          {stat.label}
        </div>
      </div>

      {/* Decorative element */}
      <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${colors[index]} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
    </div>
  );
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      setIsTransitioning(false);
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Intersection Observer for stats counter
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Images with Zoom Out Effect */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide
                ? isTransitioning
                  ? "opacity-0"
                  : "opacity-100"
                : "opacity-0"
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${
                index === currentSlide && !isTransitioning
                  ? "animate-zoom-out"
                  : ""
              }`}
              style={{
                backgroundImage: `url(${image})`,
                transform: index === currentSlide ? undefined : "scale(1.2)",
              }}
            />
          </div>
        ))}

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-blue-900/30" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pt-20">
          {/* Main Heading */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-2 tracking-wide animate-fade-in-up">
              Step Towards
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight animate-fade-in-up animation-delay-200">
              <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                Sustainable Career
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
            BUFT Career Development Club - Your gateway to professional excellence
            at BGMEA University of Fashion & Technology. Building tomorrow&apos;s leaders today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in-up animation-delay-600">
            <Link
              href="/membership"
              className="group relative px-8 sm:px-10 py-4 bg-white text-blue-600 font-semibold rounded-full overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Join BCDC
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="#about"
              className="group px-8 sm:px-10 py-4 bg-transparent border-2 border-white/80 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
            >
              <span className="flex items-center justify-center gap-2">
                Learn More
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-y-1"
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
              </span>
            </Link>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-10 sm:mt-12 animate-fade-in-up animation-delay-800">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentSlide(index);
                    setIsTransitioning(false);
                  }, 500);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-scroll-down" />
          </div>
        </div>

        {/* Custom Styles */}
        <style jsx>{`
          @keyframes zoom-out {
            0% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scroll-down {
            0%,
            100% {
              opacity: 1;
              transform: translateY(0);
            }
            50% {
              opacity: 0.5;
              transform: translateY(6px);
            }
          }

          .animate-zoom-out {
            animation: zoom-out 5s ease-out forwards;
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
            opacity: 0;
          }

          .animate-scroll-down {
            animation: scroll-down 1.5s ease-in-out infinite;
          }

          .animation-delay-200 {
            animation-delay: 200ms;
          }

          .animation-delay-400 {
            animation-delay: 400ms;
          }

          .animation-delay-600 {
            animation-delay: 600ms;
          }

          .animation-delay-800 {
            animation-delay: 800ms;
          }
        `}</style>
      </section>

      {/* Stats Section - Outside Hero */}
      <section ref={statsRef} className="relative bg-gradient-to-b from-gray-50 to-white py-16 -mt-1">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Our Impact</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">BCDC at a Glance</h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} isVisible={statsVisible} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
