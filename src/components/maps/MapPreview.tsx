'use client'

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap as useMapStore } from '@/lib/hooks/useMap';
import MapControls from './MapControls';
import MapLegend from './MapLegend';
import MapToolbar from './MapToolbar';
import { AreaReforestacion } from '@/types/map';
import { Drone } from '@/types/drones';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';

// Coordenadas de Santa Cruz, Bolivia
const SANTA_CRUZ_COORDS: LatLngExpression = [-17.7863, -63.1812];

const createDroneIcon = (estado: string) => {
  return L.divIcon({
    className: `w-4 h-4 rounded-full ${
      estado === 'activo' ? 'bg-green-500' :
      estado === 'inactivo' ? 'bg-gray-500' :
      'bg-red-500'
    }`,
    iconSize: [16, 16]
  });
};

function MapController() {
  const map = useMap();
  const { center, zoom } = useMapStore();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

export default function MapPreview() {
  const { areas, drones, layers, toggleLayer } = useMapStore();

  return (
    <div className="relative h-[600px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={SANTA_CRUZ_COORDS}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        
        <MapController />
        
        {/* Renderizar áreas de reforestación */}
        {layers.areas && areas.map((area: AreaReforestacion) => (
          <Polygon
            key={area.id}
            positions={area.poligono}
            pathOptions={{
              color: area.tipo === 'completada' ? 'green' : 
                     area.tipo === 'en_proceso' ? 'yellow' : 'red',
              fillOpacity: 0.3
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{area.nombre}</h3>
                <p>Progreso: {area.progreso}%</p>
                <p>Superficie: {area.superficie} ha</p>
              </div>
            </Popup>
          </Polygon>
        ))}

        {/* Renderizar drones activos */}
        {layers.drones && drones.map((drone: Drone) => (
          <Marker
            key={drone.id}
            position={[drone.ubicacion.lat, drone.ubicacion.lng]}
            icon={createDroneIcon(drone.estado)}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{drone.nombre}</h3>
                <p>Estado: {drone.estado}</p>
                <p>Batería: {drone.bateria}%</p>
                <p>Semillas: {drone.semillasRestantes}/{drone.capacidadSemillas}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <MapControls onLayerToggle={toggleLayer} />
      <MapLegend />
      <MapToolbar />
    </div>
  );
}
