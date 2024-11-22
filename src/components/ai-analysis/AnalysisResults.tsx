'use client'

import { useEffect, useRef } from 'react';

interface Segmentation {
  points: number[][];
  mask: boolean[][];
}

interface Detection {
  class: string;
  confidence: number;
  segmentation: Segmentation;
}

interface AnalysisResultsProps {
  results: {
    detections: Detection[];
    count: number;
    success: boolean;
    image_size: {
      width: number;
      height: number;
    };
  };
  imageSrc: string;
}

export default function AnalysisResults({ results, imageSrc }: AnalysisResultsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const getColorForClass = (className: string) => {
    switch (className.toLowerCase()) {
      case 'forest':
        return {
          fill: 'rgba(0, 255, 0, 0.3)',
          stroke: 'rgba(0, 255, 0, 1)'
        };
      case 'deforestation':
        return {
          fill: 'rgba(255, 0, 0, 0.3)',
          stroke: 'rgba(255, 0, 0, 1)'
        };
      default:
        return {
          fill: 'rgba(128, 128, 128, 0.3)',
          stroke: 'rgba(128, 128, 128, 1)'
        };
    }
  };

  useEffect(() => {
    if (!results || !results.success) return;

    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawResults = () => {
      // Limpiar el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar la imagen original
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Dibujar cada segmentación
      results.detections.forEach((detection) => {
        const { points } = detection.segmentation;
        const colors = getColorForClass(detection.class);
        
        ctx.fillStyle = colors.fill;
        ctx.strokeStyle = colors.stroke;
        ctx.lineWidth = 2;

        // Dibujar el polígono de segmentación
        ctx.beginPath();
        if (points.length > 0) {
          ctx.moveTo(
            (points[0][0] * canvas.width) / results.image_size.width,
            (points[0][1] * canvas.height) / results.image_size.height
          );
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(
              (points[i][0] * canvas.width) / results.image_size.width,
              (points[i][1] * canvas.height) / results.image_size.height
            );
          }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Agregar etiqueta
        const firstPoint = points[0];
        if (firstPoint) {
          const x = (firstPoint[0] * canvas.width) / results.image_size.width;
          const y = (firstPoint[1] * canvas.height) / results.image_size.height;
          
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 3;
          ctx.font = '14px Arial';
          const label = `${detection.class} (${Math.round(detection.confidence * 100)}%)`;
          ctx.strokeText(label, x, y - 5);
          ctx.fillText(label, x, y - 5);
        }
      });
    };

    // Configurar el canvas cuando la imagen se carga
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      drawResults();
    };

    // Cargar la imagen
    image.src = imageSrc;
  }, [results, imageSrc]);

  if (!results || !results.success) return null;

  return (
    <div className="space-y-4">
      <div className="relative">
        <img
          ref={imageRef}
          src={imageSrc}
          alt="Original"
          className="hidden"
        />
        <canvas
          ref={canvasRef}
          className="w-full rounded-lg"
        />
      </div>

      {/* Leyenda */}
      <div className="flex gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 opacity-30 border border-green-700"></div>
          <span className="text-sm">Área Forestada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 opacity-30 border border-red-700"></div>
          <span className="text-sm">Área Deforestada</span>
        </div>
      </div>

      {/* Resumen de detecciones */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Resumen de Detecciones</h3>
        <div className="space-y-2">
          {Object.entries(
            results.detections.reduce((acc, det) => {
              acc[det.class] = (acc[det.class] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          ).map(([className, count]) => (
            <div key={className} className="flex justify-between items-center">
              <span className="text-sm font-medium">{className}:</span>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                {count} {count === 1 ? 'área' : 'áreas'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Debug info */}
      <details className="mt-4">
        <summary className="text-sm text-gray-500 cursor-pointer">
          Detalles técnicos
        </summary>
        <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-auto">
          {JSON.stringify(results, null, 2)}
        </pre>
      </details>
    </div>
  );
}
