"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface InterviewTip {
  id: number;
  title: string;
  category: string;
  content: string;
  videoUrl: string;
  duration: string;
  thumbnailUrl: string;
  viewsCount: number;
}

const TIPS_PER_PAGE = 12;

export default function InterviewTipsPage() {
  const [tips, setTips] = useState<InterviewTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTip, setSelectedTip] = useState<InterviewTip | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch tips from API
  useEffect(() => {
    async function fetchTips() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/public/interview-tips`, {
          cache: "no-store",
        });
        if (response.ok) {
          const result = await response.json();
          setTips(result.tips || []);
          setCategories(result.categories || []);
        }
      } catch (error) {
        console.error("Failed to fetch interview tips:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTips();
  }, []);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  // Handle tip click - track view and open modal
  const handleTipClick = async (tip: InterviewTip) => {
    setSelectedTip(tip);

    // Track view
    try {
      await fetch(`/api/public/interview-tips/${tip.id}/view`, {
        method: "POST",
      });

      // Update local state
      setTips((prev) =>
        prev.map((t) =>
          t.id === tip.id ? { ...t, viewsCount: (t.viewsCount || 0) + 1 } : t
        )
      );
    } catch (error) {
      console.error("Failed to track view:", error);
    }
  };

  // Filter tips by category
  const filteredTips =
    filterCategory === "all"
      ? tips
      : tips.filter((tip) => tip.category === filterCategory);

  // Pagination
  const totalPages = Math.ceil(filteredTips.length / TIPS_PER_PAGE);
  const paginatedTips = filteredTips.slice(
    (currentPage - 1) * TIPS_PER_PAGE,
    currentPage * TIPS_PER_PAGE
  );

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Interview Preparation Tips
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Watch expert videos and learn proven strategies to ace your interviews
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
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
              Showing {paginatedTips.length} of {filteredTips.length} tips
            </p>
          </div>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <span className="text-gray-600">Loading tips...</span>
              </div>
            </div>
          ) : paginatedTips.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tips found</h3>
              <p className="text-gray-600">Check back later for interview preparation videos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedTips.map((tip) => {
                const videoId = getYouTubeId(tip.videoUrl);
                const thumbnailUrl = tip.thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null);

                return (
                  <div
                    key={tip.id}
                    onClick={() => handleTipClick(tip)}
                    className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-purple-200">
                      {thumbnailUrl ? (
                        <img
                          src={thumbnailUrl}
                          alt={tip.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Duration Badge */}
                      {tip.duration && (
                        <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
                          {tip.duration}
                        </span>
                      )}

                      {/* Category Badge */}
                      {tip.category && (
                        <span className="absolute top-2 left-2 px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                          {tip.category}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors">
                        {tip.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {(tip.viewsCount || 0).toLocaleString()} views
                      </div>
                    </div>
                  </div>
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
                      ? "bg-purple-600 text-white"
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
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Career Resources
          </Link>
        </div>
      </section>

      <Footer />

      {/* Video Modal */}
      {selectedTip && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div className="flex-1 pr-4">
                <h2 className="text-xl font-bold text-gray-900 line-clamp-1">{selectedTip.title}</h2>
                <div className="flex items-center gap-4 mt-1">
                  {selectedTip.category && (
                    <span className="text-sm text-purple-600 font-medium">{selectedTip.category}</span>
                  )}
                  <span className="text-sm text-gray-500">
                    {(selectedTip.viewsCount || 0).toLocaleString()} views
                  </span>
                  {selectedTip.duration && (
                    <span className="text-sm text-gray-500">{selectedTip.duration}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedTip(null)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Video Player */}
            <div className="p-6">
              {selectedTip.videoUrl && getYouTubeId(selectedTip.videoUrl) ? (
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-6">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(selectedTip.videoUrl)}?autoplay=1&rel=0`}
                    title={selectedTip.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-purple-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-purple-600">No video available</p>
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {selectedTip.content}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-6 py-4 rounded-b-2xl">
              <button
                onClick={() => setSelectedTip(null)}
                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
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
