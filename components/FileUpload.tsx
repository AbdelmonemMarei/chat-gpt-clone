"use client";

import { UploadedFile } from '@/types';
import { X, FileText, Image, Music, File } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
}

export function FileUpload({ files, onFilesChange }: FileUploadProps) {
  const removeFile = (fileId: string) => {
    onFilesChange(files.filter(f => f.id !== fileId));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image size={16} />;
    if (type.startsWith('audio/')) return <Music size={16} />;
    if (type.includes('pdf')) return <FileText size={16} />;
    return <File size={16} />;
  };

  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
        الملفات المرفقة:
      </h3>
      <div className="flex flex-wrap gap-2">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg text-sm"
          >
            {getFileIcon(file.type)}
            <span className="text-gray-900 dark:text-white">{file.name}</span>
            <span className="text-gray-500 text-xs">
              ({(file.size / 1024).toFixed(1)} KB)
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto"
              onClick={() => removeFile(file.id)}
            >
              <X size={14} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}