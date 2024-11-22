// src/types/ai/detection.ts
export interface Detection {
    bbox: [number, number, number, number]; // [x, y, width, height]
    class: string;
    confidence: number;
  }
  
  export interface DetectionResult {
    image: string;
    detections: Detection[];
    timestamp: Date;
  }