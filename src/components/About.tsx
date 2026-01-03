"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function About() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles: Particle[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);

    // Generate sparkles
    const newSparkles: Sparkle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }));
    setSparkles(newSparkles);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Strong Community",
      description: "The largest and most dedicated career-focused club at BUFT with a growing network of students and professionals.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Industry Connections",
      description: "Direct partnerships with Textile Industry & Corporate sector for exclusive internship and job opportunities.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Career Guidance",
      description: "Comprehensive guidelines and pathways to help students achieve their career goals effectively.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            About BCDC
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-2">
            {/* Left - Animated Image Section */}
            <div className="relative h-[400px] lg:h-auto lg:min-h-[600px] overflow-hidden">
              {/* Base Image */}
              <Image
                src="/about/1.jpg"
                alt="About BCDC"
                fill
                className="object-cover"
                priority
              />

              {/* Animated Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-blue-500/30 to-blue-800/50 animate-gradient-shift" />

              {/* Moving Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-blue-600/30" />

              {/* Wave Animation */}
              <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
                <div className="wave-animation absolute bottom-0 left-0 w-[200%] h-24 opacity-30">
                  <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-blue-400">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,googletag172.46-45.71,248.8-84.81V0Z"></path>
                  </svg>
                </div>
              </div>

              {/* Floating Particles */}
              {particles.map((particle) => (
                <div
                  key={particle.id}
                  className="absolute rounded-full bg-white/60 animate-float"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    animationDuration: `${particle.duration}s`,
                    animationDelay: `${particle.delay}s`,
                  }}
                />
              ))}

              {/* Sparkles */}
              {sparkles.map((sparkle) => (
                <div
                  key={sparkle.id}
                  className="absolute animate-sparkle"
                  style={{
                    left: `${sparkle.x}%`,
                    top: `${sparkle.y}%`,
                    animationDuration: `${sparkle.duration}s`,
                    animationDelay: `${sparkle.delay}s`,
                  }}
                >
                  <svg
                    width={sparkle.size * 4}
                    height={sparkle.size * 4}
                    viewBox="0 0 24 24"
                    fill="white"
                    className="opacity-80"
                  >
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                  </svg>
                </div>
              ))}

              {/* Pulsing Circles */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-2 border-white/30 animate-pulse-ring" />
              <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full border-2 border-blue-300/40 animate-pulse-ring-delayed" />
              <div className="absolute bottom-1/3 left-1/3 w-20 h-20 rounded-full border-2 border-white/20 animate-pulse-ring" style={{ animationDelay: '1s' }} />

              {/* Floating Dots Pattern */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-3 h-3 bg-blue-300/60 rounded-full animate-bounce-slow" />
                <div className="absolute top-20 right-20 w-2 h-2 bg-white/70 rounded-full animate-bounce-slow" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-20 left-20 w-4 h-4 bg-blue-200/50 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-10 w-2 h-2 bg-white/60 rounded-full animate-bounce-slow" style={{ animationDelay: '1.5s' }} />
                <div className="absolute bottom-1/4 right-10 w-3 h-3 bg-blue-300/50 rounded-full animate-bounce-slow" style={{ animationDelay: '0.8s' }} />
              </div>

              {/* Central Badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/20">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl animate-pulse-soft">
                    <span className="text-blue-600 font-bold text-2xl">BCDC</span>
                  </div>
                  <p className="text-white font-semibold text-lg drop-shadow-lg">
                    Founded July 15, 2018
                  </p>
                  <p className="text-blue-100 text-sm mt-1 drop-shadow">
                    BGMEA University of Fashion & Technology
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Building Careers, Creating Leaders
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                BUFT Career Development Club (BCDC) is a dedicated and the strongest
                career-concern community that was founded on <span className="font-semibold text-blue-600">July 15, 2018</span>, within the
                dynamic environment of BGMEA University of Fashion & Technology.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                As one of the largest clubs at BUFT, we work dedicatedly with the
                Textile Industry & Corporate sector for the welfare of BUFT&apos;s students,
                providing internship and job placement opportunities.
              </p>

              {/* Key Points */}
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors border border-blue-100/50"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* View More Button */}
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 w-fit"
              >
                View More
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-25px) translateX(-10px);
            opacity: 0.7;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.8;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes pulse-soft {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 20px 10px rgba(59, 130, 246, 0.2);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        .animate-pulse-ring {
          animation: pulse-ring 3s ease-in-out infinite;
        }

        .animate-pulse-ring-delayed {
          animation: pulse-ring 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 4s ease-in-out infinite;
        }

        .wave-animation {
          animation: wave 8s linear infinite;
        }

        .animate-pulse-soft {
          animation: pulse-soft 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
