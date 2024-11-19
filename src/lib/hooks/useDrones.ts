'use client'

import { useState, useEffect } from 'react';
import { Drone } from '@/types/drones';
import { droneService } from '../services/droneService';

export function useDrones() {
  const [drones, setDrones] = useState<Drone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDrones = async () => {
      try {
        setLoading(true);
        const data = await droneService.getDrones();
        setDrones(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los drones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDrones();
  }, []);

  return { drones, loading, error };
}
