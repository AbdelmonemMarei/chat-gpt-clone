"use client";

import { useState } from 'react';
import { ChatHistory } from '@/types';
import { X, Plus, Trash2, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chatHistories: ChatHistory[];
  onLoadChat: (chat: ChatHistory) => void;
  onDeleteChat: (chatId: string) => void;
  onNewChat: () => void;
  onExportChat: () => void;
}

export function Sidebar({
  isOpen,
  onClose,
  chatHistories,
  onLoadChat,
  onDeleteChat,
  onNewChat,
  onExportChat
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistories = chatHistories.filter(chat =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 lg:hidden" 
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="relative flex flex-col w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            سجل المحادثات
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Actions */}
        <div className="p-4 space-y-2">
          <Button
            onClick={onNewChat}
            className="w-full justify-start"
          >
            <Plus size={16} className="ml-2" />
            محادثة جديدة
          </Button>
          
          <Button
            onClick={onExportChat}
            variant="outline"
            className="w-full justify-start"
          >
            <Download size={16} className="ml-2" />
            تصدير المحادثة
          </Button>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="البحث في المحادثات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Chat History List */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2">
            {filteredHistories.map((chat) => (
              <div
                key={chat.id}
                className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => onLoadChat(chat)}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {chat.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(chat.timestamp).toLocaleDateString('ar-SA')}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {chat.model} • {chat.messages.length} رسالة
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                >
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </div>
            ))}
            
            {filteredHistories.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {searchTerm ? 'لا توجد نتائج' : 'لا توجد محادثات محفوظة'}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}