'use client'

import { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = useCallback((file: File) => {
    // Crear URL para previsualización
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    onUpload(file);
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="space-y-4">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-64 mx-auto rounded-lg"
            />
            <Button 
              onClick={() => {
                setPreview(null);
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => handleChange(e as any);
                input.click();
              }}
            >
              Cambiar imagen
            </Button>
          </div>
        ) : (
          <>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <Upload className="h-12 w-12 text-gray-400" />
              <span className="text-sm text-gray-600">
                Arrastra una imagen o haz clic para seleccionar
              </span>
            </label>
          </>
        )}
      </div>
    </div>
  );
}
