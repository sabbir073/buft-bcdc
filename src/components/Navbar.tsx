"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const leftLinks = [
    { name: "Career Resources", href: "/career-resources" },
    { name: "Activities", href: "/activities" },
    { name: "Publications", href: "/publications" },
  ];

  const rightLinks = [
    { name: "Executive Board", href: "/executive-board" },
    { name: "Faculty Advisor", href: "/faculty-advisor" },
    { name: "Membership", href: "/membership" },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 backdrop-blur-md shadow-lg py-1"
            : "bg-gradient-to-r from-slate-50/95 via-blue-50/95 to-slate-50/95 backdrop-blur-sm py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Left Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-end pr-8">
              {leftLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-5 py-2.5 text-base font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 group"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-3/4 transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Mobile menu button - Left side */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-[#1e3a8a] hover:bg-[#1e3a8a]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-[#1e3a8a] rounded-full transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-[#1e3a8a] rounded-full transition-all duration-300 ${
                    isOpen ? "opacity-0 scale-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-[#1e3a8a] rounded-full transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>

            {/* Center Logo */}
            <Link
              href="/"
              className="flex items-center justify-center group"
            >
              <div className="relative">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 scale-150" />
                <div
                  className={`relative transition-all duration-300 ${
                    scrolled ? "w-20 h-20" : "w-28 h-28"
                  }`}
                >
                  <Image
                    src="/logo.png"
                    alt="BCDC Logo"
                    fill
                    className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                    priority
                  />
                </div>
              </div>
            </Link>

            {/* Right Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-start pl-8">
              {rightLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-5 py-2.5 text-base font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 group"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-3/4 transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Placeholder for mobile to keep logo centered */}
            <div className="lg:hidden w-10" />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#1e3a8a]/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`absolute top-0 left-0 right-0 bg-white shadow-2xl transition-transform duration-500 ease-out ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="BCDC Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-[#1e3a8a]">BCDC</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-[#1e3a8a] hover:bg-[#1e3a8a]/10 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
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
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-1">
              {allLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 px-4 py-3.5 text-base font-medium text-[#1e3a8a] hover:text-[#3b82f6] hover:bg-gradient-to-r hover:from-[#1e3a8a]/5 hover:to-[#3b82f6]/10 rounded-xl transition-all duration-300 group"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Icon indicator */}
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
                  <span>{link.name}</span>
                  {/* Arrow indicator */}
                  <svg
                    className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
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
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-100" />

            {/* Home link */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#3b82f6]/25 transition-all duration-300"
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className={`${scrolled ? "h-20" : "h-28"} transition-all duration-300`} />
    </>
  );
}
