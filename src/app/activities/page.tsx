"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { activities, Activity } from "@/data/activities";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Lightbox component
function Lightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close lightbox"
      >
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToPrev();
        }}
        className="absolute left-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Previous image"
      >
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Image container */}
      <div
        className="relative max-w-5xl max-h-[85vh] mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          width={1200}
          height={800}
          className="max-h-[85vh] w-auto h-auto object-contain rounded-lg"
          priority
        />
      </div>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        className="absolute right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Next image"
      >
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Thumbnail strip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4 py-2 bg-black/50 rounded-full">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
              idx === currentIndex
                ? "border-blue-500 scale-110"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Activity Card component
function ActivityCard({
  activity,
  onOpenGallery,
}: {
  activity: Activity;
  onOpenGallery: (images: string[], index: number) => void;
}) {
  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2">
      {/* Main Image */}
      <div
        className="relative h-52 overflow-hidden cursor-pointer"
        onClick={() => onOpenGallery(activity.images, 0)}
      >
        <Image
          src={activity.images[0]}
          alt={activity.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Image count badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {activity.imageCount}
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium">View Gallery</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Date */}
        <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {activity.date}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {activity.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {truncateDescription(activity.description)}
        </p>

        {/* View Details Link */}
        <Link
          href={`/activities/${activity.id}`}
          className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors group/link"
        >
          <span>View Details</span>
          <svg
            className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
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
  );
}

// Extract year from date string
function extractYear(dateString: string): string {
  const match = dateString.match(/\d{4}/);
  return match ? match[0] : "";
}

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: string[];
    currentIndex: number;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  // Get unique years from activities, sorted newest first
  const years = useMemo(() => {
    const yearSet = new Set<string>();
    activities.forEach((activity) => {
      const year = extractYear(activity.date);
      if (year) yearSet.add(year);
    });
    return Array.from(yearSet).sort((a, b) => parseInt(b) - parseInt(a));
  }, []);

  // Sort activities by id (newest first) and apply filters
  const filteredActivities = useMemo(() => {
    return [...activities]
      .sort((a, b) => b.id - a.id)
      .filter((activity) => {
        const matchesSearch = activity.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesYear =
          selectedYear === "all" ||
          extractYear(activity.date) === selectedYear;
        return matchesSearch && matchesYear;
      });
  }, [searchQuery, selectedYear]);

  const openGallery = (images: string[], index: number) => {
    setLightbox({ isOpen: true, images, currentIndex: index });
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setLightbox({ isOpen: false, images: [], currentIndex: 0 });
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              {/* Breadcrumb */}
              <div className="flex items-center justify-center gap-2 text-blue-200 text-sm mb-6">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <svg
                  className="w-4 h-4"
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
                <span className="text-white">Activities</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Activities & Programs
              </h1>
              <p className="text-blue-100 max-w-2xl mx-auto text-lg">
                Explore our events, workshops, seminars, and programs designed
                to help you build skills, expand your network, and accelerate
                your career growth.
              </p>
              <div className="w-24 h-1 bg-white/50 mx-auto rounded-full mt-6" />
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search activities by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Year Filter */}
              <div className="md:w-48">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 bg-white cursor-pointer"
                >
                  <option value="all">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedYear !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedYear("all");
                  }}
                  className="px-4 py-3 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Clear
                </button>
              )}
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-500">
              Showing {filteredActivities.length} of {activities.length}{" "}
              activities
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onOpenGallery={openGallery}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No activities found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedYear("all");
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Lightbox Modal */}
      {lightbox.isOpen && (
        <Lightbox
          images={lightbox.images}
          initialIndex={lightbox.currentIndex}
          onClose={closeGallery}
        />
      )}
    </>
  );
}
