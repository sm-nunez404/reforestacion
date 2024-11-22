'use client'

import { AIModel } from '@/types/ai/models';
import { Card } from '@/components/ui/Card';
import { Brain } from 'lucide-react';

interface ModelSelectorProps {
  models: AIModel[];
  selectedModel?: AIModel;
  onModelSelect: (model: AIModel) => void;
}

export default function ModelSelector({
  models,
  selectedModel,
  onModelSelect
}: ModelSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {models.map((model) => (
        <Card
          key={model.id}
          className={`p-4 cursor-pointer transition-all
            ${selectedModel?.id === model.id 
              ? 'border-blue-500 bg-blue-50' 
              : 'hover:border-gray-300'}`}
          onClick={() => onModelSelect(model)}
        >
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">
                {model.name}
              </h3>
              
              <p className="text-sm text-gray-500 mt-1">
                {model.description}
              </p>
              
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {model.type}
                </span>
                <span className="text-xs text-gray-500">
                  {model.numClasses} clases
                </span>
                <span className="text-xs text-gray-500">
                  v{model.version}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
