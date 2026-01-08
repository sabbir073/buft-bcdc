"use client";

import { useState, useRef } from "react";

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: number;
  jobTitle: string;
  companyName: string;
}

export default function JobApplicationModal({
  isOpen,
  onClose,
  jobId,
  jobTitle,
  companyName,
}: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a PDF or Word document (.pdf, .doc, .docx)");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }
      setResumeFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validate required fields
    if (
      !formData.applicantName ||
      !formData.applicantEmail ||
      !formData.applicantPhone ||
      !resumeFile
    ) {
      setError("Please fill in all required fields and upload your resume");
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.applicantEmail)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append("jobPostId", jobId.toString());
      formPayload.append("applicantName", formData.applicantName);
      formPayload.append("applicantEmail", formData.applicantEmail);
      formPayload.append("applicantPhone", formData.applicantPhone);
      formPayload.append("coverLetter", formData.coverLetter);
      formPayload.append("resume", resumeFile);

      const response = await fetch("/api/public/job-applications", {
        method: "POST",
        body: formPayload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setSuccess(true);
      // Reset form
      setFormData({
        applicantName: "",
        applicantEmail: "",
        applicantPhone: "",
        coverLetter: "",
      });
      setResumeFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    setFormData({
      applicantName: "",
      applicantEmail: "",
      applicantPhone: "",
      coverLetter: "",
    });
    setResumeFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Apply for Job</h2>
            <p className="text-sm text-gray-500 mt-1">{jobTitle} at {companyName}</p>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Application Submitted!
              </h3>
              <p className="text-gray-600 mb-6">
                Your application has been successfully submitted. We will review your
                application and get back to you soon.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="applicantEmail"
                  value={formData.applicantEmail}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="applicantPhone"
                  value={formData.applicantPhone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Resume/CV <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg
                      className="w-12 h-12 text-gray-400 mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {resumeFile ? (
                      <div className="text-sm">
                        <p className="font-medium text-blue-600">
                          {resumeFile.name}
                        </p>
                        <p className="text-gray-500 mt-1">
                          Click to change file
                        </p>
                      </div>
                    ) : (
                      <div className="text-sm">
                        <p className="font-medium text-gray-700">
                          Click to upload your resume
                        </p>
                        <p className="text-gray-500 mt-1">
                          PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Write a brief cover letter explaining why you're a great fit for this position..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      Submit Application
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
