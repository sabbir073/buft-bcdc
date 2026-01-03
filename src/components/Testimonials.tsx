"use client";

import { useState, useEffect, useCallback } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  image?: string;
  batch?: string;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rahul Ahmed",
      role: "Software Engineer",
      company: "Apex Textile Ltd.",
      text: "BCDC helped me land my dream internship. The career workshops and networking events were invaluable in preparing me for the industry. The mentorship I received gave me the confidence to excel in interviews.",
      rating: 5,
      batch: "Batch 2020",
    },
    {
      id: 2,
      name: "Fatima Khan",
      role: "Design Lead",
      company: "Fashion House BD",
      text: "The mentorship program at BCDC connected me with industry professionals who guided my career path. The exposure to real-world challenges through their events was transformative for my professional growth.",
      rating: 5,
      batch: "Batch 2019",
    },
    {
      id: 3,
      name: "Mohammad Hasan",
      role: "Production Manager",
      company: "Textile Corp International",
      text: "From resume building to interview prep, BCDC provided comprehensive support. Their placement drive helped me secure my first job within weeks of graduation. Forever grateful to this amazing community!",
      rating: 5,
      batch: "Batch 2021",
    },
    {
      id: 4,
      name: "Nadia Islam",
      role: "Quality Analyst",
      company: "Garments Plus Ltd.",
      text: "The career resources and guidance from BCDC were instrumental in my professional development. The skills workshops helped me stand out from other candidates and land my dream role.",
      rating: 5,
      batch: "Batch 2020",
    },
    {
      id: 5,
      name: "Karim Uddin",
      role: "Merchandiser",
      company: "Export Solutions BD",
      text: "BCDC's industry connections opened doors I never knew existed. The seminars with industry experts were eye-opening and helped me understand the real expectations of the textile industry.",
      rating: 5,
      batch: "Batch 2018",
    },
    {
      id: 6,
      name: "Sadia Rahman",
      role: "HR Executive",
      company: "Corporate BD Ltd.",
      text: "Being part of BCDC gave me the confidence and skills to excel in interviews. Their support system is truly exceptional. The mock interview sessions were particularly helpful in my preparation.",
      rating: 5,
      batch: "Batch 2019",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused, nextSlide]);

  // Get visible testimonials for desktop (3 cards)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-200 font-semibold text-sm uppercase tracking-wider">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
            What Our Members Say
          </h2>
          <p className="text-blue-100/80 max-w-2xl mx-auto">
            Hear from our successful members who have transformed their careers with BCDC&apos;s guidance and support.
          </p>
          <div className="w-20 h-1 bg-white/50 mx-auto rounded-full mt-4" />
        </div>

        {/* Testimonials Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Desktop View - 3 Cards */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className={`bg-white rounded-2xl p-6 shadow-xl transform transition-all duration-500 hover:scale-105 ${
                  index === 1 ? 'lg:scale-105 lg:shadow-2xl' : ''
                }`}
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <svg className="w-10 h-10 text-blue-100" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
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
                </div>

                {/* Text */}
                <p className="text-gray-600 leading-relaxed mb-6 min-h-[120px]">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-xs text-blue-600">{testimonial.company}</p>
                  </div>
                </div>

                {/* Batch Badge */}
                {testimonial.batch && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                      {testimonial.batch}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile/Tablet View - Single Card */}
          <div className="lg:hidden">
            <div className="bg-white rounded-2xl p-6 shadow-xl mx-auto max-w-lg">
              {/* Quote Icon */}
              <div className="mb-4">
                <svg className="w-10 h-10 text-blue-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 leading-relaxed mb-6">
                &ldquo;{testimonials[currentIndex].text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {testimonials[currentIndex].name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
                  <p className="text-xs text-blue-600">{testimonials[currentIndex].company}</p>
                </div>
              </div>

              {/* Batch Badge */}
              {testimonials[currentIndex].batch && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                    {testimonials[currentIndex].batch}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play Toggle */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/80 hover:bg-white/20 transition-colors text-sm"
          >
            {isAutoPlaying ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </>
            )}
          </button>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-white/80 mb-4">Ready to start your success story?</p>
          <a
            href="/membership"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg"
          >
            Join BCDC Today
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
