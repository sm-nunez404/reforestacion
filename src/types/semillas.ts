export interface Semilla {
  id: string;
  nombre: string;
  especie: string;
  nombreComun: string;
  stock: number;
  tasaGerminacion: number;
  tiempoGerminacion: number;
  profundidadSiembra: number;
  espaciamiento: number;
  temporadaSiembra: string[];
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
  origen: string;
  usos: string[];
  fechaCosecha: string;
  proveedor: string;
  estadoConservacion: string;
  metodoAlmacenamiento: string;
  resistenciaPlagasEnfermedades: string;
  requisitosRiego: string;
  velocidadCrecimiento: string;
  alturaMaxima: number;
  compatibilidadEcologica: string;
  observacionesAdicionales: string;
  epocaSiembra: {
    inicio: string;
    fin: string;
  };
  fechaRecoleccion: string;
  fechaVencimiento: string;
  imagenes: {
    semilla: string;
    planta: string;
  };
}

export interface SemillaStats {
  totalEspecies: number;
  totalSemillas: number;
  tasaExitoPromedio: number;
  stockBajo: number;
}
