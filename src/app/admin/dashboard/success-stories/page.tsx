'use client';

import { useEffect, useState } from 'react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface SuccessStory {
  id: number;
  member_name: string;
  designation: string | null;
  company: string | null;
  testimonial: string;
  image_url: string | null;
  created_at: string;
}

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
  const [formData, setFormData] = useState({
    member_name: '',
    designation: '',
    company: '',
    testimonial: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; storyId: number | null }>({
    isOpen: false,
    storyId: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    fetchStories(currentPage);
  }, [currentPage]);

  const fetchStories = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/success-stories?page=${page}&limit=${ITEMS_PER_PAGE}`);
      if (response.ok) {
        const data = await response.json();
        setStories(data.stories);
        setTotalPages(data.pagination.totalPages);
        setTotal(data.pagination.total);
      }
    } catch (error) {
      console.error('Failed to fetch success stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (story: SuccessStory | null = null) => {
    if (story) {
      setEditingStory(story);
      setFormData({
        member_name: story.member_name,
        designation: story.designation || '',
        company: story.company || '',
        testimonial: story.testimonial,
      });
    } else {
      setEditingStory(null);
      setFormData({
        member_name: '',
        designation: '',
        company: '',
        testimonial: '',
      });
    }
    setSelectedImage(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStory(null);
    setFormData({
      member_name: '',
      designation: '',
      company: '',
      testimonial: '',
    });
    setSelectedImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('member_name', formData.member_name);
      formDataToSend.append('designation', formData.designation);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('testimonial', formData.testimonial);

      // Add image
      if (selectedImage) {
        if (editingStory) {
          formDataToSend.append('newImage', selectedImage);
        } else {
          formDataToSend.append('image', selectedImage);
        }
      }

      const url = editingStory
        ? `/api/admin/success-stories/${editingStory.id}`
        : '/api/admin/success-stories';

      const method = editingStory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (response.ok) {
        fetchStories(currentPage);
        closeModal();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save success story');
      }
    } catch (error) {
      console.error('Failed to save success story:', error);
      alert('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm({ isOpen: true, storyId: id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.storyId) return;

    try {
      const response = await fetch(`/api/admin/success-stories/${deleteConfirm.storyId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchStories(currentPage);
        setDeleteConfirm({ isOpen: false, storyId: null });
      } else {
        alert('Failed to delete success story');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('An error occurred');
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, storyId: null });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Success Stories</h1>
          <p className="text-gray-600 mt-1">
            Manage member testimonials and success stories
            {total > 0 && <span className="ml-2 text-sm text-gray-500">({total} total)</span>}
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Story
        </button>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              Loading...
            </div>
          </div>
        ) : stories.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No success stories found
          </div>
        ) : (
          stories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Image */}
              <div className="p-6 flex flex-col items-center">
                {story.image_url ? (
                  <img
                    src={story.image_url}
                    alt={story.member_name}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <span className="text-gray-400 text-sm">No image</span>
                  </div>
                )}

                <h3 className="font-bold text-lg text-gray-900 text-center">{story.member_name}</h3>
                {story.designation && (
                  <p className="text-sm text-blue-600 text-center">{story.designation}</p>
                )}
                {story.company && (
                  <p className="text-sm text-gray-500 text-center">{story.company}</p>
                )}

                <p className="mt-3 text-sm text-gray-600 text-center line-clamp-4">
                  &ldquo;{story.testimonial}&rdquo;
                </p>

                <p className="mt-3 text-xs text-gray-400">
                  {new Date(story.created_at).toLocaleDateString()}
                </p>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-200 px-6 py-3 flex gap-2">
                <button
                  onClick={() => openModal(story)}
                  className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 font-medium text-sm rounded hover:bg-blue-100 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(story.id)}
                  className="flex-1 px-3 py-2 bg-red-50 text-red-600 font-medium text-sm rounded hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, total)} of {total} stories
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={closeModal}
            ></div>

            <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingStory ? 'Edit Success Story' : 'Add New Success Story'}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Name</label>
                  <input
                    type="text"
                    value={formData.member_name}
                    onChange={(e) => setFormData({ ...formData, member_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Software Engineer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Google"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial</label>
                  <textarea
                    value={formData.testimonial}
                    onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {editingStory ? 'Change Photo' : 'Photo'} (JPEG, PNG, WebP)
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {selectedImage && (
                    <p className="mt-1 text-sm text-gray-500">Selected: {selectedImage.name}</p>
                  )}
                  {editingStory && editingStory.image_url && !selectedImage && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-1">Current photo:</p>
                      <img
                        src={editingStory.image_url}
                        alt={editingStory.member_name}
                        className="h-20 w-20 rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    disabled={submitting}
                  >
                    {submitting ? 'Saving...' : editingStory ? 'Update Story' : 'Create Story'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Success Story"
        message="Are you sure you want to delete this success story? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        type="danger"
      />
    </div>
  );
}
