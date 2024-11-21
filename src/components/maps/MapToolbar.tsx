'use client'

import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import { Button } from '@/components/ui/Button';
import { Ruler, Pencil, Square, Circle, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { DrawnArea } from '@/types/map';
import AreaForm from './AreaForm';

interface MapToolbarProps {
  onNewArea: (newArea: DrawnArea) => void;
}

function MapToolbarContent({ onNewArea }: MapToolbarProps) {
  const map = useMap() as L.DrawMap; // Asegurarse de que el mapa sea del tipo correcto
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [drawnItems, setDrawnItems] = useState<L.FeatureGroup | null>(null);
  const [drawInstance, setDrawInstance] = useState<any>(null);
  const [measurements, setMeasurements] = useState<{ distance: number; area: number }>({ distance: 0, area: 0 });
  const [drawnAreas, setDrawnAreas] = useState<DrawnArea[]>([]);
  const [showAreaForm, setShowAreaForm] = useState(false);
  const [tempLayer, setTempLayer] = useState<L.Layer | null>(null);

  useEffect(() => {
    if (!map) return;

    const newDrawnItems = new L.FeatureGroup();
    map.addLayer(newDrawnItems);
    setDrawnItems(newDrawnItems);

    map.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer;
      setTempLayer(layer);
      setShowAreaForm(true);

      if (e.layerType === 'polygon' || e.layerType === 'rectangle') {
        const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0] as L.LatLngLiteral[]) / 10000;
        setMeasurements(prev => ({ ...prev, area }));
      } else if (e.layerType === 'polyline') {
        const distance = layer.getDistance();
        setMeasurements(prev => ({ ...prev, distance: distance / 1000 }));
      } else if (e.layerType === 'circle') {
        const radius = layer.getRadius();
        const area = Math.PI * Math.pow(radius, 2) / 10000;
        setMeasurements(prev => ({ ...prev, area }));
      }

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
          guidelineDistance: 10
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

  const calculateArea = (layer: L.Layer) => {
    if (layer instanceof L.Polygon) {
      return L.GeometryUtil.geodesicArea(layer.getLatLngs()[0] as L.LatLngLiteral[]) / 10000;
    }
    if (layer instanceof L.Circle) {
      return Math.PI * Math.pow(layer.getRadius(), 2) / 10000;
    }
    return 0;
  };

  const calculatePerimeter = (layer: L.Layer) => {
    if (layer instanceof L.Polygon) {
      const latlngs = layer.getLatLngs()[0] as L.LatLngLiteral[];
      let perimeter = 0;
      for (let i = 0; i < latlngs.length - 1; i++) {
        perimeter += L.latLng(latlngs[i]).distanceTo(L.latLng(latlngs[i + 1]));
      }
      return perimeter;
    }
    if (layer instanceof L.Circle) {
      return 2 * Math.PI * layer.getRadius();
    }
    return 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completada':
        return 'text-green-600';
      case 'en_proceso':
        return 'text-yellow-600';
      case 'pendiente':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const createPopupContent = (area: DrawnArea) => {
    const getProgressColor = (progress: number) => {
      if (progress >= 75) return 'bg-green-500';
      if (progress >= 50) return 'bg-yellow-500';
      if (progress >= 25) return 'bg-orange-500';
      return 'bg-red-500';
    };

    return `
      <div class="p-4 min-w-[300px]">
        <h3 class="font-semibold text-lg mb-2">${area.properties.name}</h3>
        ${area.properties.description ? 
          `<p class="text-gray-600 mb-3 text-sm">${area.properties.description}</p>` : ''}
        
        <div class="space-y-3">
          <div>
            <div class="flex justify-between items-center mb-1">
              <span class="text-sm font-medium">Progreso</span>
              <span class="text-sm font-medium">${area.properties.progress || 0}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="${getProgressColor(area.properties.progress || 0)} h-2 rounded-full" 
                   style="width: ${area.properties.progress || 0}%">
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="font-medium block text-gray-500">Superficie</span>
              <span class="text-base">${area.properties.area.toFixed(2)} ha</span>
            </div>
            <div>
              <span class="font-medium block text-gray-500">Semillas</span>
              <span class="text-base">${area.properties.seedsPlanted || 0}</span>
            </div>
          </div>

          <div class="pt-2 border-t border-gray-200 mt-2">
            <div class="flex items-center justify-between">
              <div>
                <span class="font-medium text-sm text-gray-500">Estado</span>
                <span class="ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                  area.properties.status === 'completada' ? 'bg-green-100 text-green-800' :
                  area.properties.status === 'en_proceso' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }">
                  ${area.properties.status.replace('_', ' ')}
                </span>
              </div>
              <button class="text-blue-500 hover:text-blue-700 text-sm font-medium">
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const getAreaColor = (status: string) => {
    switch (status) {
      case 'completada':
        return '#22c55e'; // verde más brillante
      case 'en_proceso':
        return '#fbbf24'; // amarillo más brillante
      case 'pendiente':
        return '#ef4444'; // rojo más brillante
      default:
        return '#3b82f6';
    }
  };

  const handleAreaFormSubmit = (formData: Partial<DrawnArea['properties']>) => {
    if (!tempLayer) return;

    const status = formData.status || 'pendiente';
    const areaColor = getAreaColor(status);

    (tempLayer as L.Path).setStyle({
      color: areaColor,
      fillColor: areaColor,
      fillOpacity: 0.2,
      weight: 2
    });

    const newArea: DrawnArea = {
      id: uuidv4(),
      type: tempLayer instanceof L.Polygon ? 'polygon' : 
            tempLayer instanceof L.Rectangle ? 'rectangle' : 'circle',
      coordinates: tempLayer instanceof L.Polygon ? (tempLayer.getLatLngs() as L.LatLngLiteral[][]) :
                  tempLayer instanceof L.Circle ? {
                    center: tempLayer.getLatLng(),
                    radius: tempLayer.getRadius()
                  } : (tempLayer as L.Polygon).getLatLngs() as L.LatLngLiteral[],
      properties: {
        name: formData.name || 'Área sin nombre',
        description: formData.description,
        status: status,
        area: calculateArea(tempLayer),
        perimeter: calculatePerimeter(tempLayer),
        progress: formData.progress || 0,
        seedsPlanted: formData.seedsPlanted || 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    };

    setDrawnAreas(prev => [...prev, newArea]);
    onNewArea(newArea); // Llamar a onNewArea con el área nueva
    
    if (drawnItems && tempLayer) {
      const popup = L.popup().setContent(createPopupContent(newArea));
      tempLayer.bindPopup(popup);
      drawnItems.addLayer(tempLayer);
      tempLayer.openPopup();
      if (tempLayer instanceof L.Polygon || tempLayer instanceof L.Rectangle) {
        map.fitBounds(tempLayer.getBounds());
      }
    }

    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-[9999]';
    notification.textContent = 'Área guardada correctamente';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);

    setTempLayer(null);
    setShowAreaForm(false);
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

      {showAreaForm && (
        <AreaForm
          isOpen={showAreaForm}
          onClose={() => {
            setShowAreaForm(false);
            setTempLayer(null);
          }}
          onSubmit={handleAreaFormSubmit}
          initialArea={tempLayer ? calculateArea(tempLayer) : undefined}
        />
      )}
    </>
  );
}

function MapToolbar({ onNewArea }: MapToolbarProps) {
  return <MapToolbarContent onNewArea={onNewArea} />;
}

export default MapToolbar;