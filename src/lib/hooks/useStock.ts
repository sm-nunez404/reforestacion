'use client'

import { useState, useEffect } from 'react';
import { StockMovement, StockSummary } from '@/types/stock';
import { stockService } from '../services/stockService';

export function useStock(semillaId: string) {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [summary, setSummary] = useState<StockSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovements = async () => {
    try {
      setLoading(true);
      const data = await stockService.getMovements(semillaId);
      setMovements(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los movimientos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSummary = async () => {
    try {
      const data = await stockService.getStockSummary(semillaId);
      setSummary(data);
    } catch (err) {
      console.error('Error al cargar el resumen de stock:', err);
    }
  };

  const createMovement = async (data: Partial<StockMovement>) => {
    try {
      const newMovement = await stockService.createMovement({
        ...data,
        semillaId
      });
      setMovements(prev => [newMovement, ...prev]);
      await loadSummary(); // Actualizar el resumen después de un nuevo movimiento
      return newMovement;
    } catch (err) {
      setError('Error al crear el movimiento');
      throw err;
    }
  };

  useEffect(() => {
    loadMovements();
    loadSummary();
  }, [semillaId]);

  return {
    movements,
    summary,
    loading,
    error,
    refresh: loadMovements,
    createMovement
  };
}
