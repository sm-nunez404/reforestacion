export default function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-4 z-[1000]">
      <h3 className="font-semibold mb-3">Leyenda</h3>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-green-500 opacity-70" />
          <span className="text-sm">Área Completada</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500 opacity-70" />
          <span className="text-sm">En Proceso</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-red-500 opacity-70" />
          <span className="text-sm">Pendiente</span>
        </div>

        <div className="border-t border-gray-200 my-2" />
        
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <img 
              src="/images/drones/drone-active.gif" 
              alt="Drone Activo"
              className="w-6 h-6"
            />
          </div>
          <span className="text-sm">Drone Activo</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <img 
              src="/images/drones/drone-maintenance.gif" 
              alt="Drone en Mantenimiento"
              className="w-6 h-6"
            />
          </div>
          <span className="text-sm">Drone en Mantenimiento</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <img 
              src="/images/drones/drone-inactive.gif" 
              alt="Drone Inactivo"
              className="w-6 h-6"
            />
          </div>
          <span className="text-sm">Drone Inactivo</span>
        </div>
      </div>
    </div>
  );
}
