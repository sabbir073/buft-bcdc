"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobApplicationModal from "@/components/JobApplicationModal";

interface JobPost {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  deadline: string | null;
  description: string;
  salaryRange?: string | null;
  applicationUrl?: string | null;
  contactEmail?: string | null;
  requirements?: string | null;
}

interface CVTemplate {
  id: number;
  title: string;
  description?: string;
  category: string;
  downloadUrl: string;
  downloads?: number;
}

interface InterviewTip {
  id: number;
  title: string;
  category: string;
  content: string;
  videoUrl: string;
  duration: string;
  thumbnailUrl: string;
  viewsCount: number;
  displayOrder: number;
}

interface CareerGuideline {
  id: number;
  title: string;
  content: string;
  category: string;
  excerpt: string;
  author: string;
  readTime: string;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  videoTitle: string | null;
  viewsCount: number;
  date: string;
}

interface SuccessStory {
  id: number;
  name: string;
  designation: string;
  company: string;
  testimonial: string;
  imageUrl: string | null;
  date: string;
}

export default function CareerResourcesPage() {
  const [jobOpportunities, setJobOpportunities] = useState<JobPost[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [cvTemplates, setCvTemplates] = useState<CVTemplate[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [interviewTips, setInterviewTips] = useState<InterviewTip[]>([]);
  const [loadingTips, setLoadingTips] = useState(true);
  const [careerGuidelines, setCareerGuidelines] = useState<CareerGuideline[]>([]);
  const [loadingGuidelines, setLoadingGuidelines] = useState(true);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [loadingStories, setLoadingStories] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedTip, setSelectedTip] = useState<InterviewTip | null>(null);
  const [selectedGuideline, setSelectedGuideline] = useState<CareerGuideline | null>(null);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string | null) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  // Handle interview tip click - track view and open modal
  const handleTipClick = async (tip: InterviewTip) => {
    setSelectedTip(tip);

    // Track view
    try {
      await fetch(`/api/public/interview-tips/${tip.id}/view`, {
        method: 'POST',
      });

      // Update local state
      setInterviewTips(prev =>
        prev.map(t =>
          t.id === tip.id ? { ...t, viewsCount: (t.viewsCount || 0) + 1 } : t
        )
      );
    } catch (error) {
      console.error('Failed to track view:', error);
    }
  };

  // Handle career guideline click - track view and open modal
  const handleGuidelineClick = async (guideline: CareerGuideline) => {
    setSelectedGuideline(guideline);

    // Track view
    try {
      await fetch(`/api/public/career-guidelines/${guideline.id}/view`, {
        method: 'POST',
      });

      // Update local state
      setCareerGuidelines(prev =>
        prev.map(g =>
          g.id === guideline.id ? { ...g, viewsCount: (g.viewsCount || 0) + 1 } : g
        )
      );
    } catch (error) {
      console.error('Failed to track view:', error);
    }
  };

  // Handle CV template download with tracking
  const handleDownload = async (template: CVTemplate) => {
    try {
      // Track the download
      await fetch(`/api/public/cv-templates/${template.id}/download`, {
        method: 'POST',
      });

      // Update local state to show incremented count
      setCvTemplates(prev => prev.map(t =>
        t.id === template.id
          ? { ...t, downloads: (t.downloads || 0) + 1 }
          : t
      ));

      // Open the PDF in a new tab
      window.open(template.downloadUrl, '_blank');
    } catch (error) {
      console.error('Failed to track download:', error);
      // Still open the PDF even if tracking fails
      window.open(template.downloadUrl, '_blank');
    }
  };

  // Fetch job posts from API
  useEffect(() => {
    async function fetchJobs() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://buftcdc.com';
        const response = await fetch(`${baseUrl}/api/public/job-posts`, {
          cache: 'no-store',
        });

        if (response.ok) {
          const data = await response.json();
          setJobOpportunities(data.slice(0, 4)); // Show only first 4 jobs
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoadingJobs(false);
      }
    }

    fetchJobs();
  }, []);

  // Fetch CV templates from API
  useEffect(() => {
    async function fetchTemplates() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://buftcdc.com';
        const response = await fetch(`${baseUrl}/api/public/cv-templates`, {
          cache: 'no-store',
        });

        if (response.ok) {
          const data = await response.json();
          setCvTemplates(data.templates || []);
        }
      } catch (error) {
        console.error('Failed to fetch CV templates:', error);
      } finally {
        setLoadingTemplates(false);
      }
    }

    fetchTemplates();
  }, []);

  // Fetch interview tips from API
  useEffect(() => {
    async function fetchInterviewTips() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://buftcdc.com';
        const response = await fetch(`${baseUrl}/api/public/interview-tips`, {
          cache: 'no-store',
        });

        if (response.ok) {
          const data = await response.json();
          setInterviewTips(data.tips || []);
        }
      } catch (error) {
        console.error('Failed to fetch interview tips:', error);
      } finally {
        setLoadingTips(false);
      }
    }

    fetchInterviewTips();
  }, []);

  // Fetch career guidelines from API
  useEffect(() => {
    async function fetchCareerGuidelines() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://buftcdc.com';
        const response = await fetch(`${baseUrl}/api/public/career-guidelines?limit=3`, {
          cache: 'no-store',
        });

        if (response.ok) {
          const data = await response.json();
          setCareerGuidelines(data.guidelines || []);
        }
      } catch (error) {
        console.error('Failed to fetch career guidelines:', error);
      } finally {
        setLoadingGuidelines(false);
      }
    }

    fetchCareerGuidelines();
  }, []);

  // Fetch success stories from API
  useEffect(() => {
    async function fetchSuccessStories() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://buftcdc.com';
        const response = await fetch(`${baseUrl}/api/public/success-stories?limit=4`, {
          cache: 'no-store',
        });

        if (response.ok) {
          const data = await response.json();
          setSuccessStories(data.stories || []);
        }
      } catch (error) {
        console.error('Failed to fetch success stories:', error);
      } finally {
        setLoadingStories(false);
      }
    }

    fetchSuccessStories();
  }, []);

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
              { href: "#success-stories", label: "Success Stories", color: "#ec4899" },
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
          {loadingJobs ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-gray-600">Loading job opportunities...</span>
              </div>
            </div>
          ) : jobOpportunities.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
              <p className="text-gray-500">No job opportunities available at the moment</p>
            </div>
          ) : (
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
                  {/* Status Badge */}
                  {job.deadline && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                        new Date(job.deadline) < new Date()
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {new Date(job.deadline) < new Date() ? "Closed" : "Open"}
                    </span>
                  )}
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

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
            </div>
          )}

          {/* View More Button */}
          <div className="text-center mt-10">
            <Link
              href="/jobs"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 inline-block"
            >
              View All Job Openings
            </Link>
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

          {/* Loading State */}
          {loadingTemplates ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading CV templates...</p>
            </div>
          ) : cvTemplates.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
              <p className="text-gray-600">No CV templates available at the moment.</p>
            </div>
          ) : (
            <>
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

                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold">
                        {template.category}
                      </span>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-green-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={() => handleDownload(template)}
                          className="px-6 py-3 bg-white text-green-600 font-semibold rounded-full transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-green-50"
                        >
                          Download
                        </button>
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-center mb-2">{template.title}</h3>
                      {template.description && (
                        <p className="text-sm text-gray-600 text-center line-clamp-2">
                          {template.description}
                        </p>
                      )}
                      {template.downloads !== undefined && (
                        <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
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
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          {template.downloads} downloads
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
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
          {loadingTips ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <span className="text-gray-600">Loading interview tips...</span>
              </div>
            </div>
          ) : interviewTips.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
              <p className="text-gray-500">No interview tips available at the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {interviewTips.slice(0, 8).map((tip) => {
                const videoId = getYouTubeId(tip.videoUrl);
                const thumbnailUrl = tip.thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null);

                return (
                  <div
                    key={tip.id}
                    onClick={() => handleTipClick(tip)}
                    className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-purple-200">
                      {thumbnailUrl ? (
                        <img
                          src={thumbnailUrl}
                          alt={tip.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg
                              className="w-8 h-8 text-white ml-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
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
                      {tip.duration && (
                        <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
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

                    {/* Video Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
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

          {/* View All Interview Tips Button */}
          {interviewTips.length > 0 && (
            <div className="text-center mt-10">
              <Link
                href="/interview-tips"
                className="px-8 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 inline-block"
              >
                View All Interview Tips
              </Link>
            </div>
          )}

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

          {/* Guidelines Grid */}
          {loadingGuidelines ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                <span className="text-gray-600">Loading career guidelines...</span>
              </div>
            </div>
          ) : careerGuidelines.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
              <p className="text-gray-500">No career guidelines available at the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerGuidelines.map((guide) => {
                const videoId = getYouTubeId(guide.videoUrl);
                const thumbnailUrl = guide.thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null);

                return (
                  <article
                    key={guide.id}
                    onClick={() => handleGuidelineClick(guide)}
                    className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/9] bg-gradient-to-br from-orange-100 to-orange-200 overflow-hidden">
                      {thumbnailUrl ? (
                        <img
                          src={thumbnailUrl}
                          alt={guide.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <svg className="w-16 h-16 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      )}

                      {/* Category Badge */}
                      {guide.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-orange-600 text-white text-xs font-medium rounded-full">
                          {guide.category}
                        </span>
                      )}

                      {/* Video indicator */}
                      {guide.videoUrl && (
                        <div className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-orange-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      {/* Title */}
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                        {guide.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                        {guide.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {guide.readTime}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {(guide.viewsCount || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* View All Career Guidelines Button */}
          {careerGuidelines.length > 0 && (
            <div className="text-center mt-10">
              <Link
                href="/career-guidelines"
                className="px-8 py-3 border-2 border-orange-600 text-orange-600 font-semibold rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300 inline-block"
              >
                View All Career Guidelines
              </Link>
            </div>
          )}

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
                href="/contact"
                className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-colors shadow-lg whitespace-nowrap"
              >
                Contact Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section
        id="success-stories"
        className="py-20 bg-gradient-to-b from-pink-50 to-white scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#ec489915", color: "#ec4899" }}
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
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
              <p className="text-gray-600 mt-1">
                Inspiring journeys of our alumni who achieved their career goals
              </p>
            </div>
          </div>

          {/* Success Stories Grid */}
          {loadingStories ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                <span className="text-gray-600">Loading success stories...</span>
              </div>
            </div>
          ) : successStories.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <p className="text-gray-500">No success stories available at the moment</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {successStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-8">
                    {/* Quote Icon */}
                    <div className="text-pink-200 mb-4">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Testimonial */}
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-6">
                      {story.testimonial}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                        {story.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{story.name}</h4>
                        <p className="text-sm text-gray-500">
                          {story.designation} at {story.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View More Button */}
          <div className="text-center mt-10">
            <Link href="/success-stories" className="px-8 py-3 border-2 border-pink-600 text-pink-600 font-semibold rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300">
              View All Success Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Job Details</h2>
              <button
                onClick={() => setSelectedJob(null)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Job Header */}
              <div className="mb-6">
                <div className="flex gap-2 mb-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedJob.type === "Full-time"
                        ? "bg-green-100 text-green-700"
                        : selectedJob.type === "Internship"
                        ? "bg-purple-100 text-purple-700"
                        : selectedJob.type === "Part-time"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {selectedJob.type}
                  </span>
                  {selectedJob.deadline && (
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        new Date(selectedJob.deadline) < new Date()
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {new Date(selectedJob.deadline) < new Date() ? "Closed" : "Open"}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.title}</h3>
                <p className="text-lg text-blue-600 font-medium">{selectedJob.company}</p>
              </div>

              {/* Job Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-900">{selectedJob.location}</p>
                  </div>
                </div>

                {selectedJob.deadline && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Deadline</p>
                      <p className="text-sm font-medium text-gray-900">{selectedJob.deadline}</p>
                    </div>
                  </div>
                )}

                {selectedJob.salaryRange && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Salary Range</p>
                      <p className="text-sm font-medium text-gray-900">{selectedJob.salaryRange}</p>
                    </div>
                  </div>
                )}

                {selectedJob.contactEmail && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Contact</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{selectedJob.contactEmail}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h4>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{selectedJob.description}</p>
              </div>

              {/* Requirements */}
              {selectedJob.requirements && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h4>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">{selectedJob.requirements}</div>
                </div>
              )}

              {/* Apply Button */}
              <div className="flex gap-3">
                {selectedJob.deadline && new Date(selectedJob.deadline) < new Date() ? (
                  <button disabled className="flex-1 py-4 bg-gray-300 text-gray-500 font-semibold rounded-xl cursor-not-allowed text-center">
                    Application Closed
                  </button>
                ) : selectedJob.applicationUrl ? (
                  <a
                    href={selectedJob.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    Apply Now
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <button
                    onClick={() => setShowApplicationModal(true)}
                    className="flex-1 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    Apply Now
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Job Application Modal */}
      {selectedJob && showApplicationModal && (
        <JobApplicationModal
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
          jobId={selectedJob.id}
          jobTitle={selectedJob.title}
          companyName={selectedJob.company}
        />
      )}

      {/* Interview Tip Video Modal */}
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
              {selectedTip.content && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {selectedTip.content}
                  </div>
                </div>
              )}
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

      {/* Career Guideline Modal */}
      {selectedGuideline && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-start justify-between rounded-t-2xl z-10">
              <div className="flex-1 pr-4">
                <h2 className="text-xl font-bold text-gray-900">{selectedGuideline.title}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                  {selectedGuideline.category && (
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
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
              <div className="prose prose-orange max-w-none">
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
                className="w-full py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors"
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
