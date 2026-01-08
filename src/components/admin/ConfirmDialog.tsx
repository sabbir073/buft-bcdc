interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  type = 'danger',
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      buttonColor: 'bg-red-600 hover:bg-red-700',
    },
    warning: {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
    },
    info: {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
    },
  };

  const style = typeStyles[type];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onCancel}
        ></div>

        {/* Modal */}
        <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-6 pt-6 pb-4">
            <div className="sm:flex sm:items-start">
              {/* Icon */}
              <div
                className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${style.bgColor} sm:mx-0 sm:h-12 sm:w-12`}
              >
                <div className={style.iconColor}>{style.icon}</div>
              </div>

              {/* Content */}
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{message}</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse gap-3">
            <button
              type="button"
              onClick={onConfirm}
              className={`w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-6 py-3 ${style.buttonColor} text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm transition-colors`}
            >
              {confirmLabel}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm transition-colors"
            >
              {cancelLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
