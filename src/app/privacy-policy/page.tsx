import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | BCDC - BUFT Career Development Club",
  description: "Privacy Policy for BUFT Career Development Club (BCDC) - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how BCDC collects, uses, and protects your information.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Last Updated */}
            <p className="text-gray-500 text-sm mb-8">
              Last Updated: January 2025
            </p>

            {/* Introduction */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                BUFT Career Development Club (BCDC) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, participate in our events, or become a member of our club.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                  <p className="text-gray-600 leading-relaxed">
                    When you register for membership or events, we may collect:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>Full name and student ID</li>
                    <li>Email address and phone number</li>
                    <li>Department and batch information</li>
                    <li>Profile photographs (for membership cards)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Usage Information</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We may automatically collect certain information about your device and usage patterns, including browser type, IP address, and pages visited.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>To process membership registrations and manage member accounts</li>
                <li>To communicate about events, workshops, and career opportunities</li>
                <li>To send newsletters and updates about BCDC activities</li>
                <li>To improve our website and services</li>
                <li>To respond to inquiries and provide support</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
              <p className="text-gray-600 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                <li>With BGMEA University of Fashion & Technology for official club activities</li>
                <li>With event sponsors and partners with your consent</li>
                <li>When required by law or to protect our rights</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, although this may affect certain features of the website.
              </p>
            </div>

            {/* Changes to This Policy */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </div>

            {/* Contact Us */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions or concerns about this Privacy Policy, please contact us:
              </p>
              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-gray-700">
                  <strong>BUFT Career Development Club (BCDC)</strong><br />
                  BGMEA University of Fashion & Technology<br />
                  Dhaka, Bangladesh<br /><br />
                  Email: <a href="mailto:buftcareerdevelopmentclub@gmail.com" className="text-blue-600 hover:underline">buftcareerdevelopmentclub@gmail.com</a>
                </p>
              </div>
            </div>

            {/* Back Link */}
            <div className="pt-6 border-t border-gray-200">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}
