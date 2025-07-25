"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Image, Paperclip, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Model, UploadedFile } from '@/types';
import { useSTT } from '@/lib/stt';

interface ChatInputProps {
  onSendMessage: (message: string, isImageGen?: boolean) => void;
  onFileUpload: (files: UploadedFile[]) => void;
  isLoading: boolean;
  selectedModel: Model;
}

export function ChatInput({ 
  onSendMessage, 
  onFileUpload, 
  isLoading,
  selectedModel 
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isImageMode, setIsImageMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { startRecording, stopRecording, isRecording, transcript } = useSTT();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message, isImageMode);
      setMessage('');
      setIsImageMode(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const uploadedFiles: UploadedFile[] = files.map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }));

    onFileUpload(uploadedFiles);
  };

  const handleVoiceInput = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Update message when transcript changes
  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="space-y-3">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={!isImageMode ? "default" : "outline"}
          size="sm"
          onClick={() => setIsImageMode(false)}
        >
          💬 دردشة
        </Button>
        <Button
          type="button"
          variant={isImageMode ? "default" : "outline"}
          size="sm"
          onClick={() => setIsImageMode(true)}
        >
          🎨 توليد صورة
        </Button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isImageMode 
                  ? "صف الصورة التي تريد توليدها..." 
                  : "اكتب رسالتك هنا..."
              }
              className="min-h-[50px] max-h-[150px] resize-none pr-12"
              disabled={isLoading}
            />
            
            {/* Voice Input Button */}
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className={`absolute left-2 top-2 h-8 w-8 p-0 ${
                isRecording ? 'text-red-500' : ''
              }`}
              onClick={handleVoiceInput}
            >
              {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
            </Button>
          </div>

          {/* File Upload */}
          {!isImageMode && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip size={16} />
            </Button>
          )}

          {/* Send Button */}
          <Button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="px-4"
          >
            {isImageMode ? <Image size={16} /> : <Send size={16} />}
          </Button>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.gif,.mp3,.wav,.txt,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Recording Indicator */}
        {isRecording && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            جاري التسجيل...
          </div>
        )}
      </form>
    </div>
  );
}