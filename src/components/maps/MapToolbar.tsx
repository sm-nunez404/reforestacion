'use client'

import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import { Button } from '@/components/ui/Button';
import { 
  Ruler, 
  Pencil,
  Square,
  Circle, 
  Trash2
} from 'lucide-react';

function MapToolbarContent() {
  const map = useMap();
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [drawnItems, setDrawnItems] = useState<L.FeatureGroup | null>(null);
  const [drawInstance, setDrawInstance] = useState<any>(null);
  const [measurements, setMeasurements] = useState<{
    distance: number;
    area: number;
  }>({ distance: 0, area: 0 });

  useEffect(() => {
    if (!map) return;

    // Crear un FeatureGroup para almacenar todas las capas dibujadas
    const newDrawnItems = new L.FeatureGroup();
    map.addLayer(newDrawnItems);
    setDrawnItems(newDrawnItems);

    // Configurar los eventos de dibujo
    map.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer;
      newDrawnItems.addLayer(layer);
      
      if (e.layerType === 'polygon' || e.layerType === 'rectangle') {
        const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
        setMeasurements(prev => ({ ...prev, area: area / 10000 }));
      } else if (e.layerType === 'polyline') {
        const distance = layer.getDistance();
        setMeasurements(prev => ({ ...prev, distance: distance / 1000 }));
      } else if (e.layerType === 'circle') {
        const radius = layer.getRadius();
        const area = Math.PI * Math.pow(radius, 2);
        setMeasurements(prev => ({ ...prev, area: area / 10000 }));
      }
      
      // Desactivar el modo activo después de completar el dibujo
      setActiveMode(null);
      if (drawInstance) {
        drawInstance.disable();
      }
    });

    return () => {
      if (drawInstance) {
        drawInstance.disable();
      }
      map.removeLayer(newDrawnItems);
      map.off(L.Draw.Event.CREATED);
    };
  }, [map]);

  const handleModeChange = (mode: string) => {
    // Si hay una instancia activa, desactivarla
    if (drawInstance) {
      drawInstance.disable();
    }

    if (activeMode === mode) {
      setActiveMode(null);
      return;
    }

    setActiveMode(mode);
    let newDrawInstance;

    switch (mode) {
      case 'measure':
        newDrawInstance = new L.Draw.Polyline(map, {
          shapeOptions: {
            color: '#3B82F6',
            weight: 3
          },
          metric: true,
          showLength: true,
          guidelineDistance: 10
        });
        break;
      case 'polygon':
        newDrawInstance = new L.Draw.Polygon(map, {
          allowIntersection: false,
          shapeOptions: {
            color: '#3B82F6',
            fillColor: '#3B82F6',
            fillOpacity: 0.2,
            weight: 2
          },
          showArea: true,
          metric: true,
          guidelineDistance: 10,
          snapDistance: 20,
          touchRadius: 20,
          completionRadius: 20
        });
        break;
      case 'rectangle':
        newDrawInstance = new L.Draw.Rectangle(map, {
          shapeOptions: {
            color: '#3B82F6',
            fillColor: '#3B82F6',
            fillOpacity: 0.2,
            weight: 2
          }
        });
        break;
      case 'circle':
        newDrawInstance = new L.Draw.Circle(map, {
          shapeOptions: {
            color: '#3B82F6',
            fillColor: '#3B82F6',
            fillOpacity: 0.2,
            weight: 2
          },
          showRadius: true,
          metric: true,
          feet: false,
          repeatMode: false
        });
        break;
    }

    if (newDrawInstance) {
      setDrawInstance(newDrawInstance);
      newDrawInstance.enable();
    }
  };

  const handleClear = () => {
    if (drawnItems) {
      drawnItems.clearLayers();
      setMeasurements({ distance: 0, area: 0 });
    }
    if (drawInstance) {
      drawInstance.disable();
    }
    setActiveMode(null);
  };

  return (
    <>
      <div className="absolute top-20 left-4 bg-white rounded-lg shadow-md p-2 z-[400]">
        <div className="flex flex-col space-y-2">
          <Button
            variant={activeMode === 'measure' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleModeChange('measure')}
            title="Medir Distancia"
          >
            <Ruler className="w-4 h-4" />
          </Button>

          <Button
            variant={activeMode === 'polygon' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleModeChange('polygon')}
            title="Dibujar Polígono"
          >
            <Pencil className="w-4 h-4" />
          </Button>

          <Button
            variant={activeMode === 'rectangle' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleModeChange('rectangle')}
            title="Dibujar Rectángulo"
          >
            <Square className="w-4 h-4" />
          </Button>

          <Button
            variant={activeMode === 'circle' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleModeChange('circle')}
            title="Dibujar Círculo"
          >
            <Circle className="w-4 h-4" />
          </Button>

          <div className="border-t border-gray-200 my-2" />

          <Button
            variant="secondary"
            size="sm"
            onClick={handleClear}
            title="Limpiar"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {(measurements.distance > 0 || measurements.area > 0) && (
        <div className="absolute bottom-20 left-4 bg-white rounded-lg shadow-md p-4 z-[400]">
          <h3 className="font-semibold mb-2">Mediciones</h3>
          {measurements.distance > 0 && (
            <p className="text-sm">Distancia: {measurements.distance.toFixed(2)} km</p>
          )}
          {measurements.area > 0 && (
            <p className="text-sm">Área: {measurements.area.toFixed(2)} ha</p>
          )}
        </div>
      )}
    </>
  );
}

export default function MapToolbar() {
  return <MapToolbarContent />;
}
