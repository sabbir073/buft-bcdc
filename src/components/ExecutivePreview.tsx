"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { board9 } from "@/data/executives";

interface Member {
  id: number;
  name: string;
  position: string;
  image: string;
}

export default function ExecutivePreview() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Get key members: President (1) + Vice-Presidents (4) + General Secretary (1) = 6 members
  const keyMembers = board9.members.slice(0, 6);

  const openModal = (member: Member) => {
    setSelectedMember(member);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="executive-preview" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
            Our Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Executive Board</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dedicated leaders driving BCDC&apos;s mission to empower students with career opportunities and professional growth.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full mt-4" />
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-12">
          {keyMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => openModal(member)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-blue-50 to-gray-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
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

        {/* View Full Team Button */}
        <div className="text-center">
          <Link
            href="/executive-board"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
          >
            View Full Team
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

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
    </section>
  );
}
