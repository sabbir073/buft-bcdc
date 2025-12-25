"use client";

import { useState } from "react";

export default function Testimonials() {
  const [showMore, setShowMore] = useState(false);

  const testimonials = [
    {
      name: "Rahul Ahmed",
      role: "Software Engineer at Apex Textile",
      text: "BCDC helped me land my dream internship. The career workshops and networking events were invaluable in preparing me for the industry.",
      rating: 5,
    },
    {
      name: "Fatima Khan",
      role: "Design Lead at Fashion House BD",
      text: "The mentorship program at BCDC connected me with industry professionals who guided my career path. I'm grateful for this community!",
      rating: 5,
    },
    {
      name: "Mohammad Hasan",
      role: "Production Manager at Textile Corp",
      text: "From resume building to interview prep, BCDC provided comprehensive support. Their placement drive helped me secure my first job.",
      rating: 5,
    },
    {
      name: "Nadia Islam",
      role: "Quality Analyst at Garments Plus",
      text: "The career resources and guidance from BCDC were instrumental in my professional development. Highly recommend joining!",
      rating: 5,
    },
    {
      name: "Karim Uddin",
      role: "Merchandiser at Export Solutions",
      text: "BCDC's industry connections opened doors I never knew existed. The seminars with industry experts were eye-opening.",
      rating: 5,
    },
    {
      name: "Sadia Rahman",
      role: "HR Executive at Corporate BD",
      text: "Being part of BCDC gave me the confidence and skills to excel in interviews. Their support system is truly exceptional.",
      rating: 5,
    },
  ];

  const displayedTestimonials = showMore ? testimonials : testimonials.slice(0, 4);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Section */}
          <div className="lg:col-span-1">
            <span className="text-blue-200 font-semibold text-sm uppercase tracking-wider">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
              What Members Are Saying About BCDC
            </h2>
            <p className="text-white/80 mb-8">
              Our members trust us to provide meaningful career guidance and
              opportunities. See what others are saying about their experience
              with BCDC.
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg flex items-center gap-2">
              Join BCDC
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          {/* Right Section - Testimonials Grid */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-6">
              {displayedTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-blue-600 ml-2 text-sm">Verified</span>
                  </div>

                  {/* Text */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {testimonial.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {testimonials.length > 4 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="px-6 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors border border-white/20"
                >
                  {showMore ? "Show Less" : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
