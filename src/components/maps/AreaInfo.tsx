interface AreaInfoProps {
  area: {
    nombre: string;
    tipo: string;
    superficie: number;
    progreso: number;
    semillasPlantadas: number;
  } | null;
}

export default function AreaInfo({ area }: AreaInfoProps) {
  if (!area) return null;

  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-4 z-[1000] w-64">
      <h3 className="font-semibold mb-2">{area.nombre}</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Estado:</span>
          <span className="text-sm font-medium">{area.tipo}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Superficie:</span>
          <span className="text-sm font-medium">{area.superficie} ha</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Progreso:</span>
          <span className="text-sm font-medium">{area.progreso}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Semillas:</span>
          <span className="text-sm font-medium">{area.semillasPlantadas}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-green-500 h-2 rounded-full" 
            style={{ width: `${area.progreso}%` }}
          />
        </div>
      </div>
    </div>
  );
}
