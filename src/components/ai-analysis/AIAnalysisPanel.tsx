'use client'

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertCircle } from 'lucide-react';
import ImageUploader from './ImageUploader';
import ModelSelector from './ModelSelector';
import { AIModel } from '@/types/ai/models';
import { AnalysisResult } from '@/types/ai/analysis';
import { ImageProcessingService } from '@/lib/services/ai/imageProcessingService';
import { ModelInferenceService } from '@/lib/services/ai/modelInferenceService';
import modelsData from '@/data/mock/models.json';

export default function AIAnalysisPanel() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback(async (file: File) => {
    setSelectedImage(file);
    setAnalysisResult(null);
    setError(null);

    // Crear URL para preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Limpiar URL al desmontar
    return () => URL.revokeObjectURL(url);
  }, []);

  const handleModelSelect = useCallback((model: AIModel) => {
    setSelectedModel(model);
    setAnalysisResult(null);
    setError(null);
  }, []);

  const handleAnalyze = async () => {
    if (!selectedImage || !selectedModel) {
      setError('Por favor selecciona una imagen y un modelo');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Cargar y preprocesar imagen
      const image = await ImageProcessingService.loadImage(selectedImage);
      const processedImageData = await ImageProcessingService.preprocessImage(
        image,
        selectedModel.inputSize
      );

      // Ejecutar inferencia
      const inferenceService = ModelInferenceService.getInstance();
      const result = await inferenceService.runInference(
        processedImageData,
        { modelType: selectedModel.type }
      );

      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar la imagen');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Análisis de Terreno con IA
        </h2>

        <div className="space-y-6">
          {/* Selector de Modelo */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              1. Selecciona un modelo
            </h3>
            <ModelSelector
              models={modelsData.models as AIModel[]}
              selectedModel={selectedModel || undefined}
              onModelSelect={handleModelSelect}
            />
          </div>

          {/* Carga de Imagen */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              2. Carga una imagen
            </h3>
            <ImageUploader onImageSelect={handleImageSelect} />
          </div>

          {/* Preview de la imagen */}
          {previewUrl && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Vista previa
              </h3>
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-[300px] w-full object-contain"
                />
              </div>
            </div>
          )}

          {/* Botón de Análisis */}
          <div className="flex justify-end">
            <Button
              onClick={handleAnalyze}
              disabled={!selectedImage || !selectedModel || isProcessing}
            >
              {isProcessing ? 'Procesando...' : 'Analizar Imagen'}
            </Button>
          </div>

          {/* Mensaje de Error */}
          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Resultados del Análisis */}
          {analysisResult && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Resultados del Análisis
              </h3>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-auto">
                {JSON.stringify(analysisResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
