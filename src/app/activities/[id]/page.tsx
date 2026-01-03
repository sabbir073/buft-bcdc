"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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

export default function ActivityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: string[];
    currentIndex: number;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  useEffect(() => {
    const id = parseInt(params.id as string);
    const foundActivity = activities.find((a) => a.id === id);
    setActivity(foundActivity || null);
  }, [params.id]);

  const openGallery = (index: number) => {
    if (activity) {
      setLightbox({ isOpen: true, images: activity.images, currentIndex: index });
      document.body.style.overflow = "hidden";
    }
  };

  const closeGallery = () => {
    setLightbox({ isOpen: false, images: [], currentIndex: 0 });
    document.body.style.overflow = "auto";
  };

  // Get previous and next activities
  const currentIndex = activities.findIndex((a) => a.id === activity?.id);
  const prevActivity = currentIndex > 0 ? activities[currentIndex - 1] : null;
  const nextActivity =
    currentIndex < activities.length - 1 ? activities[currentIndex + 1] : null;

  if (!activity) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
          <div className="text-center px-4">
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Activity Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The activity you are looking for does not exist or has been
              removed.
            </p>
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Activities
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Hero Section with Main Image */}
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <Image
            src={activity.images[0]}
            alt={activity.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                <Link
                  href="/"
                  className="hover:text-white transition-colors"
                >
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
                <Link
                  href="/activities"
                  className="hover:text-white transition-colors"
                >
                  Activities
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
                <span className="text-white">{activity.title}</span>
              </div>

              {/* Date badge */}
              <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {activity.title}
              </h1>

              {/* Image count */}
              <div className="flex items-center gap-2 text-white/80">
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
                <span>{activity.imageCount} photos in this gallery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Description */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              About This Event
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {activity.description}
            </p>
          </div>

          {/* Gallery Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
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
              </div>
              Event Gallery
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {activity.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => openGallery(index)}
                >
                  <Image
                    src={image}
                    alt={`${activity.title} - Photo ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* Image number badge */}
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
            {/* Previous Activity */}
            {prevActivity ? (
              <Link
                href={`/activities/${prevActivity.id}`}
                className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="text-sm text-gray-400">Previous</span>
                  <p className="font-medium line-clamp-1 max-w-[200px]">
                    {prevActivity.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* Back to Activities */}
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
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
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              All Activities
            </Link>

            {/* Next Activity */}
            {nextActivity ? (
              <Link
                href={`/activities/${nextActivity.id}`}
                className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <div className="text-right">
                  <span className="text-sm text-gray-400">Next</span>
                  <p className="font-medium line-clamp-1 max-w-[200px]">
                    {nextActivity.title}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
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
