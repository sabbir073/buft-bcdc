export default function Committee() {
  const executives = [
    {
      name: "John Doe",
      position: "President",
      image: null,
      quote: "Leading BCDC towards excellence",
    },
    {
      name: "Jane Smith",
      position: "Vice President",
      image: null,
      quote: "Building bridges to industry",
    },
    {
      name: "Ahmed Rahman",
      position: "General Secretary",
      image: null,
      quote: "Organizing success stories",
    },
    {
      name: "Sarah Khan",
      position: "Treasurer",
      image: null,
      quote: "Managing resources wisely",
    },
    {
      name: "Mike Johnson",
      position: "Program Coordinator",
      image: null,
      quote: "Creating impactful events",
    },
    {
      name: "Lisa Chen",
      position: "PR Secretary",
      image: null,
      quote: "Spreading the word",
    },
  ];

  return (
    <section id="committee" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Executive Committee
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated leaders driving BCDC&apos;s mission to empower students
            with career opportunities and professional growth.
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4" />
        </div>

        {/* Executive Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {executives.map((member, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-200 transition-colors" />

              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"/>
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="relative text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  {member.position}
                </p>
                <p className="text-gray-500 text-sm italic">
                  &quot;{member.quote}&quot;
                </p>
              </div>

              {/* Social Links */}
              <div className="relative flex justify-center gap-3 mt-6">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            View Full Committee
          </button>
        </div>
      </div>
    </section>
  );
}
