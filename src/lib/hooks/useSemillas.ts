'use client'

import { useState, useEffect } from 'react';
import { Semilla } from '@/types/semillas';
import { semillaService } from '../services/semillaService';

export function useSemillas() {
  const [semillas, setSemillas] = useState<Semilla[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSemillas = async () => {
    try {
      setLoading(true);
      const data = await semillaService.getSemillas();
      setSemillas(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las semillas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createSemilla = async (data: Partial<Semilla>) => {
    try {
      const newSemilla = await semillaService.createSemilla(data);
      setSemillas(prev => [...prev, newSemilla]);
      return newSemilla;
    } catch (err) {
      setError('Error al crear la semilla');
      throw err;
    }
  };

  const updateSemilla = async (id: string, data: Partial<Semilla>) => {
    try {
      const updatedSemilla = await semillaService.updateSemilla(id, data);
      setSemillas(prev => 
        prev.map(semilla => 
          semilla.id === id ? updatedSemilla : semilla
        )
      );
      return updatedSemilla;
    } catch (err) {
      setError('Error al actualizar la semilla');
      throw err;
    }
  };

  const deleteSemilla = async (id: string) => {
    try {
      await semillaService.deleteSemilla(id);
      setSemillas(prev => prev.filter(semilla => semilla.id !== id));
    } catch (err) {
      setError('Error al eliminar la semilla');
      throw err;
    }
  };

  useEffect(() => {
    loadSemillas();
  }, []);

  return {
    semillas,
    loading,
    error,
    refresh: loadSemillas,
    createSemilla,
    updateSemilla,
    deleteSemilla
  };
}
