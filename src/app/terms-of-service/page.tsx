import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | BCDC - BUFT Career Development Club",
  description: "Terms of Service for BUFT Career Development Club (BCDC) - Read the terms and conditions governing your use of our services.",
};

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Please read these terms carefully before using our services or becoming a member.
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to BUFT Career Development Club (BCDC). By accessing our website, participating in our events, or becoming a member, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.
              </p>
            </div>

            {/* Membership */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Membership</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">2.1 Eligibility</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Membership in BCDC is open to all currently enrolled students of BGMEA University of Fashion & Technology (BUFT). Membership applications are subject to approval by the Executive Board.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">2.2 Membership Period</h3>
                  <p className="text-gray-600 leading-relaxed">
                    General membership recruitment typically occurs once a year during the spring semester. Membership remains valid as long as the member is enrolled at BUFT and adheres to the club&apos;s code of conduct.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">2.3 Member Responsibilities</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Members are expected to actively participate in club activities, maintain professional conduct, and uphold the values of BCDC.
                  </p>
                </div>
              </div>
            </div>

            {/* Code of Conduct */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Code of Conduct</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                All members and participants must:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Treat all members, guests, and speakers with respect and professionalism</li>
                <li>Refrain from any form of harassment, discrimination, or bullying</li>
                <li>Maintain academic integrity and ethical standards</li>
                <li>Represent BCDC positively in all interactions</li>
                <li>Follow university rules and regulations during club activities</li>
                <li>Protect confidential information shared during events</li>
              </ul>
            </div>

            {/* Events and Activities */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Events and Activities</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">4.1 Participation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Participation in BCDC events may require registration. Some events may have limited capacity, and registration may be on a first-come, first-served basis.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">4.2 Photography and Recording</h3>
                  <p className="text-gray-600 leading-relaxed">
                    By attending BCDC events, you consent to being photographed or recorded. These materials may be used for promotional purposes on our website and social media platforms.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">4.3 Cancellation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    BCDC reserves the right to modify or cancel events due to unforeseen circumstances. Registered participants will be notified of any changes.
                  </p>
                </div>
              </div>
            </div>

            {/* Website Use */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Website Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">5.1 Acceptable Use</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You agree to use our website only for lawful purposes and in a way that does not infringe on the rights of others or restrict their use of the website.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">5.2 Intellectual Property</h3>
                  <p className="text-gray-600 leading-relaxed">
                    All content on this website, including text, graphics, logos, and images, is the property of BCDC or its content suppliers and is protected by copyright laws.
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimer</h2>
              <p className="text-gray-600 leading-relaxed">
                BCDC provides information and services on an &quot;as is&quot; basis. While we strive to provide accurate and up-to-date information, we make no warranties or representations about the completeness, accuracy, or reliability of any content. Career advice and resources are provided for informational purposes only and should not be considered professional advice.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                BCDC, its officers, members, or affiliates shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our services, participation in events, or reliance on information provided.
              </p>
            </div>

            {/* Termination */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                BCDC reserves the right to terminate or suspend membership or access to services for any member who violates these Terms of Service or engages in conduct detrimental to the club&apos;s reputation or mission.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Your continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions.
              </p>
            </div>

            {/* Contact Us */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
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
