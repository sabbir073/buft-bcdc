"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SuccessStory {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  testimonial: string;
  rating: number;
  image: string | null;
  imageUrl: string | null;
  date: string;
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    fetchStories(currentPage);
  }, [currentPage]);

  const fetchStories = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/public/success-stories?page=${page}&per_page=${ITEMS_PER_PAGE}`
      );
      const result = await response.json();

      if (result.success) {
        setStories(result.data);
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch success stories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Hear from our successful members who have transformed their careers with BCDC&apos;s guidance and support.
            </p>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading stories...</p>
              </div>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No success stories available at the moment.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stories.map((story) => (
                  <div
                    key={story.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="p-8">
                      {/* Quote Icon */}
                      <div className="mb-4">
                        <svg className="w-10 h-10 text-blue-100" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(story.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-600 leading-relaxed mb-6 line-clamp-4">
                        &ldquo;{story.testimonial}&rdquo;
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        {story.imageUrl ? (
                          <img
                            src={story.imageUrl}
                            alt={story.name}
                            className="w-14 h-14 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {story.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-gray-900">{story.name}</h4>
                          <p className="text-sm text-gray-500">{story.role}</p>
                          <p className="text-xs text-blue-600">{story.company}</p>
                        </div>
                      </div>

                      {/* Date */}
                      <p className="mt-4 text-xs text-gray-400">{story.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                    {Math.min(currentPage * ITEMS_PER_PAGE, pagination.total)} of{" "}
                    {pagination.total} stories
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      First
                    </button>
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: Math.min(5, pagination.totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (pagination.totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= pagination.totalPages - 2) {
                            pageNum = pagination.totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                                currentPage === pageNum
                                  ? "bg-blue-600 text-white"
                                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}
                    </div>
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === pagination.totalPages}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                    <button
                      onClick={() => setCurrentPage(pagination.totalPages)}
                      disabled={currentPage === pagination.totalPages}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Last
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join BCDC today and take the first step towards your dream career. Our community of mentors and resources are here to help you succeed.
          </p>
          <a
            href="/membership"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg"
          >
            Join BCDC Today
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
