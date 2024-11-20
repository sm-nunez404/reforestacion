import { useMap } from 'react-leaflet';

export default function MiniMap() {
  const map = useMap();

  return (
    <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md overflow-hidden z-[1000]">
      <div className="w-48 h-48">
        {/* Implementar mini mapa aquí */}
      </div>
    </div>
  );
}
