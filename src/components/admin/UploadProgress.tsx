interface UploadProgressProps {
  progress: number;
  isUploading: boolean;
}

export default function UploadProgress({ progress, isUploading }: UploadProgressProps) {
  if (!isUploading || progress === 0) return null;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Uploading files...</span>
        <span className="text-sm font-medium text-blue-600">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {progress >= 100 && (
        <p className="text-xs text-gray-500 mt-1">Processing on server...</p>
      )}
    </div>
  );
}
