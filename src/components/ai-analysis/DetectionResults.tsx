// src/components/ai-analysis/DetectionResults.tsx
import { useEffect, useRef } from 'react';

interface DetectionResultsProps {
  results: any; // Tipo específico según la estructura de resultados de YOLO
  imageUrl: string;
}

export default function DetectionResults({ results, imageUrl }: DetectionResultsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !results) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // Dibujar las detecciones
      results.forEach((detection: any) => {
        const [x, y, width, height] = detection.bbox;
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        // Etiqueta
        ctx.fillStyle = '#00ff00';
        ctx.fillText(
          `${detection.class} ${Math.round(detection.confidence * 100)}%`,
          x, y - 5
        );
      });
    };
  }, [results, imageUrl]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
      />
    </div>
  );
}