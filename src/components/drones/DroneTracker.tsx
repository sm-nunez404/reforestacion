'use client'

import { useEffect, useState } from 'react';
import { Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Drone } from '@/types/drones';

interface DroneTrackingData {
  position: L.LatLng;
  heading: number;
  speed: number;
  altitude: number;
  battery: number;
  seeds: number;
  timestamp: Date;
}

// Función auxiliar para simular movimiento
const simulateMovement = (currentPosition: { lat: number; lng: number }): L.LatLng => {
  const randomLat = currentPosition.lat + (Math.random() - 0.5) * 0.001;
  const randomLng = currentPosition.lng + (Math.random() - 0.5) * 0.001;
  return new L.LatLng(randomLat, randomLng);
};

export const DroneTracker = ({ drone }: { drone: Drone }) => {
  const [trackingData, setTrackingData] = useState<DroneTrackingData[]>([]);
  
  useEffect(() => {
    // Simular actualización en tiempo real
    const interval = setInterval(() => {
      // Aquí iría la lógica real de actualización
      const newPosition = simulateMovement(drone.ubicacion);
      setTrackingData(prev => [...prev, {
        position: newPosition,
        heading: Math.random() * 360,
        speed: 20 + Math.random() * 10,
        altitude: 100 + Math.random() * 50,
        battery: drone.bateria,
        seeds: drone.semillasRestantes,
        timestamp: new Date()
      }]);
    }, 1000);

    return () => clearInterval(interval);
  }, [drone]);

  return (
    <Polyline
      positions={trackingData.map(data => data.position)}
      color="#FF0000"
      weight={2}
      opacity={0.7}
    />
  );
};

export default DroneTracker;