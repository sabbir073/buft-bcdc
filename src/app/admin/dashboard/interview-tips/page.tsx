'use client';

import { useEffect, useState } from 'react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface InterviewTip {
  id: number;
  title: string;
  content: string;
  category: string | null;
  video_url: string | null;
  duration: string | null;
  thumbnail_url: string | null;
  views_count: number;
  display_order: number;
  is_active: number;
  created_at: string;
}

export default function InterviewTipsPage() {
  const [tips, setTips] = useState<InterviewTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTip, setEditingTip] = useState<InterviewTip | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    video_url: '',
    duration: '',
    display_order: 0,
    is_active: true,
  });
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; tipId: number | null }>({
    isOpen: false,
    tipId: null,
  });

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/interview-tips');
      if (response.ok) {
        const data = await response.json();
        setTips(data);
      }
    } catch (error) {
      console.error('Failed to fetch interview tips:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (tip: InterviewTip | null = null) => {
    if (tip) {
      setEditingTip(tip);
      setFormData({
        title: tip.title,
        content: tip.content,
        category: tip.category || '',
        video_url: tip.video_url || '',
        duration: tip.duration || '',
        display_order: tip.display_order || 0,
        is_active: tip.is_active === 1,
      });
      setExistingThumbnailUrl(tip.thumbnail_url);
      setThumbnailPreview(tip.thumbnail_url);
    } else {
      setEditingTip(null);
      setFormData({
        title: '',
        content: '',
        category: '',
        video_url: '',
        duration: '',
        display_order: 0,
        is_active: true,
      });
      setExistingThumbnailUrl(null);
      setThumbnailPreview(null);
    }
    setSelectedThumbnail(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTip(null);
    setFormData({
      title: '',
      content: '',
      category: '',
      video_url: '',
      duration: '',
      display_order: 0,
      is_active: true,
    });
    setSelectedThumbnail(null);
    setThumbnailPreview(null);
    setExistingThumbnailUrl(null);
    setUploadProgress(0);
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedThumbnail(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setSelectedThumbnail(null);
    setThumbnailPreview(null);
    setExistingThumbnailUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setUploadProgress(0);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('video_url', formData.video_url);
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('display_order', formData.display_order.toString());
      formDataToSend.append('is_active', formData.is_active.toString());

      if (editingTip) {
        formDataToSend.append('views_count', (editingTip.views_count || 0).toString());
        // Pass existing thumbnail URL if not uploading new one
        if (existingThumbnailUrl && !selectedThumbnail) {
          formDataToSend.append('existing_thumbnail_url', existingThumbnailUrl);
        }
      }

      // Add thumbnail if selected
      if (selectedThumbnail) {
        formDataToSend.append('thumbnail', selectedThumbnail);
      }

      const url = editingTip
        ? `/api/admin/interview-tips/${editingTip.id}`
        : '/api/admin/interview-tips';

      const method = editingTip ? 'PUT' : 'POST';

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
            try {
              const error = JSON.parse(xhr.responseText);
              reject(new Error(error.error || 'Failed to save interview tip'));
            } catch {
              reject(new Error(xhr.responseText || 'Failed to save interview tip'));
            }
          }
        });

        xhr.addEventListener('error', () => reject(new Error('Network error')));
        xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')));

        xhr.open(method, url);
        xhr.send(formDataToSend);
      });

      fetchTips();
      closeModal();
    } catch (error) {
      console.error('Failed to save interview tip:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm({ isOpen: true, tipId: id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.tipId) return;

    try {
      setError('');
      const response = await fetch(`/api/admin/interview-tips/${deleteConfirm.tipId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTips();
        setDeleteConfirm({ isOpen: false, tipId: null });
      } else {
        setError('Failed to delete interview tip');
        setDeleteConfirm({ isOpen: false, tipId: null });
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      setError('An error occurred');
      setDeleteConfirm({ isOpen: false, tipId: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, tipId: null });
  };

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  // Get thumbnail to display (custom uploaded > youtube auto > null)
  const getThumbnailForDisplay = () => {
    if (thumbnailPreview) return thumbnailPreview;
    if (formData.video_url && getYouTubeId(formData.video_url)) {
      return `https://img.youtube.com/vi/${getYouTubeId(formData.video_url)}/mqdefault.jpg`;
    }
    return null;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interview Tips</h1>
          <p className="text-gray-600 mt-1">Manage interview preparation videos and resources</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Tip
        </button>
      </div>

      {/* Tips Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Video</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
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
              ) : tips.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No interview tips found
                  </td>
                </tr>
              ) : (
                tips.map((tip) => (
                  <tr key={tip.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {(tip.thumbnail_url || (tip.video_url && getYouTubeId(tip.video_url))) && (
                          <img
                            src={tip.thumbnail_url || `https://img.youtube.com/vi/${getYouTubeId(tip.video_url!)}/mqdefault.jpg`}
                            alt={tip.title}
                            className="w-16 h-10 object-cover rounded"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900 line-clamp-1">{tip.title}</div>
                          {tip.duration && (
                            <div className="text-xs text-gray-500">{tip.duration}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {tip.category || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {tip.video_url ? (
                        <a
                          href={tip.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View Video
                        </a>
                      ) : (
                        <span className="text-gray-400">No video</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {tip.views_count?.toLocaleString() || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        tip.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {tip.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tip.display_order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openModal(tip)}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tip.id)}
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
                  {editingTip ? 'Edit Interview Tip' : 'Add New Interview Tip'}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Upload Progress */}
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
                  {uploadProgress >= 100 && (
                    <p className="text-xs text-gray-500 mt-1">Processing on server...</p>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      <option value="Behavioral">Behavioral</option>
                      <option value="Technical">Technical</option>
                      <option value="HR">HR</option>
                      <option value="Industry">Industry</option>
                      <option value="General">General</option>
                      <option value="Tips & Tricks">Tips & Tricks</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 10:30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video URL</label>
                  <input
                    type="url"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>

                {/* Custom Thumbnail Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Thumbnail
                    <span className="text-gray-400 font-normal ml-1">(Optional - uses YouTube thumbnail if not uploaded)</span>
                  </label>

                  {/* Thumbnail Preview */}
                  {getThumbnailForDisplay() && (
                    <div className="mb-3 relative inline-block">
                      <img
                        src={getThumbnailForDisplay()!}
                        alt="Thumbnail preview"
                        className="w-48 h-28 object-cover rounded-lg border border-gray-200"
                      />
                      {(selectedThumbnail || existingThumbnailUrl) && (
                        <button
                          type="button"
                          onClick={removeThumbnail}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                      {!selectedThumbnail && !existingThumbnailUrl && formData.video_url && (
                        <span className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-2 py-0.5 rounded">
                          YouTube Auto
                        </span>
                      )}
                      {(selectedThumbnail || existingThumbnailUrl) && (
                        <span className="absolute bottom-1 left-1 text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                          Custom
                        </span>
                      )}
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {selectedThumbnail && (
                    <p className="mt-1 text-sm text-gray-500">Selected: {selectedThumbnail.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content/Description *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Order
                      <span className="text-gray-400 font-normal ml-1">(Auto if empty)</span>
                    </label>
                    <input
                      type="number"
                      value={formData.display_order || ''}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      placeholder="Auto-assigned"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center cursor-pointer mt-6">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Active (visible on frontend)</span>
                    </label>
                  </div>
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
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {uploadProgress < 100 ? `Uploading ${uploadProgress}%` : 'Processing...'}
                      </span>
                    ) : (
                      editingTip ? 'Update Tip' : 'Create Tip'
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
        title="Delete Interview Tip"
        message="Are you sure you want to delete this interview tip? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        type="danger"
      />
    </div>
  );
}
