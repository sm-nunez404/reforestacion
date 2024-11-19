export interface StockMovement {
  id: string;
  semillaId: string;
  tipo: 'entrada' | 'salida' | 'ajuste' | 'perdida';
  cantidad: number;
  fecha: Date;
  motivo: string;
  usuario: string;
  lote?: string;
  proveedor?: string;
}

export interface StockSummary {
  disponible: number;
  reservado: number;
  enTransito: number;
  perdidas: number;
}

export interface LoteSemilla {
  id: string;
  semillaId: string;
  numero: string;
  cantidad: number;
  fechaIngreso: Date;
  fechaCaducidad: Date;
  proveedor: string;
  certificacion?: string;
}
