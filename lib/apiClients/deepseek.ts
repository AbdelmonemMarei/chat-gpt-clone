import { Message, ApiClient } from '@/types';

export class DeepSeekClient implements ApiClient {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || '';
  }

  async sendMessage(messages: Message[]): Promise<string> {
    if (!this.apiKey) {
      throw new Error('DeepSeek API key is not configured. Please check your environment variables.');
    }

    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: formattedMessages,
        max_tokens: 4000,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'DeepSeek API error');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }
}