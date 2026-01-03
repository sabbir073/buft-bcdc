"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MembershipPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    department: "",
    batch: "",
    phone: "",
    whyJoin: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Exclusive Job & Internship Access",
      description: "Get priority access to internship and job opportunities from our industry partner companies before they are publicly posted.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Career Workshops & Seminars",
      description: "Attend exclusive workshops on resume building, interview skills, personal branding, and professional development.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Networking Opportunities",
      description: "Connect with industry professionals, alumni, and peers through our networking events and professional meetups.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Mentorship Program",
      description: "Get paired with experienced mentors from the industry who will guide you in your career journey.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Certificates & Recognition",
      description: "Earn certificates for participation in events and activities to enhance your portfolio and resume.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Resource Library Access",
      description: "Access our exclusive library of career resources, templates, guides, and industry reports.",
    },
  ];

  const stats = [
    { number: "500+", label: "Active Members" },
    { number: "100+", label: "Events Organized" },
    { number: "50+", label: "Partner Companies" },
    { number: "200+", label: "Jobs Placed" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
          <div className="max-w-2xl mx-auto px-4 py-20 text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
              <p className="text-gray-600 mb-8">
                Thank you for your interest in joining BCDC. We have received your application and will review it shortly.
                You will receive a confirmation email at {formData.email}.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
              >
                Back to Home
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 font-semibold text-sm uppercase tracking-wider rounded-full mb-4">
                Join Our Community
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Become a <span className="text-blue-600">BCDC Member</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Join the largest career-focused community at BUFT and unlock exclusive opportunities, resources, and connections to accelerate your career.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#register"
                  className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Register Now
                </a>
                <a
                  href="#benefits"
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg border border-blue-200"
                >
                  View Benefits
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                  <p className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.number}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Why Join Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
                Membership Benefits
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                As a BCDC member, you get access to exclusive resources, opportunities, and a supportive community dedicated to your success.
              </p>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Pricing */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="text-blue-200 font-semibold text-sm uppercase tracking-wider">
              Membership Fee
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
              Completely Free for BUFT Students
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              We believe every student should have access to career development opportunities. That&apos;s why BCDC membership is completely free for all BUFT students.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 inline-block">
              <div className="text-6xl font-bold text-white mb-2">Free</div>
              <p className="text-blue-200">For all BUFT students</p>
            </div>
          </div>
        </section>

        {/* Registration Form Section */}
        <section id="register" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
                Register for Membership
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fill out the form below to apply for BCDC membership. We&apos;ll review your application and get back to you soon.
              </p>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4" />
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student ID *
                    </label>
                    <input
                      type="text"
                      name="studentId"
                      required
                      value={formData.studentId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      placeholder="Your student ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <select
                      name="department"
                      required
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
                    >
                      <option value="">Select your department</option>
                      <option value="textile">Textile Engineering</option>
                      <option value="apparel">Apparel Manufacturing & Technology</option>
                      <option value="fashion">Fashion Design & Technology</option>
                      <option value="business">Business Administration</option>
                      <option value="knit">Knit Manufacturing & Technology</option>
                      <option value="wet">Wet Processing Technology</option>
                      <option value="yarn">Yarn Manufacturing Technology</option>
                      <option value="fabric">Fabric Manufacturing Technology</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Batch *
                    </label>
                    <select
                      name="batch"
                      required
                      value={formData.batch}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
                    >
                      <option value="">Select your batch</option>
                      <option value="2024">Batch 2024</option>
                      <option value="2023">Batch 2023</option>
                      <option value="2022">Batch 2022</option>
                      <option value="2021">Batch 2021</option>
                      <option value="2020">Batch 2020</option>
                      <option value="2019">Batch 2019</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to join BCDC? (Optional)
                  </label>
                  <textarea
                    name="whyJoin"
                    value={formData.whyJoin}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                    placeholder="Tell us about your career goals and why you want to join BCDC..."
                  />
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                    />
                    <p className="text-sm text-gray-600">
                      I agree to the <Link href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>. I understand that my information will be used to process my membership application.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
                Frequently Asked Questions
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "Who can join BCDC?",
                  answer: "Any current student of BGMEA University of Fashion & Technology (BUFT) can join BCDC. We welcome students from all departments and batches."
                },
                {
                  question: "Is there a membership fee?",
                  answer: "No, BCDC membership is completely free for all BUFT students. We believe career development opportunities should be accessible to everyone."
                },
                {
                  question: "How long does the application process take?",
                  answer: "We typically review applications within 3-5 business days. You will receive an email notification once your application is approved."
                },
                {
                  question: "What are the responsibilities of a member?",
                  answer: "Members are encouraged to actively participate in events, workshops, and activities. Active participation helps you get the most out of your membership."
                },
                {
                  question: "Can I become a volunteer or executive member?",
                  answer: "Yes! After becoming a general member, you can apply for volunteer or executive positions when openings are announced. These positions offer additional leadership opportunities."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
