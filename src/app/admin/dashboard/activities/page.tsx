'use client';

import { useEffect, useState } from 'react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface ActivityImage {
  id: number;
  image_url: string;
  display_order: number;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string | null;
  is_featured: boolean;
  created_at: string;
  images: ActivityImage[];
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [featuredCount, setFeaturedCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    is_featured: false,
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; activityId: number | null }>({
    isOpen: false,
    activityId: null,
  });

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    fetchActivities();
  }, [currentPage]);

  const fetchActivities = async () => {
    if (currentPage === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await fetch('/api/admin/activities');
      if (response.ok) {
        const data = await response.json();

        // Set total count and featured count
        setTotalCount(data.length);
        setFeaturedCount(data.filter((activity: Activity) => activity.is_featured).length);

        // Calculate pagination
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedData = data.slice(startIndex, endIndex);

        if (currentPage === 1) {
          setActivities(paginatedData);
        } else {
          setActivities(prev => [...prev, ...paginatedData]);
        }

        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
      }
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const openModal = (activity: Activity | null = null) => {
    if (activity) {
      setEditingActivity(activity);
      setFormData({
        title: activity.title,
        description: activity.description,
        date: activity.date.split('T')[0],
        location: activity.location || '',
        is_featured: activity.is_featured,
      });
    } else {
      setEditingActivity(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        is_featured: false,
      });
    }
    setSelectedImages([]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingActivity(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
      is_featured: false,
    });
    setSelectedImages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setUploadProgress(0);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('is_featured', formData.is_featured.toString());

      // Add images
      if (editingActivity) {
        // For edit, use 'newImages' field
        selectedImages.forEach((file) => {
          formDataToSend.append('newImages', file);
        });
      } else {
        // For create, use 'images' field
        selectedImages.forEach((file) => {
          formDataToSend.append('images', file);
        });
      }

      const url = editingActivity
        ? `/api/admin/activities/${editingActivity.id}`
        : '/api/admin/activities';

      const method = editingActivity ? 'PUT' : 'POST';

      // Use XMLHttpRequest for progress tracking
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            setUploadProgress(percentComplete);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(xhr.responseText || 'Failed to save activity'));
          }
        });

        xhr.addEventListener('error', () => reject(new Error('Network error')));

        xhr.open(method, url);
        xhr.send(formDataToSend);
      });

      fetchActivities();
      closeModal();
    } catch (error) {
      console.error('Failed to save activity:', error);
      alert(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm({ isOpen: true, activityId: id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.activityId) return;

    try {
      const response = await fetch(`/api/admin/activities/${deleteConfirm.activityId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchActivities();
        setDeleteConfirm({ isOpen: false, activityId: null });
      } else {
        alert('Failed to delete activity');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('An error occurred');
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, activityId: null });
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/activities/images/${imageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchActivities();
      } else {
        alert('Failed to delete image');
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
      alert('An error occurred');
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
          <p className="text-gray-600 mt-1">
            Manage club activities and events
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Activity
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Activities</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{totalCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Featured Activities</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{featuredCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              Loading...
            </div>
          </div>
        ) : activities.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No activities found
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Image Gallery */}
              {activity.images.length > 0 ? (
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={activity.images[0].image_url}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                  {activity.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                      +{activity.images.length - 1} more
                    </div>
                  )}
                  {activity.is_featured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No images</span>
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{activity.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{activity.description}</p>

                <div className="space-y-1 mb-4">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Date:</span> {new Date(activity.date).toLocaleDateString()}
                  </p>
                  {activity.location && (
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Location:</span> {activity.location}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Images:</span> {activity.images.length}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(activity)}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 font-medium text-sm rounded hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="flex-1 px-3 py-2 bg-red-50 text-red-600 font-medium text-sm rounded hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {!loading && currentPage < totalPages && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            {loadingMore ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load More Activities
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
          <p className="mt-3 text-sm text-gray-500">
            Showing {activities.length} activities • Page {currentPage} of {totalPages}
          </p>
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

            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 z-10 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingActivity ? 'Edit Activity' : 'Add New Activity'}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_featured" className="ml-2 text-sm font-medium text-gray-700">
                    Feature on homepage (max 3)
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {editingActivity ? 'Add New Images' : 'Images'} (JPEG, PNG, WebP)
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    multiple
                    onChange={handleImageSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {selectedImages.length > 0 && (
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedImages.length} file(s) selected
                    </p>
                  )}
                </div>

                {/* Existing Images (Edit Mode) */}
                {editingActivity && editingActivity.images.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Images</label>
                    <div className="grid grid-cols-3 gap-2">
                      {editingActivity.images.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.image_url}
                            alt="Activity"
                            className="w-full h-24 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(image.id)}
                            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Progress Bar */}
                {submitting && uploadProgress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Uploading...</span>
                      <span className="text-sm font-medium text-blue-600">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

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
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {uploadProgress < 100 ? `Uploading ${uploadProgress}%` : 'Processing...'}
                      </span>
                    ) : (
                      editingActivity ? 'Update Activity' : 'Create Activity'
                    )}
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
        title="Delete Activity"
        message="Are you sure you want to delete this activity? All images will also be permanently deleted. This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        type="danger"
      />
    </div>
  );
}
