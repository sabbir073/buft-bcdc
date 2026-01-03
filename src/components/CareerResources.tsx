"use client";

import Link from "next/link";

export default function CareerResources() {
  const resources = [
    {
      id: "job-internship",
      title: "Job & Internship Opportunities",
      description:
        "Explore the latest job circulars and internship openings from top textile and fashion companies.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "#3b82f6",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      id: "cv-template",
      title: "CV Template",
      description:
        "Download professionally designed CV templates tailored for the textile and fashion industry.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      color: "#22c55e",
      bgLight: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      id: "interview-tips",
      title: "Interview Preparation Tips",
      description:
        "Watch expert videos and learn strategies to ace your interviews with confidence.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      color: "#8b5cf6",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      id: "career-guideline",
      title: "Career Guideline",
      description:
        "Read comprehensive guides and watch tutorials on building a successful career path.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      ),
      color: "#f97316",
      bgLight: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <section id="career-resources" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Build Your Future
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Career Resources
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access our comprehensive collection of career resources designed to help
            you land your dream job in the textile and fashion industry.
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4" />
        </div>

        {/* Resources Grid - 2x2 on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {resources.map((resource, index) => (
            <Link
              href={`/career-resources#${resource.id}`}
              key={index}
              className="group relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                boxShadow: `0 4px 20px -5px ${resource.color}20`,
              }}
            >
              {/* Colored top border */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-2"
                style={{ backgroundColor: resource.color }}
              />

              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                style={{ backgroundColor: resource.color }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon Container */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${resource.color}15`,
                    color: resource.color,
                  }}
                >
                  {resource.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300"
                  style={{
                    color: undefined,
                  }}
                >
                  <span className="group-hover:text-current" style={{ color: "inherit" }}>
                    {resource.title}
                  </span>
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  {resource.description}
                </p>

                {/* Explore Button */}
                <div className="flex items-center">
                  <span
                    className="inline-flex items-center px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 group-hover:px-6"
                    style={{
                      backgroundColor: `${resource.color}15`,
                      color: resource.color,
                    }}
                  >
                    Explore
                    <svg
                      className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Corner decoration */}
              <div
                className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-10 transition-all duration-300 group-hover:opacity-20 group-hover:scale-125"
                style={{ backgroundColor: resource.color }}
              />
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link
            href="/career-resources"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            View All Resources
            <svg
              className="w-5 h-5 ml-2"
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
          </Link>
        </div>
      </div>
    </section>
  );
}
