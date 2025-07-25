export type Model = 'gpt-4o-mini' | 'gpt-3.5-turbo' | 'gemini-pro' | 'deepseek-chat';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  imageUrl?: string;
  files?: UploadedFile[];
  error?: boolean;
}

export interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  timestamp: string;
  model: Model;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  data?: string;
}

export interface ApiClient {
  sendMessage(messages: Message[]): Promise<string>;
}