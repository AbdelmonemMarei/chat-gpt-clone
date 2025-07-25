"use client";

import { useState, useEffect } from 'react';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { ModelSelector } from '@/components/ModelSelector';
import { Sidebar } from '@/components/Sidebar';
import { FileUpload } from '@/components/FileUpload';
import { Settings } from '@/components/Settings';
import { Message, Model, ChatHistory, UploadedFile } from '@/types';
import { saveChatHistory, loadChatHistories, deleteChatHistory } from '@/lib/storage';
import { Menu, X, Settings as SettingsIcon } from 'lucide-react';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model>('gpt-4o-mini');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    setChatHistories(loadChatHistories());
  }, []);

  const handleSendMessage = async (content: string, isImageGen: boolean = false) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
      files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setUploadedFiles([]);
    setIsLoading(true);

    try {
      if (isImageGen) {
        const { generateImage } = await import('@/lib/imageGen');
        setIsStreaming(true);
        const imageUrl = await generateImage(content);
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `تم توليد الصورة بنجاح:`,
          timestamp: new Date().toISOString(),
          imageUrl,
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsStreaming(false);
      } else {
        const { getApiClient } = await import('@/lib/apiClients');
        const client = getApiClient(selectedModel);
        
        setIsStreaming(true);
        const response = await client.sendMessage([...messages, userMessage]);
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsStreaming(false);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'عذراً، حدث خطأ أثناء معالجة طلبك.',
        timestamp: new Date().toISOString(),
        error: true,
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsStreaming(false);
    }

    setIsLoading(false);
  };

  const handleRegenerateResponse = async (messageId: string) => {
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) return;

    const userMessage = messages[messageIndex - 1];
    if (!userMessage || userMessage.role !== 'user') return;

    // Remove the assistant message
    setMessages(prev => prev.slice(0, messageIndex));
    
    // Regenerate response
    await handleSendMessage(userMessage.content);
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, content: newContent } : msg
    ));
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setUploadedFiles([]);
  };

  const handleSaveChat = () => {
    if (messages.length === 0) return;
    
    const chatHistory: ChatHistory = {
      id: currentChatId || Date.now().toString(),
      title: messages[0]?.content.substring(0, 50) + '...' || 'محادثة جديدة',
      messages,
      timestamp: new Date().toISOString(),
      model: selectedModel,
    };

    saveChatHistory(chatHistory);
    setCurrentChatId(chatHistory.id);
    setChatHistories(loadChatHistories());
  };

  const handleLoadChat = (chatHistory: ChatHistory) => {
    setMessages(chatHistory.messages);
    setCurrentChatId(chatHistory.id);
    setSelectedModel(chatHistory.model);
    setSidebarOpen(false);
  };

  const handleDeleteChat = (chatId: string) => {
    deleteChatHistory(chatId);
    setChatHistories(loadChatHistories());
    if (currentChatId === chatId) {
      handleNewChat();
    }
  };

  const handleFileUpload = (files: UploadedFile[]) => {
    setUploadedFiles(files);
  };

  const handleExportChat = () => {
    const dataStr = JSON.stringify(messages, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `chat-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (messages.length > 0) {
        handleSaveChat();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [messages, currentChatId, selectedModel]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        chatHistories={chatHistories}
        onLoadChat={handleLoadChat}
        onDeleteChat={handleDeleteChat}
        onNewChat={handleNewChat}
        onExportChat={handleExportChat}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                ChatGPT Clone
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <ModelSelector
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
              <button
                onClick={() => setSettingsOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <SettingsIcon size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                مرحباً بك في ChatGPT Clone
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                ابدأ محادثة جديدة أو ولد صورة من وصف نصي
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onRegenerate={handleRegenerateResponse}
                onEdit={handleEditMessage}
                onDelete={handleDeleteMessage}
                isStreaming={isStreaming}
              />
            ))
          )}
        </div>

        {/* File Upload Area */}
        {uploadedFiles.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <FileUpload
              files={uploadedFiles}
              onFilesChange={setUploadedFiles}
            />
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <ChatInput
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
            isLoading={isLoading}
            selectedModel={selectedModel}
          />
        </div>
      </div>

      {/* Settings Modal */}
      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}