"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Publication {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image?: string;
  featured?: boolean;
}

export default function PublicationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const publications: Publication[] = [
    {
      id: 1,
      title: "BCDC Insiders Magazine - First Edition",
      excerpt: "Fashioning Careers: BCDC Insider - Our first-ever magazine highlighting achievements, success stories, and career guidance from industry leaders.",
      category: "Magazine",
      date: "Jan 14, 2024",
      readTime: "15 min read",
      author: "BCDC Editorial Team",
      featured: true,
    },
    {
      id: 2,
      title: "How to Build a Winning Resume for the Textile Industry",
      excerpt: "Learn the key elements that make your resume stand out to recruiters in the textile and fashion industry. Expert tips and templates included.",
      category: "Career Tips",
      date: "Dec 20, 2024",
      readTime: "5 min read",
      author: "Career Development Team",
    },
    {
      id: 3,
      title: "Top 10 Interview Questions for Fresh Graduates",
      excerpt: "Prepare for your job interviews with these commonly asked questions and expert-crafted answers to help you succeed.",
      category: "Interview Prep",
      date: "Dec 15, 2024",
      readTime: "7 min read",
      author: "HR Advisory Panel",
    },
    {
      id: 4,
      title: "Networking Tips: Building Professional Relationships",
      excerpt: "Discover effective strategies to expand your professional network and create meaningful connections in the industry.",
      category: "Professional Growth",
      date: "Dec 10, 2024",
      readTime: "4 min read",
      author: "Alumni Network",
    },
    {
      id: 5,
      title: "Understanding ERP Systems in Textile Manufacturing",
      excerpt: "A comprehensive guide to Enterprise Resource Planning systems and their role in modern textile manufacturing operations.",
      category: "Industry Insights",
      date: "Nov 25, 2024",
      readTime: "8 min read",
      author: "Technical Team",
    },
    {
      id: 6,
      title: "Career Paths in Fashion Design",
      excerpt: "Explore various career opportunities in fashion design, from entry-level positions to senior roles in the industry.",
      category: "Career Tips",
      date: "Nov 18, 2024",
      readTime: "6 min read",
      author: "Fashion Department",
    },
    {
      id: 7,
      title: "LinkedIn Optimization Guide for Students",
      excerpt: "Step-by-step guide to creating a compelling LinkedIn profile that attracts recruiters and industry professionals.",
      category: "Professional Growth",
      date: "Nov 10, 2024",
      readTime: "5 min read",
      author: "Digital Marketing Team",
    },
    {
      id: 8,
      title: "Sustainable Fashion: The Future of Textile Industry",
      excerpt: "How sustainability is reshaping the textile industry and what it means for your career in fashion and textiles.",
      category: "Industry Insights",
      date: "Oct 28, 2024",
      readTime: "7 min read",
      author: "Research Team",
    },
  ];

  const categories = ["All", "Magazine", "Career Tips", "Interview Prep", "Professional Growth", "Industry Insights"];

  const filteredPublications = publications.filter((pub) => {
    const matchesCategory = selectedCategory === "All" || pub.category === selectedCategory;
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPublication = publications.find((pub) => pub.featured);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white">Publications</span>
            </div>

            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-blue-200 text-sm font-medium mb-4">
                Blog & Articles
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Publications
              </h1>
              <p className="text-blue-100/80 max-w-2xl mx-auto text-lg">
                Stay updated with the latest career tips, industry insights, and professional development resources from BCDC.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Publication */}
        {featuredPublication && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="h-64 lg:h-auto bg-gradient-to-br from-blue-100 to-blue-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <p className="text-blue-800 font-semibold">BCDC Magazine</p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-yellow-400 text-yellow-900 font-semibold rounded-full text-sm">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">
                    {featuredPublication.category}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {featuredPublication.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPublication.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span>{featuredPublication.date}</span>
                    <span>•</span>
                    <span>{featuredPublication.readTime}</span>
                    <span>•</span>
                    <span>{featuredPublication.author}</span>
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors w-fit"
                  >
                    Read Magazine
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Filters and Search */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                placeholder="Search publications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </section>

        {/* Publications Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPublications.filter((pub) => !pub.featured).map((publication) => (
              <article
                key={publication.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      {publication.category}
                    </span>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{publication.date}</span>
                    <span>•</span>
                    <span>{publication.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {publication.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{publication.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{publication.author}</span>
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
                </div>
              </article>
            ))}
          </div>

          {/* No Results */}
          {filteredPublications.filter((pub) => !pub.featured).length === 0 && (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No publications found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}

          {/* Load More Button */}
          {filteredPublications.length > 6 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-50 transition-colors border border-blue-200 shadow-lg">
                Load More Articles
              </button>
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to receive the latest career tips, industry insights, and BCDC updates directly in your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border-2 border-white/20 bg-white/10 text-white placeholder-blue-200 focus:border-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
