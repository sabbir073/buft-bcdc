"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Placeholder job data
const jobOpportunities = [
  {
    id: 1,
    title: "Quality Control Manager",
    company: "ABC Textiles Ltd.",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    deadline: "January 15, 2026",
    image: "/placeholder-job-1.jpg",
    description:
      "We are looking for an experienced Quality Control Manager to oversee our production quality standards.",
  },
  {
    id: 2,
    title: "Fashion Design Intern",
    company: "Style House Bangladesh",
    location: "Gazipur, Bangladesh",
    type: "Internship",
    deadline: "January 20, 2026",
    image: "/placeholder-job-2.jpg",
    description:
      "Join our design team as an intern and gain hands-on experience in fashion design and product development.",
  },
  {
    id: 3,
    title: "Merchandiser",
    company: "Global Apparel Export",
    location: "Chittagong, Bangladesh",
    type: "Full-time",
    deadline: "January 25, 2026",
    image: "/placeholder-job-3.jpg",
    description:
      "Seeking a dynamic merchandiser to handle international buyer communications and order management.",
  },
  {
    id: 4,
    title: "Production Planning Trainee",
    company: "Textile Mills Corporation",
    location: "Narayanganj, Bangladesh",
    type: "Trainee",
    deadline: "February 1, 2026",
    image: "/placeholder-job-4.jpg",
    description:
      "Start your career in production planning with our comprehensive training program.",
  },
];

// Placeholder CV templates
const cvTemplates = [
  {
    id: 1,
    title: "Modern Professional",
    image: "/placeholder-cv-1.jpg",
    downloadUrl: "#",
  },
  {
    id: 2,
    title: "Creative Designer",
    image: "/placeholder-cv-2.jpg",
    downloadUrl: "#",
  },
  {
    id: 3,
    title: "Corporate Classic",
    image: "/placeholder-cv-3.jpg",
    downloadUrl: "#",
  },
  {
    id: 4,
    title: "Minimalist Clean",
    image: "/placeholder-cv-4.jpg",
    downloadUrl: "#",
  },
  {
    id: 5,
    title: "Fresh Graduate",
    image: "/placeholder-cv-5.jpg",
    downloadUrl: "#",
  },
  {
    id: 6,
    title: "Executive Style",
    image: "/placeholder-cv-6.jpg",
    downloadUrl: "#",
  },
];

// Placeholder interview videos
const interviewVideos = [
  {
    id: 1,
    title: "How to Ace Your First Interview",
    thumbnail: "/placeholder-video-1.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "12:45",
    views: "15K",
  },
  {
    id: 2,
    title: "Common Interview Questions & Best Answers",
    thumbnail: "/placeholder-video-2.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "18:30",
    views: "22K",
  },
  {
    id: 3,
    title: "Body Language Tips for Interviews",
    thumbnail: "/placeholder-video-3.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "10:15",
    views: "8K",
  },
  {
    id: 4,
    title: "Virtual Interview Preparation Guide",
    thumbnail: "/placeholder-video-4.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "14:20",
    views: "12K",
  },
];

// Placeholder career guidelines
const careerGuidelines = [
  {
    id: 1,
    title: "Building Your Career in the Textile Industry",
    excerpt:
      "The textile industry offers diverse career paths from design to management. Learn how to navigate your journey and make strategic decisions for long-term success.",
    content:
      "The textile and fashion industry is one of the most dynamic sectors in Bangladesh...",
    author: "Career Team",
    date: "December 28, 2025",
    readTime: "8 min read",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoTitle: "Career Paths in Textile Industry",
  },
  {
    id: 2,
    title: "From Campus to Corporate: A Graduate's Guide",
    excerpt:
      "Transitioning from student life to the professional world can be challenging. This comprehensive guide covers everything you need to know.",
    content:
      "Making the transition from university to the corporate world requires preparation...",
    author: "Career Team",
    date: "December 20, 2025",
    readTime: "10 min read",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoTitle: "Campus to Corporate Transition",
  },
  {
    id: 3,
    title: "Networking Strategies for Career Growth",
    excerpt:
      "Discover effective networking strategies that can open doors to new opportunities and accelerate your career progression.",
    content:
      "Professional networking is one of the most powerful tools for career advancement...",
    author: "Career Team",
    date: "December 15, 2025",
    readTime: "6 min read",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoTitle: "Professional Networking Tips",
  },
];

