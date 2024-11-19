export interface Semilla {
  id: string;
  nombre?: string;
  especie: string;
  nombreComun: string;
  stock: number;
  tasaGerminacion: number;
  tiempoGerminacion: number;
  profundidadSiembra: number;
  condicionesOptimas: {
    temperatura: {
      min: number;
      max: number;
    };
    humedad: {
      min: number;
      max: number;
    };
    tipoSuelo: string[];
  };
  espaciamiento: number;
  temporadaSiembra: string[];
  // Agrega aquí otras propiedades necesarias para las semillas
}

export interface SemillaStats {
  totalEspecies: number;
  totalSemillas: number;
  tasaExitoPromedio: number;
  stockBajo: number;
}
