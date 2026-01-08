'use client';

import { useEffect, useState } from 'react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface CVTemplate {
  id: number;
  template_name: string;
  description: string | null;
  category: string;
  file_url: string;
  download_count: number;
  created_at: string;
}

export default function CVTemplatesPage() {
  const [templates, setTemplates] = useState<CVTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<CVTemplate | null>(null);
  const [formData, setFormData] = useState({
    template_name: '',
    description: '',
    category: 'Professional',
  });
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; templateId: number | null }>({
    isOpen: false,
    templateId: null,
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/cv-templates');
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (template: CVTemplate | null = null) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({
        template_name: template.template_name,
        description: template.description || '',
        category: template.category,
      });
    } else {
      setEditingTemplate(null);
      setFormData({
        template_name: '',
        description: '',
        category: 'Professional',
      });
    }
    setSelectedPdf(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTemplate(null);
    setFormData({
      template_name: '',
      description: '',
      category: 'Professional',
    });
    setSelectedPdf(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingTemplate && !selectedPdf) {
      alert('Please select a PDF file');
      return;
    }

    setSubmitting(true);
    setUploadProgress(0);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('template_name', formData.template_name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);

      // Add PDF
      if (selectedPdf) {
        if (editingTemplate) {
          formDataToSend.append('newPdf', selectedPdf);
        } else {
          formDataToSend.append('pdf', selectedPdf);
        }
      }

      const url = editingTemplate
        ? `/api/admin/cv-templates/${editingTemplate.id}`
        : '/api/admin/cv-templates';

      const method = editingTemplate ? 'PUT' : 'POST';

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
              reject(new Error(error.error || 'Failed to save template'));
            } catch {
              reject(new Error(xhr.responseText || 'Failed to save template'));
            }
          }
        });

        xhr.addEventListener('error', () => reject(new Error('Network error')));
        xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')));

        xhr.open(method, url);
        xhr.send(formDataToSend);
      });

      fetchTemplates();
      closeModal();
    } catch (error) {
      console.error('Failed to save template:', error);
      alert(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm({ isOpen: true, templateId: id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.templateId) return;

    try {
      const response = await fetch(`/api/admin/cv-templates/${deleteConfirm.templateId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTemplates();
        setDeleteConfirm({ isOpen: false, templateId: null });
      } else {
        alert('Failed to delete template');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('An error occurred');
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, templateId: null });
  };

  const handlePdfSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedPdf(e.target.files[0]);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Professional':
        return 'bg-blue-100 text-blue-800';
      case 'Creative':
        return 'bg-purple-100 text-purple-800';
      case 'Academic':
        return 'bg-green-100 text-green-800';
      case 'Entry-Level':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CV Templates</h1>
          <p className="text-gray-600 mt-1">Manage downloadable resume templates</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Template
        </button>
      </div>

      {/* All Templates Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            Loading...
          </div>
        </div>
      ) : templates.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No CV templates found
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Template Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Downloads</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {templates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{template.template_name}</div>
                      <a
                        href={template.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Preview PDF
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(template.category)}`}>
                        {template.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {template.description || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {template.download_count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(template.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openModal(template)}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(template.id)}
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

            <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingTemplate ? 'Edit CV Template' : 'Add New CV Template'}
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
                      <span className="text-sm font-medium text-gray-700">Uploading PDF...</span>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                  <input
                    type="text"
                    value={formData.template_name}
                    onChange={(e) => setFormData({ ...formData, template_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of this template"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="Professional">Professional</option>
                    <option value="Creative">Creative</option>
                    <option value="Academic">Academic</option>
                    <option value="Entry-Level">Entry-Level</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Minimalist">Minimalist</option>
                    <option value="Executive">Executive</option>
                    <option value="Technical">Technical</option>
                    <option value="Merchandising">Merchandising</option>
                    <option value="Quality">Quality</option>
                    <option value="Student">Student</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {editingTemplate ? 'Replace PDF' : 'PDF File'} (Required)
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={!editingTemplate}
                  />
                  {selectedPdf && (
                    <p className="mt-1 text-sm text-gray-500">Selected: {selectedPdf.name}</p>
                  )}
                  {editingTemplate && !selectedPdf && (
                    <p className="mt-1 text-sm text-gray-500">
                      Current file: <a href={editingTemplate.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600">View PDF</a>
                    </p>
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
                      editingTemplate ? 'Update Template' : 'Create Template'
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
        title="Delete CV Template"
        message="Are you sure you want to delete this CV template? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        type="danger"
      />
    </div>
  );
}
