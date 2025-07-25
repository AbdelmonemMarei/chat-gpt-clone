"use client";

import { Model } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ModelSelectorProps {
  selectedModel: Model;
  onModelChange: (model: Model) => void;
}

const models: { value: Model; label: string; provider: string }[] = [
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini', provider: 'OpenAI' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', provider: 'OpenAI' },
  { value: 'gemini-Flash', label: 'Gemini Flash', provider: 'Google' },
  { value: 'deepseek-chat', label: 'DeepSeek Chat', provider: 'DeepSeek' },
];

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  return (
    <Select value={selectedModel} onValueChange={onModelChange}>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.value} value={model.value}>
            <div className="flex flex-col">
              <span className="font-medium">{model.label}</span>
              <span className="text-xs text-gray-500">{model.provider}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}