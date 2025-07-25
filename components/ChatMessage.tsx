"use client";

import { useState } from 'react';
import { Message } from '@/types';
import { Bot, User, RefreshCw, Edit2, Trash2, Copy, Volume2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTTS } from '@/lib/tts';

interface ChatMessageProps {
  message: Message;
  onRegenerate: (messageId: string) => void;
  onEdit: (messageId: string, newContent: string) => void;
  onDelete: (messageId: string) => void;
  isStreaming?: boolean;
}

export function ChatMessage({
  message,
  onRegenerate,
  onEdit,
  onDelete,
  isStreaming = false
}: ChatMessageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const { speak, isPlaying, stop } = useTTS();

  const handleEdit = () => {
    onEdit(message.id, editContent);
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  const handleSpeak = () => {
    if (isPlaying) {
      stop();
    } else {
      speak(message.content);
    }
  };

  const handleDownloadImage = () => {
    if (message.imageUrl) {
      const link = document.createElement('a');
      link.href = message.imageUrl;
      link.download = `generated-image-${message.id}.png`;
      link.click();
    }
  };

  return (
    <div className={`flex gap-4 p-4 rounded-lg ${
      message.role === 'user' 
        ? 'bg-blue-50 dark:bg-blue-900/20 ml-12' 
        : 'bg-gray-50 dark:bg-gray-800/50 mr-12'
    } ${message.error ? 'border-l-4 border-red-500' : ''}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
        message.role === 'user' 
          ? 'bg-blue-500' 
          : message.error 
            ? 'bg-red-500' 
            : 'bg-green-500'
      }`}>
        {message.role === 'user' ? <User size={18} /> : <Bot size={18} />}
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Message Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {message.role === 'user' ? 'أنت' : 'المساعد'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(message.timestamp).toLocaleTimeString('ar-SA')}
          </span>
        </div>

        {/* Files */}
        {message.files && message.files.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {message.files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
              >
                <span className="text-gray-600 dark:text-gray-300">{file.name}</span>
                <span className="text-xs text-gray-500">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Message Content */}
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleEdit}>
                حفظ
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                إلغاء
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-gray-900 dark:text-white whitespace-pre-wrap">
              {message.content}
              {isStreaming && message.role === 'assistant' && (
                <span className="inline-block w-2 h-5 bg-gray-500 ml-1 animate-pulse">|</span>
              )}
            </div>

            {/* Generated Image */}
            {message.imageUrl && (
              <div className="mt-3">
                <img
                  src={message.imageUrl}
                  alt="Generated image"
                  className="max-w-md rounded-lg shadow-md"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={handleDownloadImage}
                >
                  <Download size={16} className="ml-2" />
                  تحميل الصورة
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2"
            onClick={handleCopy}
          >
            <Copy size={14} />
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2"
            onClick={handleSpeak}
          >
            <Volume2 size={14} className={isPlaying ? 'text-blue-500' : ''} />
          </Button>

          {message.role === 'user' && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 size={14} />
            </Button>
          )}

          {message.role === 'assistant' && !message.error && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2"
              onClick={() => onRegenerate(message.id)}
            >
              <RefreshCw size={14} />
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2 text-red-500"
            onClick={() => onDelete(message.id)}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}