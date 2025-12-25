import Link from "next/link";

export default function Blog() {
  const posts = [
    {
      title: "How to Build a Winning Resume for the Textile Industry",
      excerpt: "Learn the key elements that make your resume stand out to recruiters in the textile and fashion industry.",
      category: "Career Tips",
      date: "Dec 20, 2024",
      readTime: "5 min read",
    },
    {
      title: "Top 10 Interview Questions for Fresh Graduates",
      excerpt: "Prepare for your job interviews with these commonly asked questions and expert-crafted answers.",
      category: "Interview Prep",
      date: "Dec 15, 2024",
      readTime: "7 min read",
    },
    {
      title: "Networking Tips: Building Professional Relationships",
      excerpt: "Discover effective strategies to expand your professional network and create meaningful connections.",
      category: "Professional Growth",
      date: "Dec 10, 2024",
      readTime: "4 min read",
    },
  ];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Latest Insights
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Blog & Articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest career tips, industry insights, and
            professional development resources from our experts.
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4" />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                <Link
                  href="#"
                  className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            View All Articles
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
