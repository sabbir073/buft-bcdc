import Link from "next/link";

export default function Resources() {
  const resources = [
    {
      title: "CV & Resume Templates",
      description: "Professional templates tailored for the textile and fashion industry to make your application stand out.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      count: "15+ Templates",
      color: "blue",
    },
    {
      title: "Cover Letter Samples",
      description: "Industry-specific cover letter examples to help you craft compelling applications for your dream jobs.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      count: "20+ Samples",
      color: "green",
    },
    {
      title: "Interview Preparation Tips",
      description: "Comprehensive guides to ace your interviews with confidence, from common questions to body language tips.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      count: "50+ Tips",
      color: "purple",
    },
    {
      title: "Job & Internship Guides",
      description: "Step-by-step guides for finding and securing internships and jobs in the textile and corporate sector.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      count: "30+ Guides",
      color: "orange",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600",
    green: "bg-green-100 text-green-600 group-hover:bg-green-600",
    purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-600",
    orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-600",
  };

  return (
    <section id="resources" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Grow Your Career
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Career Resources
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access our comprehensive collection of career resources designed to help
            you succeed in the competitive job market.
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4" />
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <Link
              href="#"
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 flex gap-6 items-start"
            >
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors group-hover:text-white ${
                  colorClasses[resource.color as keyof typeof colorClasses]
                }`}
              >
                {resource.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </h3>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {resource.count}
                  </span>
                </div>
                <p className="text-gray-600">{resource.description}</p>
                <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                  Access Resources
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Need Personalized Guidance?
              </h3>
              <p className="text-white/80">
                Connect with our career mentors for one-on-one guidance and support.
              </p>
            </div>
            <Link
              href="#contact"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg whitespace-nowrap"
            >
              Get Mentorship
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
