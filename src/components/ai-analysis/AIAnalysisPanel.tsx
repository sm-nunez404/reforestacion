'use client'

import { useState } from 'react';
import { ModelService } from '@/lib/services/ai/modelService';
import { Card } from '@/components/ui/Card';
import ImageUploader from './ImageUploader';
import AnalysisResults from './AnalysisResults';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function AIAnalysisPanel() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const handleAnalysis = async (file: File) => {
    try {
      setLoading(true);
      setError(null);
      
      // Guardar URL de la imagen actual
      const imageUrl = URL.createObjectURL(file);
      setCurrentImage(imageUrl);

      const service = ModelService.getInstance();
      const result = await service.analyzeImage(file);
      setResults(result);
    } catch (error) {
      setError('Error al analizar la imagen');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Análisis de Imágenes</h2>
        
        <ImageUploader onUpload={handleAnalysis} />
        
        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
        
        {results && currentImage && (
          <div className="mt-6">
            <AnalysisResults 
              results={results} 
              imageSrc={currentImage} 
            />
          </div>
        )}
      </Card>
    </div>
  );
}
