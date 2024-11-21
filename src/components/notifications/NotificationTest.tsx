'use client'

import { showNotification } from './MapNotification';

export const NotificationTest = () => {
  const testNotifications = () => {
    // Probar success
    showNotification({
      message: 'Operación completada con éxito',
      type: 'success'
    });

    // Probar error después de 1 segundo
    setTimeout(() => {
      showNotification({
        message: 'Ha ocurrido un error',
        type: 'error'
      });
    }, 1000);

    // Probar warning después de 2 segundos
    setTimeout(() => {
      showNotification({
        message: 'Advertencia: batería baja en drone',
        type: 'warning'
      });
    }, 2000);

    // Probar info después de 3 segundos
    setTimeout(() => {
      showNotification({
        message: 'Nueva actualización disponible',
        type: 'info'
      });
    }, 3000);
  };

  return (
    <div className="absolute top-4 left-4 z-[1000] space-y-2">
      <button
        onClick={() => showNotification({ message: 'Prueba de éxito', type: 'success' })}
        className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md block"
      >
        Probar Success
      </button>

      <button
        onClick={() => showNotification({ message: 'Prueba de error', type: 'error' })}
        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md block"
      >
        Probar Error
      </button>

      <button
        onClick={() => showNotification({ message: 'Prueba de advertencia', type: 'warning' })}
        className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md block"
      >
        Probar Warning
      </button>

      <button
        onClick={() => showNotification({ message: 'Prueba de info', type: 'info' })}
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md block"
      >
        Probar Info
      </button>

      <button
        onClick={testNotifications}
        className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-md block"
      >
        Probar Todas
      </button>
    </div>
  );
};
