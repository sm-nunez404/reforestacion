'use client'

import { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // en bytes
}

export default function ImageUploader({ 
  onImageSelect, 
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024 // 5MB por defecto
}: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);

    const file = e.dataTransfer.files?.[0];
    validateAndProcessFile(file);
  }, [onImageSelect]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError(null);

    const file = e.target.files?.[0];
    validateAndProcessFile(file);
  }, [onImageSelect]);

  const validateAndProcessFile = (file?: File) => {
    if (!file) {
      setError('No se seleccionó ningún archivo');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen');
      return;
    }

    if (file.size > maxSize) {
      setError(`El archivo es demasiado grande. Máximo ${maxSize / 1024 / 1024}MB`);
      return;
    }

    onImageSelect(file);
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${error ? 'border-red-500' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          id="image-upload"
        />
        
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          {dragActive ? (
            <Upload className="w-12 h-12 text-blue-500 mb-4" />
          ) : (
            <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
          )}
          
          <p className="text-sm text-gray-600 mb-2">
            Arrastra y suelta una imagen aquí o
          </p>
          
          <Button type="button" variant="outline" size="sm">
            Selecciona un archivo
          </Button>
          
          <p className="text-xs text-gray-500 mt-2">
            PNG, JPG o TIFF hasta {maxSize / 1024 / 1024}MB
          </p>
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}
