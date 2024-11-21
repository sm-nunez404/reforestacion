'use client'

import { useEffect, useState } from 'react';
import * as turf from '@turf/turf';

interface PolygonPoint {
  lat: number;
  lng: number;
}

interface Area {
  poligono: PolygonPoint[];
  tipo: 'completada' | 'en_proceso' | 'pendiente';
}

interface AreaStats {
  totalArea: number;
  completedArea: number;
  inProgressArea: number;
  pendingArea: number;
  completionRate: number;
}

export const calculateAreaStats = (areas: Area[]): AreaStats => {
  const stats = areas.reduce((acc, area) => {
    const polygon = turf.polygon([area.poligono.map((p: PolygonPoint) => [p.lng, p.lat])]);
    const areaSize = turf.area(polygon) / 10000; // Convertir a hectáreas

    return {
      totalArea: acc.totalArea + areaSize,
      completedArea: area.tipo === 'completada' ? acc.completedArea + areaSize : acc.completedArea,
      inProgressArea: area.tipo === 'en_proceso' ? acc.inProgressArea + areaSize : acc.inProgressArea,
      pendingArea: area.tipo === 'pendiente' ? acc.pendingArea + areaSize : acc.pendingArea,
      completionRate: 0
    };
  }, {
    totalArea: 0,
    completedArea: 0,
    inProgressArea: 0,
    pendingArea: 0,
    completionRate: 0
  });

  stats.completionRate = (stats.completedArea / stats.totalArea) * 100;
  return stats;
};

export default calculateAreaStats;