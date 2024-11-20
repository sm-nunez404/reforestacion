'use client'

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap as useMapStore } from '@/lib/hooks/useMap';
import MapControls from './MapControls';
import MapLegend from './MapLegend';
import MapToolbar from './MapToolbar';
import MissionPlanner from '../operations/MissionPlanner';
import FlightPath from '../operations/FlightPath';
import L from 'leaflet';
import { useStore } from '../../lib/store/store'

// Coordenadas de Santa Cruz, Bolivia
const SANTA_CRUZ_COORDS: [number, number] = [-17.7863, -63.1812];

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
    case 'completada': return 'green';
    case 'en_proceso': return 'yellow';
    case 'pendiente': return 'red';
    default: return 'gray';
  }
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

export default function MapPreview({ 
  center = SANTA_CRUZ_COORDS,
  zoom = 13 
}: MapPreviewProps) {
  const { areas, drones, layers, toggleLayer } = useMapStore();
  const [missionPath, setMissionPath] = useState<[number, number][]>([]);
  const [isPlanning, setIsPlanning] = useState(false);
  const { setSelectedDrone } = useStore();

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    if (isPlanning) {
      setMissionPath(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
    }
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        eventHandlers={{
          click: handleMapClick
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapController />
        
        {/* Áreas de reforestación */}
        {layers.areas && areas.map((area) => (
          <Polygon
            key={area.id}
            positions={area.poligono.map(p => [p.lat, p.lng])}
            pathOptions={{
              color: getAreaColor(area.tipo),
              fillOpacity: 0.3,
              weight: 2
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{area.nombre}</h3>
                <p>Progreso: {area.progreso}%</p>
                <p>Superficie: {area.superficie} ha</p>
                <p>Semillas plantadas: {area.semillasPlantadas}</p>
              </div>
            </Popup>
          </Polygon>
        ))}

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
        <MapToolbar />
      </MapContainer>

      <MapControls onLayerToggle={toggleLayer} />
      <MapLegend />
      
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
    </div>
  );
}
