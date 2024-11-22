export class ImageProcessingService {
  static async loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  static async preprocessImage(
    image: HTMLImageElement,
    targetSize: [number, number]
  ): Promise<ImageData> {
    const canvas = document.createElement('canvas');
    canvas.width = targetSize[0];
    canvas.height = targetSize[1];
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('No se pudo obtener el contexto 2D del canvas');
    }

    // Redimensionar y dibujar la imagen
    ctx.drawImage(image, 0, 0, targetSize[0], targetSize[1]);
    
    return ctx.getImageData(0, 0, targetSize[0], targetSize[1]);
  }

  static async visualizeResults(
    originalImage: HTMLImageElement,
    results: any, // Tipado pendiente según el formato de salida de tus modelos
    options: {
      showBoundingBoxes?: boolean;
      showLabels?: boolean;
      confidenceThreshold?: number;
    } = {}
  ): Promise<string> {
    // Por ahora retornamos la imagen original como base64
    // Aquí implementaremos la visualización de resultados más adelante
    const canvas = document.createElement('canvas');
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('No se pudo obtener el contexto 2D del canvas');
    }

    ctx.drawImage(originalImage, 0, 0);
    return canvas.toDataURL('image/png');
  }
}
