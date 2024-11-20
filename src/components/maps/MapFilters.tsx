export default function MapFilters() {
  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-4 z-[1000]">
      <h3 className="font-semibold mb-2">Filtros</h3>
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="rounded" />
          <span className="text-sm">Mostrar áreas completadas</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="rounded" />
          <span className="text-sm">Mostrar áreas en proceso</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="rounded" />
          <span className="text-sm">Mostrar áreas pendientes</span>
        </label>
      </div>
    </div>
  );
}
