'use client'
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Drone } from '../../types/drones'
import { useStore } from '../../lib/store/store'
import L from 'leaflet'

// Corregir el problema de los iconos de Leaflet
const icon = L.icon({
  iconUrl: '/images/drone-marker.png', // Asegúrate de tener esta imagen
  iconSize: [25, 25],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
})

interface MapViewProps {
  drones: Drone[]
  center?: [number, number]
  zoom?: number
}

export default function MapView({ 
  drones, 
  center = [-17.7833, -63.1667], 
  zoom = 12 
}: MapViewProps) {
  const { setSelectedDrone } = useStore()

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full"
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {drones.map((drone) => (
        <Marker
          key={drone.id}
          position={[drone.ubicacion.lat, drone.ubicacion.lng]}
          icon={icon}
          eventHandlers={{
            click: () => setSelectedDrone(drone),
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{drone.nombre}</h3>
              <p className="text-sm text-gray-600">Batería: {drone.bateria}%</p>
              <p className="text-sm text-gray-600">
                Semillas: {drone.semillasRestantes}/{drone.capacidadSemillas}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
