'use client'

import { useState } from 'react';
import { 
  Ruler, 
  Plus, 
  Minus, 
  Maximize2, 
  Download,
  Share2 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useMap } from '@/lib/hooks/useMap';

export default function MapToolbar() {
  const { zoomIn, zoomOut, toggleMeasurement, downloadArea } = useMap();
  const [isMeasuring, setIsMeasuring] = useState(false);

  const handleMeasureClick = () => {
    setIsMeasuring(!isMeasuring);
    toggleMeasurement();
  };

  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-2 z-[1000]">
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={zoomIn}
          title="Acercar"
        >
          <Plus className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={zoomOut}
          title="Alejar"
        >
          <Minus className="w-4 h-4" />
        </Button>

        <div className="border-t border-gray-200 my-2" />

        <Button
          variant={isMeasuring ? 'primary' : 'outline'}
          size="sm"
          onClick={handleMeasureClick}
          title="Medir área"
        >
          <Ruler className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {}}
          title="Pantalla completa"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>

        <div className="border-t border-gray-200 my-2" />

        <Button
          variant="outline"
          size="sm"
          onClick={downloadArea}
          title="Descargar área"
        >
          <Download className="w-4 h-4" />
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => {}}
          title="Compartir"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
