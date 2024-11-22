import torch
from ultralytics import YOLO
import cv2
import os
import json
from dotenv import load_dotenv
import argparse

load_dotenv()

class ModelRunner:
    def __init__(self):
        self.model_path = os.getenv('MODEL_PATH', 'public/models/modelofinal.pt')
        self.model = None

    def load_model(self):
        try:
            self.model = YOLO(self.model_path)
            print("Modelo cargado exitosamente")
            return True
        except Exception as e:
            print(f"Error al cargar el modelo: {e}")
            return False

    def process_image(self, image_path, conf=0.25):
        if not self.model:
            return None

        try:
            results = self.model.predict(
                source=image_path,
                conf=conf,
                save=True
            )
            
            # Formatear resultados para JSON
            formatted_results = []
            for result in results:
                masks = result.masks
                boxes = result.boxes
                
                if masks and boxes:
                    for i in range(len(masks)):
                        class_id = int(boxes[i].cls[0])
                        detection = {
                            'class': result.names[class_id],  # Debería ser 'forest' o 'deforestation'
                            'confidence': float(boxes[i].conf[0]),
                            'segmentation': {
                                'points': masks[i].xy[0].tolist(),
                                'mask': masks[i].data[0].cpu().numpy().tolist()
                            }
                        }
                        # Imprimir para debug
                        print(f"Detectada clase: {detection['class']} con confianza: {detection['confidence']}")
                        formatted_results.append(detection)
            
            output = {
                'detections': formatted_results,
                'count': len(formatted_results),
                'success': True,
                'image_size': {
                    'width': results[0].orig_img.shape[1],
                    'height': results[0].orig_img.shape[0]
                }
            }
            
            # Imprimir resumen para debug
            print(f"Total detecciones: {len(formatted_results)}")
            class_counts = {}
            for det in formatted_results:
                class_counts[det['class']] = class_counts.get(det['class'], 0) + 1
            print(f"Conteo por clase: {class_counts}")
            
            print(json.dumps(output))
            return output
            
        except Exception as e:
            print(f"Error en process_image: {str(e)}")
            print(json.dumps({
                'error': str(e),
                'success': False
            }))
            return None

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', required=True, help='Ruta de entrada del archivo')
    parser.add_argument('--type', choices=['image', 'video'], required=True)
    args = parser.parse_args()

    runner = ModelRunner()
    if runner.load_model():
        if args.type == 'image':
            runner.process_image(args.input)

if __name__ == "__main__":
    main()