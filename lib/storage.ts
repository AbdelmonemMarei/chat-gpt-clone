import { ChatHistory } from '@/types';

const STORAGE_KEY = 'chat_histories';

export function saveChatHistory(chatHistory: ChatHistory): void {
  if (typeof window === 'undefined') return;
  
  const histories = loadChatHistories();
  const existingIndex = histories.findIndex(h => h.id === chatHistory.id);
  
  if (existingIndex >= 0) {
    histories[existingIndex] = chatHistory;
  } else {
    histories.unshift(chatHistory);
  }
  
  // Keep only last 50 chats
  const limitedHistories = histories.slice(0, 50);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistories));
}

export function loadChatHistories(): ChatHistory[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading chat histories:', error);
    return [];
  }
}

export function deleteChatHistory(chatId: string): void {
  if (typeof window === 'undefined') return;
  
  const histories = loadChatHistories();
  const filtered = histories.filter(h => h.id !== chatId);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearAllHistories(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(STORAGE_KEY);
}