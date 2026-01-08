'use client';

import { useEffect, useState } from 'react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface Membership {
  id: number;
  name: string;
  email: string;
  student_id: string;
  department: string;
  batch: string;
  phone: string;
  why_join: string;
  ip_address: string | null;
  status: string;
  created_at: string;
}

export default function MembershipsPage() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; membershipId: number | null }>({
    isOpen: false,
    membershipId: null,
  });

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/memberships');
      if (response.ok) {
        const data = await response.json();
        setMemberships(data);
      }
    } catch (error) {
      console.error('Failed to fetch memberships:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/memberships/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchMemberships();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('An error occurred');
    }
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm({ isOpen: true, membershipId: id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.membershipId) return;

    try {
      const response = await fetch(`/api/admin/memberships/${deleteConfirm.membershipId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchMemberships();
        setDeleteConfirm({ isOpen: false, membershipId: null });
      } else {
        alert('Failed to delete membership');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('An error occurred');
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, membershipId: null });
  };

  const viewDetails = (membership: Membership) => {
    setSelectedMembership(membership);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMembership(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: memberships.length,
    new: memberships.filter(m => m.status === 'new').length,
    reviewed: memberships.filter(m => m.status === 'reviewed').length,
    approved: memberships.filter(m => m.status === 'approved').length,
    rejected: memberships.filter(m => m.status === 'rejected').length,
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Membership Applications</h1>
        <p className="text-gray-600 mt-1">Manage BCDC membership submissions</p>
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
          <p className="text-sm text-green-600">Approved</p>
          <p className="text-2xl font-bold text-green-900">{stats.approved}</p>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      Loading...
                    </div>
                  </td>
                </tr>
              ) : memberships.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No membership applications found
                  </td>
                </tr>
              ) : (
                memberships.map((membership) => (
                  <tr key={membership.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{membership.name}</div>
                        <div className="text-sm text-gray-500">{membership.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {membership.student_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {membership.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {membership.batch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={membership.status}
                        onChange={(e) => handleStatusChange(membership.id, e.target.value)}
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(membership.status)} border-none outline-none cursor-pointer`}
                      >
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(membership.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => viewDetails(membership)}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(membership.id)}
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
      {showModal && selectedMembership && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={closeModal}
            ></div>

            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Membership Application Details</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Name</label>
                    <p className="mt-1 text-gray-900">{selectedMembership.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="mt-1 text-gray-900">{selectedMembership.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Student ID</label>
                    <p className="mt-1 text-gray-900">{selectedMembership.student_id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Phone</label>
                    <p className="mt-1 text-gray-900">{selectedMembership.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Department</label>
                    <p className="mt-1 text-gray-900">{selectedMembership.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Batch</label>
                    <p className="mt-1 text-gray-900">{selectedMembership.batch}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <span className={`inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedMembership.status)}`}>
                      {selectedMembership.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Submitted</label>
                    <p className="mt-1 text-gray-900">{new Date(selectedMembership.created_at).toLocaleString()}</p>
                  </div>
                </div>

                {selectedMembership.why_join && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Why Join BCDC</label>
                    <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedMembership.why_join}</p>
                  </div>
                )}

                {selectedMembership.ip_address && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">IP Address</label>
                    <p className="mt-1 text-gray-900">{selectedMembership.ip_address}</p>
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
        title="Delete Membership Application"
        message="Are you sure you want to delete this membership application? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        type="danger"
      />
    </div>
  );
}
