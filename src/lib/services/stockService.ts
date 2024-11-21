import { StockMovement, StockSummary } from '@/types/stock';

export const stockService = {
  async getMovements(semillaId: string): Promise<StockMovement[]> {
    // Simular llamada a API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            semillaId,
            tipo: 'entrada',
            cantidad: 1000,
            fecha: new Date().toISOString(),
            motivo: 'Compra inicial',
            usuario: 'Juan Pérez',
            lote: 'LOT-001',
            proveedor: 'Semillas SA'
          },
          // Más movimientos...
        ]);
      }, 1000);
    });
  },

  async createMovement(data: Partial<StockMovement>): Promise<StockMovement> {
    // Simular llamada a API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          fecha: new Date(),
          usuario: 'Usuario Actual',
          ...data,
        } as StockMovement);
      }, 500);
    });
  },

  async getStockSummary(semillaId: string): Promise<StockSummary> {
    // Simular llamada a API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          disponible: 1500,
          reservado: 300,
          enTransito: 200,
          perdidas: 50
        });
      }, 500);
    });
  }
};
