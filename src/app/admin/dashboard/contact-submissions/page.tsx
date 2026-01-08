'use client';

import { useEffect, useState } from 'react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  ip_address: string | null;
  status: 'new' | 'read' | 'replied' | 'archived';
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

interface Counts {
  all: number;
  new: number;
  read: number;
  replied: number;
  archived: number;
}

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [counts, setCounts] = useState<Counts>({ all: 0, new: 0, read: 0, replied: 0, archived: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; submissionId: number | null }>({
    isOpen: false,
    submissionId: null,
  });

  useEffect(() => {
    fetchSubmissions();
  }, [filterStatus]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const url = filterStatus === 'all'
        ? '/api/admin/contact-submissions'
        : `/api/admin/contact-submissions?status=${filterStatus}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions);
        setCounts(data.counts);
      }
    } catch (error) {
      console.error('Failed to fetch contact submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/contact-submissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchSubmissions();
        if (selectedSubmission?.id === id) {
          setSelectedSubmission({ ...selectedSubmission, status: status as any });
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const updateNotes = async (id: number, admin_notes: string) => {
    try {
      const response = await fetch(`/api/admin/contact-submissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admin_notes }),
      });

      if (response.ok) {
        fetchSubmissions();
      }
    } catch (error) {
      console.error('Failed to update notes:', error);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm({ isOpen: true, submissionId: id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.submissionId) return;

    try {
      const response = await fetch(`/api/admin/contact-submissions/${deleteConfirm.submissionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSubmissions();
        if (selectedSubmission?.id === deleteConfirm.submissionId) {
          setSelectedSubmission(null);
        }
        setDeleteConfirm({ isOpen: false, submissionId: null });
      } else {
        setError('Failed to delete submission');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      setError('An error occurred');
    }
  };

  const openSubmission = async (submission: ContactSubmission) => {
    setSelectedSubmission(submission);

    // Mark as read if it's new
    if (submission.status === 'new') {
      await updateStatus(submission.id, 'read');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      read: 'bg-yellow-100 text-yellow-800',
      replied: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-gray-600 mt-1">Manage messages from the contact form</p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Status Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All', count: counts.all },
          { key: 'new', label: 'New', count: counts.new },
          { key: 'read', label: 'Read', count: counts.read },
          { key: 'replied', label: 'Replied', count: counts.replied },
          { key: 'archived', label: 'Archived', count: counts.archived },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              filterStatus === tab.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                filterStatus === tab.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  Loading...
                </div>
              </div>
            ) : submissions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No contact submissions found
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    onClick={() => openSubmission(submission)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedSubmission?.id === submission.id ? 'bg-blue-50' : ''
                    } ${submission.status === 'new' ? 'border-l-4 border-l-blue-500' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-medium text-gray-900 truncate ${submission.status === 'new' ? 'font-bold' : ''}`}>
                            {submission.name}
                          </h3>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadge(submission.status)}`}>
                            {submission.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{submission.subject}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(submission.created_at)}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(submission.id);
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submission Detail */}
        <div className="lg:col-span-1">
          {selectedSubmission ? (
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Message Details</h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Contact Info */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">From</h3>
                  <p className="font-medium text-gray-900">{selectedSubmission.name}</p>
                  <a href={`mailto:${selectedSubmission.email}`} className="text-blue-600 hover:underline text-sm">
                    {selectedSubmission.email}
                  </a>
                  {selectedSubmission.phone && (
                    <p className="text-sm text-gray-600 mt-1">{selectedSubmission.phone}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Subject</h3>
                  <p className="text-gray-900">{selectedSubmission.subject}</p>
                </div>

                {/* Message */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Message</h3>
                  <p className="text-gray-700 whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded-lg">
                    {selectedSubmission.message}
                  </p>
                </div>

                {/* Date */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Received</h3>
                  <p className="text-sm text-gray-600">{formatDate(selectedSubmission.created_at)}</p>
                </div>

                {/* Status Update */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {['new', 'read', 'replied', 'archived'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedSubmission.id, status)}
                        className={`px-3 py-1 text-sm rounded-full capitalize transition-colors ${
                          selectedSubmission.status === status
                            ? getStatusBadge(status)
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Admin Notes */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Admin Notes</h3>
                  <textarea
                    defaultValue={selectedSubmission.admin_notes || ''}
                    onBlur={(e) => updateNotes(selectedSubmission.id, e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add notes about this submission..."
                  />
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <a
                    href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-center text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reply via Email
                  </a>
                  <button
                    onClick={() => handleDelete(selectedSubmission.id)}
                    className="px-4 py-2 bg-red-100 text-red-600 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Submission"
        message="Are you sure you want to delete this contact submission? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, submissionId: null })}
        type="danger"
      />
    </div>
  );
}
