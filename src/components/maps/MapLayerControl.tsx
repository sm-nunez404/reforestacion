'use client'

import React from 'react';
import { useState } from 'react';
import { Map, Satellite, Mountain, type LucideProps } from 'lucide-react';

// Importa el tipo desde MapPreview
import type { MapLayerType } from './MapPreview';

interface MapLayerControlProps {
  currentLayer: MapLayerType;
  onLayerChange: (layer: MapLayerType) => void;
}

const MAP_LAYER_NAMES: Record<MapLayerType, string> = {
  default: "Mapa Base",
  satellite: "Satélite",
  satellite2: "Satélite 2",
  terrain: "Terreno"
};

const MAP_LAYER_INFO: Record<MapLayerType, { name: string; icon: React.ComponentType<LucideProps> }> = {
  default: { name: "Mapa Base", icon: Map },
  satellite: { name: "Satélite", icon: Satellite },
  satellite2: { name: "Satélite 2", icon: Satellite },
  terrain: { name: "Terreno", icon: Mountain }
};

export default function MapLayerControl({ currentLayer, onLayerChange }: MapLayerControlProps) {
  return (
    <div className="absolute bottom-4 right-4 bg-white rounded-md shadow-md z-[1000]">
      <div className="p-2 space-y-1">
        {(Object.entries(MAP_LAYER_NAMES) as [MapLayerType, string][]).map(([key, name]) => {
          const Icon = MAP_LAYER_INFO[key].icon;
          return (
            <button
              key={key}
              onClick={() => onLayerChange(key as MapLayerType)}
              className={`w-full px-3 py-1 text-sm rounded-md transition-colors flex items-center gap-2
                ${currentLayer === key 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100'
                }`}
            >
              <Icon size={16} />
              {MAP_LAYER_INFO[key].name}
            </button>
          );
        })}
      </div>
    </div>
  );
}