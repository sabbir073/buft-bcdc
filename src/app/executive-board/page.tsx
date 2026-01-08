"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Member {
  id: string;
  name: string;
  position: string;
  image: string;
}

interface ExecutiveBoard {
  id: string;
  name: string;
  year: string;
  members: Member[];
}

export default function ExecutiveBoardPage() {
  const [boards, setBoards] = useState<ExecutiveBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBoard, setActiveBoard] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Fetch executive boards from API
  useEffect(() => {
    async function fetchBoards() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/public/executives`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch executives');
        }

        const data = await response.json();
        setBoards(data);

        // Set first board as active
        if (data.length > 0) {
          setActiveBoard(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching executive boards:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBoards();
  }, []);

  const currentBoard = boards.find((b) => b.id === activeBoard);

  const openModal = (member: Member) => {
    setSelectedMember(member);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = "auto";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Navbar />

      {/* Page Header with Breadcrumb */}
      <section className="relative pt-8 pb-16 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link
              href="/"
              className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-blue-600 font-medium">Executive Board</span>
          </nav>

          {/* Page Title */}
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
              Our Leadership
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Executive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Board</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Meet the dedicated leaders who drive BCDC&apos;s mission to empower students with career opportunities and professional growth.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="sticky top-16 z-30 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-6">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="inline-flex gap-1 p-1.5 bg-gray-100 rounded-xl my-4">
                {boards.map((board) => (
                  <button
                    key={board.id}
                    onClick={() => setActiveBoard(board.id)}
                    className={`px-4 sm:px-6 py-2.5 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 ${
                      activeBoard === board.id
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                        : "text-gray-600 hover:text-blue-600 hover:bg-white"
                    }`}
                  >
                    {board.name} ({board.year})
                </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Board Info */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!loading && currentBoard && (
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {currentBoard.name}
                </h2>
                <p className="text-gray-500 mt-1">Year: {currentBoard.year}</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="font-semibold text-blue-700">{currentBoard.members.length} Members</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Members Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {currentBoard?.members.map((member) => (
              <div
                key={member.id}
                onClick={() => openModal(member)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-blue-50 to-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="text-white flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="font-medium">View</span>
                    </div>
                  </div>
                </div>

                {/* Bottom decorative border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Want to Join Our Team?
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Become a part of BCDC and contribute to empowering students with career development opportunities.
          </p>
          <Link
            href="/membership"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
          >
            Apply for Membership
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Modal Popup */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm sm:max-w-md my-auto transform transition-all animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative aspect-[3/4] bg-gradient-to-br from-blue-50 to-gray-100">
              <Image
                src={selectedMember.image}
                alt={selectedMember.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Animation Style */}
          <style jsx>{`
            @keyframes modal-in {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            .animate-modal-in {
              animation: modal-in 0.2s ease-out forwards;
            }
          `}</style>
        </div>
      )}

      <Footer />
    </main>
  );
}
