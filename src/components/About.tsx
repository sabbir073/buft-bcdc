export default function About() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Strong Community",
      description: "The largest and most dedicated career-focused club at BUFT with a growing network of students and professionals.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Industry Connections",
      description: "Direct partnerships with Textile Industry & Corporate sector for exclusive internship and job opportunities.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Career Guidance",
      description: "Comprehensive guidelines and pathways to help students achieve their career goals effectively.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            About BCDC
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Image/Visual */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <span className="text-blue-600 font-bold text-3xl">BCDC</span>
                  </div>
                  <p className="text-blue-800 font-semibold text-lg">
                    Founded July 15, 2018
                  </p>
                  <p className="text-blue-600 text-sm mt-2">
                    BGMEA University of Fashion & Technology
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-blue-300/30 rounded-full" />
              <div className="absolute bottom-8 left-8 w-16 h-16 bg-blue-400/30 rounded-full" />
            </div>
          </div>

          {/* Right - Text Content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Building Careers, Creating Leaders
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              BUFT Career Development Club (BCDC) is a dedicated and the strongest
              career-concern community that was founded on July 15, 2018, within the
              dynamic environment of BGMEA University of Fashion & Technology.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              As one of the largest clubs at BUFT, we work dedicatedly with the
              Textile Industry & Corporate sector for the welfare of BUFT&apos;s students.
              We continuously expand our networks and help students through numerous
              internship and job placement opportunities.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our commitment goes beyond mere suggestions; we aim to provide students
              with appropriate guidelines and pathways that lead them toward their
              targeted goals.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
