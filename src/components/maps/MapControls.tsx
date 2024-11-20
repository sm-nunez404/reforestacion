'use client'

import { useState } from 'react';
import { Layers, Map as MapIcon, Plane, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface MapControlsProps {
  onLayerToggle: (layerId: 'areas' | 'drones' | 'semillas') => void;
}

export default function MapControls({ onLayerToggle }: MapControlsProps) {
  const [activeLayers, setActiveLayers] = useState(['areas', 'drones']);

  const toggleLayer = (layerId: 'areas' | 'drones' | 'semillas') => {
    setActiveLayers(prev => 
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
    onLayerToggle(layerId);
  };

  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2 z-[2000]">
      <div className="space-y-2">
        <Button
          variant={activeLayers.includes('areas') ? 'primary' : 'outline'}
          size="sm"
          className="w-full justify-start"
          onClick={() => toggleLayer('areas')}
        >
          <MapIcon className="w-4 h-4 mr-2" />
          Áreas
        </Button>

        <Button
          variant={activeLayers.includes('drones') ? 'primary' : 'outline'}
          size="sm"
          className="w-full justify-start"
          onClick={() => toggleLayer('drones')}
        >
          <Plane className="w-4 h-4 mr-2" />
          Drones
        </Button>

        <Button
          variant={activeLayers.includes('semillas') ? 'primary' : 'outline'}
          size="sm"
          className="w-full justify-start"
          onClick={() => toggleLayer('semillas')}
        >
          <Leaf className="w-4 h-4 mr-2" />
          Semillas
        </Button>

        <div className="border-t border-gray-200 my-2" />

        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          onClick={() => {
            // Resetear vista del mapa
          }}
        >
          <Layers className="w-4 h-4 mr-2" />
          Resetear Vista
        </Button>
      </div>
    </div>
  );
}
