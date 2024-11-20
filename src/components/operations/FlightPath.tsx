'use client'

import { useEffect } from 'react';
import { Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

interface FlightPathProps {
  coordinates: [number, number][];
  isDraggable?: boolean;
  onPathUpdate?: (newCoordinates: [number, number][]) => void;
}

export default function FlightPath({ 
  coordinates, 
  isDraggable = false,
  onPathUpdate 
}: FlightPathProps) {
  const map = useMap();

  useEffect(() => {
    if (isDraggable && coordinates.length > 0) {
      // Crear marcadores arrastrables para cada punto
      coordinates.forEach((coord, index) => {
        const marker = L.marker(coord, {
          draggable: true,
          icon: L.divIcon({
            className: 'w-3 h-3 bg-blue-500 rounded-full border-2 border-white',
            iconSize: [12, 12]
          })
        });

        marker.on('dragend', (e) => {
          const newCoords = [...coordinates];
          newCoords[index] = [e.target._latlng.lat, e.target._latlng.lng];
          onPathUpdate?.(newCoords);
        });

        marker.addTo(map);
      });
    }
  }, [map, coordinates, isDraggable, onPathUpdate]);

  return (
    <Polyline
      positions={coordinates}
      pathOptions={{
        color: 'blue',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10'
      }}
    />
  );
}
