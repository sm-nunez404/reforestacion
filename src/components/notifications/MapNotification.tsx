'use client'

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const showNotification = ({ message, type, duration = 3000 }: NotificationProps) => {
  const notification = document.createElement('div');
  notification.className = `
    fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg z-[9999]
    ${type === 'success' ? 'bg-green-500 text-white' :
      type === 'error' ? 'bg-red-500 text-white' :
      type === 'warning' ? 'bg-yellow-500 text-white' :
      'bg-blue-500 text-white'}
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, duration);
};

export default showNotification;