import { Model, ApiClient } from '@/types';
import { OpenAIClient } from './openai';
import { GeminiClient } from './gemini';
import { DeepSeekClient } from './deepseek';

export function getApiClient(model: Model): ApiClient {
  switch (model) {
    case 'gpt-4o-mini':
    case 'gpt-3.5-turbo':
      return new OpenAIClient(model);
    case 'gemini-Flash':
      return new GeminiClient();
    case 'deepseek-chat':
      return new DeepSeekClient();
    default:
      return new OpenAIClient('gpt-4o-mini');
  }
}