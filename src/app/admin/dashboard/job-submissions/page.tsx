'use client';

import { useEffect, useState } from 'react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface JobSubmission {
  id: number;
  job_post_id: number;
  job_title: string;
  company_name: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  resume_url: string;
  cover_letter: string | null;
  status: string;
  ip_address: string | null;
  created_at: string;
}

export default function JobSubmissionsPage() {
  const [submissions, setSubmissions] = useState<JobSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<JobSubmission | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; submissionId: number | null }>({
    isOpen: false,
    submissionId: null,
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/job-submissions');
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/job-submissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchSubmissions();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('An error occurred');
    }
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm({ isOpen: true, submissionId: id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.submissionId) return;

    try {
      const response = await fetch(`/api/admin/job-submissions/${deleteConfirm.submissionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSubmissions();
        setDeleteConfirm({ isOpen: false, submissionId: null });
      } else {
        alert('Failed to delete submission');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('An error occurred');
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, submissionId: null });
  };

  const viewDetails = (submission: JobSubmission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSubmission(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    reviewed: submissions.filter(s => s.status === 'reviewed').length,
    shortlisted: submissions.filter(s => s.status === 'shortlisted').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
        <p className="text-gray-600 mt-1">Manage job application submissions</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow p-4">
          <p className="text-sm text-blue-600">New</p>
          <p className="text-2xl font-bold text-blue-900">{stats.new}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow p-4">
          <p className="text-sm text-yellow-600">Reviewed</p>
          <p className="text-2xl font-bold text-yellow-900">{stats.reviewed}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow p-4">
          <p className="text-sm text-green-600">Shortlisted</p>
          <p className="text-2xl font-bold text-green-900">{stats.shortlisted}</p>
        </div>
        <div className="bg-red-50 rounded-lg shadow p-4">
          <p className="text-sm text-red-600">Rejected</p>
          <p className="text-2xl font-bold text-red-900">{stats.rejected}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      Loading...
                    </div>
                  </td>
                </tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No job applications found
                  </td>
                </tr>
              ) : (
                submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{submission.applicant_name}</div>
                        <div className="text-sm text-gray-500">{submission.applicant_email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.job_title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.company_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={submission.status}
                        onChange={(e) => handleStatusChange(submission.id, e.target.value)}
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)} border-none outline-none cursor-pointer`}
                      >
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => viewDetails(submission)}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(submission.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showModal && selectedSubmission && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={closeModal}
            ></div>

            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Job Information</h3>
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Position:</span> {selectedSubmission.job_title}
                  </p>
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Company:</span> {selectedSubmission.company_name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Name</label>
                    <p className="mt-1 text-gray-900">{selectedSubmission.applicant_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="mt-1 text-gray-900">{selectedSubmission.applicant_email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Phone</label>
                    <p className="mt-1 text-gray-900">{selectedSubmission.applicant_phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <span className={`inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedSubmission.status)}`}>
                      {selectedSubmission.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Submitted</label>
                    <p className="mt-1 text-gray-900">{new Date(selectedSubmission.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Resume</label>
                    <a
                      href={selectedSubmission.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-blue-600 hover:text-blue-800 underline"
                    >
                      Download Resume
                    </a>
                  </div>
                </div>

                {selectedSubmission.cover_letter && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Cover Letter</label>
                    <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
                      {selectedSubmission.cover_letter}
                    </p>
                  </div>
                )}

                {selectedSubmission.ip_address && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">IP Address</label>
                    <p className="mt-1 text-gray-900">{selectedSubmission.ip_address}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Job Submission"
        message="Are you sure you want to delete this job application? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        type="danger"
      />
    </div>
  );
}
