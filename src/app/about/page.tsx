"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const milestones = [
    {
      year: "2018",
      title: "Foundation",
      description: "BCDC was founded on July 15, 2018, with a vision to bridge the gap between students and industry.",
    },
    {
      year: "2019",
      title: "First Major Event",
      description: "Organized our first career fair, connecting 200+ students with top industry recruiters.",
    },
    {
      year: "2020",
      title: "Virtual Expansion",
      description: "Adapted to online platforms, reaching more students through webinars and virtual workshops.",
    },
    {
      year: "2021",
      title: "Industry Partnerships",
      description: "Established formal partnerships with leading textile and fashion companies.",
    },
    {
      year: "2022",
      title: "100+ Placements",
      description: "Achieved milestone of helping 100+ students secure internships and jobs.",
    },
    {
      year: "2023",
      title: "Growing Community",
      description: "Expanded to 500+ active members, becoming the largest club at BUFT.",
    },
    {
      year: "2024",
      title: "Magazine Launch",
      description: "Launched BCDC Insider magazine to share career insights and success stories.",
    },
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Integrity",
      description: "We uphold the highest standards of honesty and transparency in all our activities.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Community",
      description: "Building a supportive network where every member can grow and succeed together.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Excellence",
      description: "Striving for excellence in everything we do, from events to career guidance.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: "Innovation",
      description: "Embracing new ideas and approaches to prepare students for the evolving industry.",
    },
  ];

  const stats = [
    { value: "2018", label: "Founded", suffix: "" },
    { value: "500", label: "Members", suffix: "+" },
    { value: "50", label: "Events", suffix: "+" },
    { value: "100", label: "Placements", suffix: "+" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white">About Us</span>
            </div>

            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-blue-200 text-sm font-medium mb-4">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                About BCDC
              </h1>
              <p className="text-blue-100/80 max-w-2xl mx-auto text-lg">
                Empowering students at BGMEA University of Fashion & Technology to build sustainable careers since 2018.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content with Image */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/about/BCDC.png"
                  alt="BCDC - BUFT Career Development Club"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full -z-10" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-50 rounded-full -z-10" />
              <div className="absolute top-1/2 -right-8 w-16 h-16 bg-blue-200/50 rounded-full -z-10" />
            </div>

            {/* Content Section */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Building Careers, Creating Leaders
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <span className="font-semibold text-blue-600">BUFT Career Development Club (BCDC)</span> is a dedicated
                  and the strongest career-concern community that was founded on <span className="font-semibold text-blue-600">July 15, 2018</span>,
                  within the dynamic environment of BGMEA University of Fashion & Technology.
                </p>
                <p>
                  As one of the largest clubs at BUFT, we work dedicatedly with the Textile Industry & Corporate sector
                  for the welfare of BUFT&apos;s students. Our mission is to bridge the gap between academic learning and
                  professional excellence, ensuring every student has the opportunity to build a sustainable career.
                </p>
                <p>
                  We continuously expand our networks and help students through numerous internship and job placement
                  opportunities. Our commitment goes beyond mere suggestions; we aim to provide students with appropriate
                  guidelines and pathways that lead them toward their targeted goals.
                </p>
                <p>
                  Through workshops, seminars, career fairs, and industry collaborations, BCDC has become the go-to
                  platform for students seeking career guidance, professional development, and industry connections
                  in the textile and fashion sector.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="text-white">
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-blue-200 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower students of BGMEA University of Fashion & Technology with the knowledge,
                skills, and connections they need to build successful and sustainable careers in the
                textile, fashion, and corporate sectors. We strive to be the bridge between academic
                excellence and professional achievement.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become the leading career development platform in Bangladesh&apos;s fashion and textile
                education sector, recognized for producing industry-ready professionals who contribute
                meaningfully to the nation&apos;s economic growth and global competitiveness in the
                textile and fashion industry.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                What We Believe In
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Our Core Values</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey Timeline */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Milestones</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 hidden lg:block" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col lg:flex-row gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="lg:w-1/2">
                    <div
                      className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${
                        index % 2 === 0 ? "lg:mr-12" : "lg:ml-12"
                      }`}
                    >
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 font-bold rounded-full text-sm mb-3">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full hidden lg:block" style={{ top: "24px" }} />
                  <div className="lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Our Activities
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">What We Do</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Career Workshops",
                  description: "Interactive sessions on resume writing, interview skills, and professional development.",
                  icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                },
                {
                  title: "Industry Seminars",
                  description: "Expert talks and panel discussions with industry leaders and successful professionals.",
                  icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                },
                {
                  title: "Job Placements",
                  description: "Direct connections with companies for internship and job opportunities in textile and fashion.",
                  icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                },
                {
                  title: "Networking Events",
                  description: "Career fairs and networking sessions connecting students with industry recruiters.",
                  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                },
                {
                  title: "Skill Development",
                  description: "Training programs to enhance technical and soft skills required in the industry.",
                  icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                },
                {
                  title: "Publications",
                  description: "Career guides, magazines, and resources to support students in their professional journey.",
                  icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="group bg-gray-50 rounded-2xl p-6 hover:bg-blue-50 transition-colors border border-gray-100"
                >
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={activity.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                  <p className="text-gray-600">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Career Journey?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join BCDC today and become part of BUFT&apos;s largest and most active career development community.
              Your path to a sustainable career starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/membership"
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg"
              >
                Join BCDC
              </Link>
              <Link
                href="/activities"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                View Activities
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
