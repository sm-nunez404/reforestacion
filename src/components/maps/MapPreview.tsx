'use client'

import { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap as useMapStore } from '@/lib/hooks/useMap';
import MapControls from './MapControls';
import MapLegend from './MapLegend';
import MapToolbar from './MapToolbar';
import MissionPlanner from '../operations/MissionPlanner';
import FlightPath from '../operations/FlightPath';
import L from 'leaflet';
import { useStore } from '../../lib/store/store';
import areasData from '@/data/mock/areas.json';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { Drone } from '@/types/drones';
import MapLayerControl from './MapLayerControl';


// Coordenadas de Roboré, Bolivia
const ROBORE_COORDS: [number, number] = [-18.3334, -59.7651];




const createDroneIcon = (estado: string) => {
  const iconUrl = `/images/drones/${
    estado === 'activo' ? 'drone-active' :
    estado === 'en_mantenimiento' ? 'drone-maintenance' :
    'drone-inactive'
  }.gif`;
  
  console.log('Loading drone icon:', iconUrl); // Para debug
  return L.icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    className: 'drone-icon'
  });
};

const getAreaColor = (tipo: string) => {
  switch (tipo) {
    case 'completada': return '#22c55e';
    case 'en_proceso': return '#fbbf24';
    case 'pendiente': return '#ef4444';
    default: return '#3b82f6';
  }
};

const createPopupContent = (area: any) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    if (progress >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Crear un elemento div para el popup
  const container = document.createElement('div');
  container.className = 'p-4 min-w-[300px]';
  
  // Establecer el contenido HTML
  container.innerHTML = `
    <h3 class="font-semibold text-lg mb-2">${area.nombre}</h3>
    ${area.descripcion ? 
      `<p class="text-gray-600 mb-3 text-sm">${area.descripcion}</p>` : ''}
    
    <div class="space-y-3">
      <div>
        <div class="flex justify-between items-center mb-1">
          <span class="text-sm font-medium">Progreso</span>
          <span class="text-sm font-medium">${area.progreso}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="${getProgressColor(area.progreso)} h-2 rounded-full" 
               style="width: ${area.progreso}%">
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="font-medium block text-gray-500">Superficie</span>
          <span class="text-base">${area.superficie} ha</span>
        </div>
        <div>
          <span class="font-medium block text-gray-500">Semillas</span>
          <span class="text-base">${area.semillasPlantadas}</span>
        </div>
      </div>

      <div class="mt-2 text-sm">
        <span class="font-medium text-gray-500">Especies:</span>
        <span class="ml-1">${area.especies.join(', ')}</span>
      </div>

      <div class="pt-2 border-t border-gray-200 mt-2">
        <div class="flex items-center justify-between">
          <div>
            <span class="font-medium text-sm text-gray-500">Estado</span>
            <span class="ml-2 px-2 py-1 text-xs font-medium rounded-full ${
              area.tipo === 'completada' ? 'bg-green-100 text-green-800' :
              area.tipo === 'en_proceso' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }">
              ${area.tipo.replace('_', ' ')}
            </span>
          </div>
          <div class="text-sm text-gray-500">
            Actualizado: ${formatDate(area.ultimaActualizacion)}
          </div>
        </div>
      </div>
    </div>
  `;

  return container;
};

