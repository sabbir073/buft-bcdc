"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CareerGuideline {
  id: number;
  title: string;
  content: string;
  category: string | null;
  excerpt: string;
  author: string;
  readTime: string;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  videoTitle: string | null;
  viewsCount: number;
  date: string;
}

const GUIDELINES_PER_PAGE = 12;

export default function CareerGuidelinesPage() {
  const [guidelines, setGuidelines] = useState<CareerGuideline[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGuideline, setSelectedGuideline] = useState<CareerGuideline | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch guidelines from API
  useEffect(() => {
    async function fetchGuidelines() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/public/career-guidelines`, {
          cache: "no-store",
        });
        if (response.ok) {
          const result = await response.json();
          setGuidelines(result.guidelines || []);
          setCategories(result.categories || []);
        }
      } catch (error) {
        console.error("Failed to fetch career guidelines:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGuidelines();
  }, []);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string | null) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  // Handle guideline click - track view and open modal
  const handleGuidelineClick = async (guideline: CareerGuideline) => {
    setSelectedGuideline(guideline);

    // Track view
    try {
      await fetch(`/api/public/career-guidelines/${guideline.id}/view`, {
        method: "POST",
      });

      // Update local state
      setGuidelines((prev) =>
        prev.map((g) =>
          g.id === guideline.id ? { ...g, viewsCount: (g.viewsCount || 0) + 1 } : g
        )
      );
    } catch (error) {
      console.error("Failed to track view:", error);
    }
  };

  // Filter guidelines by category
  const filteredGuidelines =
    filterCategory === "all"
      ? guidelines
      : guidelines.filter((g) => g.category === filterCategory);

  // Pagination
  const totalPages = Math.ceil(filteredGuidelines.length / GUIDELINES_PER_PAGE);
  const paginatedGuidelines = filteredGuidelines.slice(
    (currentPage - 1) * GUIDELINES_PER_PAGE,
    currentPage * GUIDELINES_PER_PAGE
  );

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Career Guidelines
            </h1>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Expert advice and comprehensive guides to help you navigate your career path
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Filter by:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-gray-600">
              Showing {paginatedGuidelines.length} of {filteredGuidelines.length} guidelines
            </p>
          </div>
        </div>
      </section>

      {/* Guidelines Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <span className="text-gray-600">Loading guidelines...</span>
              </div>
            </div>
          ) : paginatedGuidelines.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No guidelines found</h3>
              <p className="text-gray-600">Check back later for career guidance articles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedGuidelines.map((guideline) => {
                const videoId = getYouTubeId(guideline.videoUrl);
                const thumbnailUrl = guideline.thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null);

                return (
                  <article
                    key={guideline.id}
                    onClick={() => handleGuidelineClick(guideline)}
                    className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/9] bg-gradient-to-br from-emerald-100 to-teal-100 overflow-hidden">
                      {thumbnailUrl ? (
                        <img
                          src={thumbnailUrl}
                          alt={guideline.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <svg className="w-16 h-16 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      )}

                      {/* Category Badge */}
                      {guideline.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full">
                          {guideline.category}
                        </span>
                      )}

                      {/* Video indicator */}
                      {guideline.videoUrl && (
                        <div className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-emerald-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      {/* Title */}
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors">
                        {guideline.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                        {guideline.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {guideline.readTime}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {(guideline.viewsCount || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? "bg-emerald-600 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Back Link */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/career-resources"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Career Resources
          </Link>
        </div>
      </section>

      <Footer />

      {/* Article Modal */}
      {selectedGuideline && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-start justify-between rounded-t-2xl z-10">
              <div className="flex-1 pr-4">
                <h2 className="text-xl font-bold text-gray-900">{selectedGuideline.title}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                  {selectedGuideline.category && (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                      {selectedGuideline.category}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {selectedGuideline.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {selectedGuideline.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {(selectedGuideline.viewsCount || 0).toLocaleString()} views
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedGuideline(null)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Featured Image or Video */}
              {selectedGuideline.videoUrl && getYouTubeId(selectedGuideline.videoUrl) ? (
                <div className="mb-6">
                  {selectedGuideline.videoTitle && (
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{selectedGuideline.videoTitle}</h3>
                  )}
                  <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(selectedGuideline.videoUrl)}?rel=0`}
                      title={selectedGuideline.videoTitle || selectedGuideline.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : selectedGuideline.thumbnailUrl ? (
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6">
                  <img
                    src={selectedGuideline.thumbnailUrl}
                    alt={selectedGuideline.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}

              {/* Article Content */}
              <div className="prose prose-emerald max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedGuideline.content}
                </div>
              </div>

              {/* Date */}
              <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
                Published on {selectedGuideline.date}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-6 py-4 rounded-b-2xl">
              <button
                onClick={() => setSelectedGuideline(null)}
                className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
