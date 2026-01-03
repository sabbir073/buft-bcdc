"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Advisor {
  id: number;
  name: string;
  designation: string;
  department: string;
  email: string;
  phone?: string;
  image?: string;
  bio: string;
  specializations: string[];
  role: "Chief Advisor" | "Advisor" | "Associate Advisor";
  socialLinks?: {
    linkedin?: string;
    researchGate?: string;
    googleScholar?: string;
  };
}

export default function FacultyAdvisorPage() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);

  const advisors: Advisor[] = [
    {
      id: 1,
      name: "Dr. Mohammad Rahman",
      designation: "Professor & Dean",
      department: "Faculty of Textile Engineering",
      email: "mohammad.rahman@buft.edu.bd",
      phone: "+880 1XXX-XXXXXX",
      bio: "Dr. Mohammad Rahman has over 20 years of experience in textile engineering education and research. He has been instrumental in guiding students towards successful careers in the textile industry.",
      specializations: ["Textile Manufacturing", "Quality Control", "Industrial Management"],
      role: "Chief Advisor",
      socialLinks: {
        linkedin: "https://linkedin.com/in/",
        researchGate: "https://researchgate.net/",
        googleScholar: "https://scholar.google.com/",
      },
    },
    {
      id: 2,
      name: "Dr. Fatima Ahmed",
      designation: "Associate Professor",
      department: "Department of Business Administration",
      email: "fatima.ahmed@buft.edu.bd",
      bio: "Dr. Fatima Ahmed specializes in career development and entrepreneurship. She has helped numerous students launch successful careers and startups in the fashion and textile industry.",
      specializations: ["Career Development", "Entrepreneurship", "Marketing"],
      role: "Advisor",
      socialLinks: {
        linkedin: "https://linkedin.com/in/",
      },
    },
    {
      id: 3,
      name: "Mr. Kamal Hossain",
      designation: "Senior Lecturer",
      department: "Department of Apparel Manufacturing",
      email: "kamal.hossain@buft.edu.bd",
      bio: "Mr. Kamal Hossain brings extensive industry experience to his role as faculty advisor. He has strong connections with leading apparel manufacturers and regularly facilitates industry visits and internship placements.",
      specializations: ["Apparel Production", "Supply Chain Management", "Industry Relations"],
      role: "Advisor",
      socialLinks: {
        linkedin: "https://linkedin.com/in/",
      },
    },
    {
      id: 4,
      name: "Ms. Nadia Islam",
      designation: "Lecturer",
      department: "Department of Fashion Design",
      email: "nadia.islam@buft.edu.bd",
      bio: "Ms. Nadia Islam is passionate about nurturing creative talent and helping students build portfolios that stand out. She has experience working with international fashion brands and brings a global perspective to career guidance.",
      specializations: ["Fashion Design", "Portfolio Development", "Creative Direction"],
      role: "Associate Advisor",
      socialLinks: {
        linkedin: "https://linkedin.com/in/",
      },
    },
    {
      id: 5,
      name: "Dr. Abdul Karim",
      designation: "Assistant Professor",
      department: "Department of Textile Engineering",
      email: "abdul.karim@buft.edu.bd",
      bio: "Dr. Abdul Karim focuses on bridging the gap between academic knowledge and industry requirements. He regularly conducts workshops on technical skills and professional development.",
      specializations: ["Technical Skills", "Research Methodology", "Professional Development"],
      role: "Associate Advisor",
      socialLinks: {
        linkedin: "https://linkedin.com/in/",
        researchGate: "https://researchgate.net/",
      },
    },
    {
      id: 6,
      name: "Ms. Sharmin Akter",
      designation: "Lecturer",
      department: "Department of Business Administration",
      email: "sharmin.akter@buft.edu.bd",
      bio: "Ms. Sharmin Akter specializes in soft skills development and interview preparation. She has helped countless students improve their communication skills and succeed in job interviews.",
      specializations: ["Soft Skills", "Communication", "Interview Preparation"],
      role: "Associate Advisor",
      socialLinks: {
        linkedin: "https://linkedin.com/in/",
      },
    },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Chief Advisor":
        return "bg-yellow-100 text-yellow-800";
      case "Advisor":
        return "bg-blue-100 text-blue-800";
      case "Associate Advisor":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const chiefAdvisor = advisors.find(a => a.role === "Chief Advisor");
  const otherAdvisors = advisors.filter(a => a.role !== "Chief Advisor");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 font-semibold text-sm uppercase tracking-wider rounded-full mb-4">
                Our Mentors
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Faculty <span className="text-blue-600">Advisors</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet our dedicated faculty advisors who guide BCDC and mentor students in their career development journey.
              </p>
            </div>
          </div>
        </section>

        {/* Chief Advisor Section */}
        {chiefAdvisor && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                  Leadership
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                  Chief Advisor
                </h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4" />
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
                </div>

                <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-1 flex justify-center">
                    <div className="w-48 h-48 md:w-56 md:h-56 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20">
                      <span className="text-5xl md:text-6xl font-bold text-white/80">
                        {chiefAdvisor.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-2 text-center md:text-left">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(chiefAdvisor.role)} mb-4`}>
                      {chiefAdvisor.role}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{chiefAdvisor.name}</h3>
                    <p className="text-blue-200 text-lg mb-2">{chiefAdvisor.designation}</p>
                    <p className="text-blue-100 mb-4">{chiefAdvisor.department}</p>
                    <p className="text-white/80 leading-relaxed mb-6">{chiefAdvisor.bio}</p>

                    <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                      {chiefAdvisor.specializations.map((spec, i) => (
                        <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <a
                        href={`mailto:${chiefAdvisor.email}`}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </a>
                      {chiefAdvisor.socialLinks?.linkedin && (
                        <a
                          href={chiefAdvisor.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Other Advisors Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Our Team
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                Faculty Advisor Panel
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                Our panel of dedicated faculty members work together to provide comprehensive career guidance to BCDC members.
              </p>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherAdvisors.map((advisor) => (
                <div
                  key={advisor.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
                  onClick={() => setSelectedAdvisor(advisor)}
                >
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">
                          {advisor.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(advisor.role)}`}>
                        {advisor.role}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {advisor.name}
                    </h3>
                    <p className="text-blue-600 text-sm mb-1">{advisor.designation}</p>
                    <p className="text-gray-500 text-sm mb-4">{advisor.department}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {advisor.specializations.slice(0, 2).map((spec, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                          {spec}
                        </span>
                      ))}
                      {advisor.specializations.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                          +{advisor.specializations.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <a
                        href={`mailto:${advisor.email}`}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                      <span className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Profile
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advisor Modal */}
        {selectedAdvisor && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAdvisor(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-700 relative">
                <button
                  onClick={() => setSelectedAdvisor(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="-mt-16 px-8 pb-8">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 border-4 border-white">
                  <span className="text-4xl font-bold text-blue-600">
                    {selectedAdvisor.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(selectedAdvisor.role)} mb-2`}>
                  {selectedAdvisor.role}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{selectedAdvisor.name}</h3>
                <p className="text-blue-600 mb-1">{selectedAdvisor.designation}</p>
                <p className="text-gray-500 mb-6">{selectedAdvisor.department}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                  <p className="text-gray-600 leading-relaxed">{selectedAdvisor.bio}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAdvisor.specializations.map((spec, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={`mailto:${selectedAdvisor.email}`}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send Email
                    </a>
                    {selectedAdvisor.socialLinks?.linkedin && (
                      <a
                        href={selectedAdvisor.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </a>
                    )}
                    {selectedAdvisor.socialLinks?.researchGate && (
                      <a
                        href={selectedAdvisor.socialLinks.researchGate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        ResearchGate
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Ready to Get Career Guidance?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join BCDC to connect with our faculty advisors and get personalized career guidance for your professional journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/membership"
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg"
              >
                Join BCDC
              </Link>
              <Link
                href="/#contact"
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg border border-blue-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