function MapController() {
  const map = useMap();
  const { center, zoom } = useMapStore();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

interface MapPreviewProps {
  center?: [number, number]
  zoom?: number
}

function MapClickHandler({ onMapClick }: { onMapClick: (e: L.LeafletMouseEvent) => void }) {
  useMapEvents({
    click: onMapClick
  });
  return null;
}

export interface MisionActual {
  tipo: string;
  progreso: number;
}

// Modifica la definición del tipo para incluir 'satellite2'
type MapLayerType = 'default' | 'satellite' | 'satellite2' | 'terrain';

// Asegúrate de exportar el tipo si se usa en otros componentes
export type { MapLayerType };

const MAP_LAYERS: Record<MapLayerType, string> = {
  default: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  satellite2: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
};

const MAP_ATTRIBUTIONS = {
  default: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  satellite: '&copy; <a href="https://www.esri.com">Esri</a>',
  terrain: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
};

export default function MapPreview({ 
  center = ROBORE_COORDS,
  zoom = 13 
}: MapPreviewProps) {
  const { drones, layers, toggleLayer } = useMapStore();
  const [missionPath, setMissionPath] = useState<[number, number][]>([]);
  const [isPlanning, setIsPlanning] = useState(false);
  const { setSelectedDrone } = useStore();
  
  const [areas, setAreas] = useLocalStorage('reforestation-areas', areasData.areas);
  const [currentLayer, setCurrentLayer] = useState<MapLayerType>(() => {
    return (localStorage.getItem('preferred-map-layer') || 'default') as MapLayerType;
  });

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    if (isPlanning) {
      setMissionPath(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
    }
  };

  // Función mejorada para guardar nuevas áreas
  const handleNewArea = (newArea: any) => {
    const areaToSave = {
      ...newArea,
      id: `area-${Date.now()}`, // Generar ID único
      fechaInicio: new Date().toISOString(),
      ultimaActualizacion: new Date().toISOString(),
      progreso: newArea.progreso || 0,
      semillasPlantadas: newArea.semillasPlantadas || 0,
      especies: newArea.especies || []
    };

    setAreas(prev => [...prev, areaToSave]);

    // Mostrar notificación de éxito
    const notification = document.createElement('div');
    notification.className = 
      'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-[9999]';
    notification.textContent = 'Área guardada correctamente';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  // Función para actualizar un área existente
  const handleUpdateArea = (areaId: string, updates: Partial<typeof areas[0]>) => {
    setAreas(prev => prev.map(area => 
      area.id === areaId 
        ? { 
            ...area, 
            ...updates, 
            ultimaActualizacion: new Date().toISOString() 
          }
        : area
    ));
  };

  // Función para eliminar un área
  const handleDeleteArea = (areaId: string) => {
    setAreas(prev => prev.filter(area => area.id !== areaId));
  };

  // Función para resetear a los datos originales
  const handleResetAreas = () => {
    if (window.confirm('¿Estás seguro de que quieres restaurar las áreas originales? Se perderán todas las modificaciones.')) {
      setAreas(areasData.areas);
    }
  };

  const handleLayerChange = (layer: string) => {
    setCurrentLayer(layer as MapLayerType);
    localStorage.setItem('preferred-map-layer', layer);
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <MapClickHandler onMapClick={handleMapClick} />
        <TileLayer
          url={MAP_LAYERS[currentLayer as keyof typeof MAP_LAYERS]}
          attribution={MAP_ATTRIBUTIONS[currentLayer as keyof typeof MAP_ATTRIBUTIONS]}
          maxZoom={19}
          tileSize={256}
          className="transition-opacity duration-200"
        />
        
        <MapController />
        
        {/* Áreas de reforestación */}
        {layers.areas && areas.map((area) => {
          // Verificar que el área tiene polígono válido antes de renderizar
          if (!area.poligono || !Array.isArray(area.poligono)) return null;
          
          return (
            <Polygon
              key={area.id}
              positions={area.poligono.map(p => [p.lat, p.lng])}
              pathOptions={{
                color: getAreaColor(area.tipo),
                fillColor: getAreaColor(area.tipo),
                fillOpacity: 0.2,
                weight: 2
              }}
            >
              <Popup>
                <div dangerouslySetInnerHTML={{ __html: createPopupContent(area).outerHTML }} />
              </Popup>
            </Polygon>
          );
        })}

        {/* Drones */}
        {layers.drones && drones.map((drone) => (
          <Marker
            key={drone.id}
            position={[drone.ubicacion.lat, drone.ubicacion.lng]}
            icon={createDroneIcon(drone.estado)}
            eventHandlers={{
              click: () => setSelectedDrone(drone),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{drone.nombre}</h3>
                <p>Estado: {drone.estado}</p>
                <p>Batería: {drone.bateria}%</p>
                <p>Semillas: {drone.semillasRestantes}/{drone.capacidadSemillas}</p>
                {drone.misionActual && (
                  <>
                    <p>Misión: {drone.misionActual.tipo}</p>
                    <p>Progreso: {drone.misionActual.progreso}%</p>
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Ruta de misión */}
        {missionPath.length > 0 && (
          <FlightPath 
            coordinates={missionPath}
            isDraggable={isPlanning}
            onPathUpdate={setMissionPath}
          />
        )}
        <MapToolbar onNewArea={handleNewArea} />
      </MapContainer>

      <MapControls onLayerToggle={toggleLayer} />
      <MapLegend />
      <MapLayerControl 
        currentLayer={currentLayer}
        onLayerChange={handleLayerChange}
      />
      
      {isPlanning && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000]">
          <MissionPlanner 
            onCreateMission={(mission) => {
              console.log('Nueva misión:', mission);
              setIsPlanning(false);
              setMissionPath([]);
            }}
          />
        </div>
      )}

      {/* Añadir botón de reset si lo deseas */}
      <button
        onClick={handleResetAreas}
        className="absolute top-4 right-4 bg-white px-3 py-1 rounded-md shadow-md text-sm z-[1000]"
      >
        Restaurar Áreas Originales
      </button>
    </div>
  );
}