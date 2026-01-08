'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface BoardMember {
  id: number;
  name: string;
  position: string;
  category_id: number;
  category_name: string;
  image_url: string | null;
  facebook_url: string | null;
  linkedin_url: string | null;
  is_featured: boolean;
  display_order: number;
  created_at: string;
}

interface Category {
  id: number;
  category_name: string;
  display_order: number;
}

export default function BoardMembersPage() {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<BoardMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    category_id: '',
    facebook_url: '',
    linkedin_url: '',
    display_order: 1,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; memberId: number | null }>({
    isOpen: false,
    memberId: null,
  });

  useEffect(() => {
    fetchMembers();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Set default category to display_order 1 when categories are loaded
    if (categories.length > 0 && selectedCategoryId === null) {
      const defaultCategory = categories.find(c => c.display_order === 1) || categories[0];
      setSelectedCategoryId(defaultCategory.id);
    }
  }, [categories, selectedCategoryId]);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/board-members');
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/board-categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const openModal = (member: BoardMember | null = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        position: member.position,
        category_id: member.category_id.toString(),
        facebook_url: member.facebook_url || '',
        linkedin_url: member.linkedin_url || '',
        display_order: member.display_order,
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        position: '',
        category_id: categories.length > 0 ? categories[0].id.toString() : '',
        facebook_url: '',
        linkedin_url: '',
        display_order: 1,
      });
    }
    setSelectedImage(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMember(null);
    setFormData({
      name: '',
      position: '',
      category_id: '',
      facebook_url: '',
      linkedin_url: '',
      display_order: 1,
    });
    setSelectedImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setUploadProgress(0);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('category_id', formData.category_id);
      formDataToSend.append('facebook_url', formData.facebook_url);
      formDataToSend.append('linkedin_url', formData.linkedin_url);
      formDataToSend.append('display_order', formData.display_order.toString());

      // Add image
      if (selectedImage) {
        if (editingMember) {
          formDataToSend.append('newImage', selectedImage);
        } else {
          formDataToSend.append('image', selectedImage);
        }
      }

      const url = editingMember
        ? `/api/admin/board-members/${editingMember.id}`
        : '/api/admin/board-members';

      const method = editingMember ? 'PUT' : 'POST';

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
              reject(new Error(error.error || 'Failed to save member'));
            } catch {
              reject(new Error(xhr.responseText || 'Failed to save member'));
            }
          }
        });

        xhr.addEventListener('error', () => reject(new Error('Network error')));
        xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')));

        xhr.open(method, url);
        xhr.send(formDataToSend);
      });

      fetchMembers();
      closeModal();
    } catch (error) {
      console.error('Failed to save member:', error);
      alert(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm({ isOpen: true, memberId: id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.memberId) return;

    try {
      const response = await fetch(`/api/admin/board-members/${deleteConfirm.memberId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchMembers();
        setDeleteConfirm({ isOpen: false, memberId: null });
      } else {
        alert('Failed to delete member');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('An error occurred');
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, memberId: null });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Filter members by selected category
  const filteredMembers = selectedCategoryId
    ? members.filter(m => m.category_id === selectedCategoryId)
    : members;

  // Get homepage members (category display_order 1, member display_order 1-6)
  const homepageCategory = categories.find(c => c.display_order === 1);
  const homepageMembers = homepageCategory
    ? members.filter(m => m.category_id === homepageCategory.id && m.display_order >= 1 && m.display_order <= 6)
    : [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Executive Board Members</h1>
          <p className="text-gray-600 mt-1">
            Manage board members ({members.length} total, {homepageMembers.length} on homepage)
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Member
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
        <select
          value={selectedCategoryId || ''}
          onChange={(e) => setSelectedCategoryId(e.target.value ? parseInt(e.target.value) : null)}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.category_name}
            </option>
          ))}
        </select>
      </div>

      {/* Members Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            Loading...
          </div>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
          No members in this category
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Social</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Homepage</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 font-semibold rounded-full">
                              {member.display_order}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {member.image_url ? (
                                <div className="relative h-10 w-10 mr-3">
                                  <Image
                                    src={member.image_url}
                                    alt={member.name}
                                    fill
                                    className="rounded-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                  <span className="text-gray-500 text-xs">No img</span>
                                </div>
                              )}
                              <div className="font-medium text-gray-900">{member.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {member.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex gap-2">
                              {member.facebook_url && (
                                <a
                                  href={member.facebook_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  FB
                                </a>
                              )}
                              {member.linkedin_url && (
                                <a
                                  href={member.linkedin_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-700 hover:text-blue-900"
                                >
                                  IN
                                </a>
                              )}
                              {!member.facebook_url && !member.linkedin_url && (
                                <span className="text-gray-400">-</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {homepageMembers.some(hm => hm.id === member.id) && (
                              <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                On Homepage
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => openModal(member)}
                              className="text-blue-600 hover:text-blue-800 mr-4"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(member.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                ))}
              </tbody>
            </table>
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

            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 z-10 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingMember ? 'Edit Board Member' : 'Add New Board Member'}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., President, Vice President"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.category_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                  <input
                    type="url"
                    value={formData.facebook_url}
                    onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Homepage Display:</strong> Members from the first category (display order 1) with member display order 1-6 will appear on the homepage.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {editingMember ? 'Change Photo' : 'Photo'} (JPEG, PNG, WebP)
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
                  {editingMember && editingMember.image_url && !selectedImage && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-1">Current photo:</p>
                      <div className="relative h-20 w-20">
                        <Image
                          src={editingMember.image_url}
                          alt={editingMember.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
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
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {uploadProgress < 100 ? `Uploading ${uploadProgress}%` : 'Processing...'}
                      </span>
                    ) : (
                      editingMember ? 'Update Member' : 'Create Member'
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
        title="Delete Board Member"
        message="Are you sure you want to delete this board member? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        type="danger"
      />
    </div>
  );
}