export default function CareerResourcesPage() {
  // Smooth scroll to section on page load if hash is present
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6">
            Your Career Journey Starts Here
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Career Resources
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Everything you need to build a successful career in the textile and
            fashion industry. From job opportunities to interview preparation.
          </p>

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { href: "#job-internship", label: "Jobs & Internships", color: "#3b82f6" },
              { href: "#cv-template", label: "CV Templates", color: "#22c55e" },
              { href: "#interview-tips", label: "Interview Tips", color: "#8b5cf6" },
              { href: "#career-guideline", label: "Career Guidelines", color: "#f97316" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white hover:text-blue-600 transition-all duration-300 border border-white/20"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Job & Internship Opportunities Section */}
      <section
        id="job-internship"
        className="py-20 bg-gradient-to-b from-blue-50 to-white scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#3b82f615", color: "#3b82f6" }}
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Job & Internship Opportunities
              </h2>
              <p className="text-gray-600 mt-1">
                Latest openings from top companies in the textile industry
              </p>
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {jobOpportunities.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Job Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 text-blue-400 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <p className="text-blue-500 text-sm font-medium">{job.company}</p>
                    </div>
                  </div>
                  {/* Job Type Badge */}
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      job.type === "Full-time"
                        ? "bg-green-100 text-green-700"
                        : job.type === "Internship"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {job.type}
                  </span>
                </div>

                {/* Job Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{job.description}</p>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center text-sm text-gray-500">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {job.location}
                    </span>
                    <span className="inline-flex items-center text-sm text-gray-500">
                      <svg
                        className="w-4 h-4 mr-1"
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
                      Deadline: {job.deadline}
                    </span>
                  </div>

                  <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-10">
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
              View All Job Openings
            </button>
          </div>
        </div>
      </section>

      {/* CV Template Section */}
      <section
        id="cv-template"
        className="py-20 bg-gradient-to-b from-green-50 to-white scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#22c55e15", color: "#22c55e" }}
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">CV Templates</h2>
              <p className="text-gray-600 mt-1">
                Professional templates to make your application stand out
              </p>
            </div>
          </div>

          {/* CV Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Template Preview */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-green-100 to-green-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      {/* Placeholder CV Preview */}
                      <div className="bg-white rounded-lg shadow-md p-4 transform group-hover:scale-105 transition-transform duration-300">
                        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3" />
                        <div className="w-24 h-3 bg-gray-200 rounded mx-auto mb-2" />
                        <div className="w-20 h-2 bg-gray-100 rounded mx-auto mb-4" />
                        <div className="space-y-2">
                          <div className="w-full h-2 bg-gray-100 rounded" />
                          <div className="w-full h-2 bg-gray-100 rounded" />
                          <div className="w-3/4 h-2 bg-gray-100 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-green-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="px-6 py-3 bg-white text-green-600 font-semibold rounded-full transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Download
                    </button>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-900">{template.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview Preparation Tips Section */}
      <section
        id="interview-tips"
        className="py-20 bg-gradient-to-b from-purple-50 to-white scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#8b5cf615", color: "#8b5cf6" }}
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Interview Preparation Tips
              </h2>
              <p className="text-gray-600 mt-1">
                Expert videos to help you ace your interviews with confidence
              </p>
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {interviewVideos.map((video) => (
              <a
                key={video.id}
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-purple-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Play Button */}
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {video.duration}
                  </span>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {video.title}
                  </h3>
                  <span className="text-sm text-gray-500">{video.views} views</span>
                </div>
              </a>
            ))}
          </div>

          {/* Tips Cards */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Research the Company",
                description:
                  "Learn about the company's history, values, products, and recent news before your interview.",
              },
              {
                icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                title: "Practice Common Questions",
                description:
                  "Prepare answers for common interview questions and practice them out loud.",
              },
              {
                icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
                title: "Ask Thoughtful Questions",
                description:
                  "Prepare insightful questions to ask your interviewer about the role and company.",
              },
            ].map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={tip.icon}
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{tip.title}</h4>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Guideline Section */}
      <section
        id="career-guideline"
        className="py-20 bg-gradient-to-b from-orange-50 to-white scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#f9731615", color: "#f97316" }}
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
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Career Guidelines</h2>
              <p className="text-gray-600 mt-1">
                Comprehensive guides and tutorials for career success
              </p>
            </div>
          </div>

          {/* Blog-style Cards */}
          <div className="space-y-8">
            {careerGuidelines.map((guide, index) => (
              <div
                key={guide.id}
                className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  index % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                <div className="lg:flex">
                  {/* Content Side */}
                  <div className="lg:w-1/2 p-8">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                      <span>{guide.date}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{guide.readTime}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-orange-600 transition-colors cursor-pointer">
                      {guide.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">{guide.excerpt}</p>

                    <div className="flex items-center gap-4">
                      <button className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors">
                        Read Full Article
                      </button>
                      <span className="text-sm text-gray-500">By {guide.author}</span>
                    </div>
                  </div>

                  {/* Video Side */}
                  <div className="lg:w-1/2 p-6 bg-gradient-to-br from-orange-50 to-orange-100">
                    <div className="h-full flex flex-col">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Related Video
                      </h4>
                      <a
                        href={guide.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex-1 relative rounded-xl overflow-hidden bg-gradient-to-br from-orange-200 to-orange-300 min-h-[200px]"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          {/* Play Button */}
                          <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg
                              className="w-10 h-10 text-white ml-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white bg-black/50 px-3 py-2 rounded-lg text-sm font-medium">
                            {guide.videoTitle}
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Need Personalized Career Guidance?
                </h3>
                <p className="text-white/80">
                  Connect with our career mentors for one-on-one guidance tailored to
                  your goals.
                </p>
              </div>
              <Link
                href="/#contact"
                className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-colors shadow-lg whitespace-nowrap"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
