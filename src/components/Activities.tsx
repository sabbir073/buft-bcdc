"use client";

import { useState } from "react";

export default function Activities() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activities = [
    {
      title: "Career Fair",
      description: "Annual career fair connecting students with leading companies in the textile and fashion industry for internships and job opportunities.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: "from-red-400 to-red-600",
    },
    {
      title: "Workshops",
      description: "Regular skill-building workshops on resume writing, interview preparation, professional networking, and industry-specific skills.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Seminars",
      description: "Industry expert seminars featuring leaders from the textile and corporate sector sharing insights and career guidance.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Networking Events",
      description: "Exclusive networking sessions with industry professionals, alumni, and corporate recruiters for career opportunities.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Placement Drives",
      description: "Organized placement drives and campus recruitment programs with top companies in the fashion and textile industry.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "from-blue-500 to-blue-700",
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % activities.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + activities.length) % activities.length);
  };

  return (
    <section id="activities" className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Activities & Programs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our full range of activities designed to help you build skills,
            expand your network, and accelerate your career growth.
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4" />
        </div>

        {/* Activities Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden px-8">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{ transform: `translateX(-${activeIndex * (100 / 3)}%)` }}
            >
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4`}
                >
                  <div
                    className={`h-full p-8 rounded-2xl text-white bg-gradient-to-br ${
                      index === 0 ? "from-red-400 to-red-600" : activity.color
                    } shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2`}
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                      {activity.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{activity.title}</h3>
                    <p className="text-white/90 leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {activities.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${((activeIndex + 1) / activities.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
