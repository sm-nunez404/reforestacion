export type TerrainClass = 
  | 'AnnualCrop'
  | 'Forest'
  | 'HerbaceousVegetation'
  | 'Highway'
  | 'Industrial'
  | 'Pasture'
  | 'PermanentCrop'
  | 'Residential'
  | 'River'
  | 'SeaLake';

export type SegmentationClass =
  | 'agricultural land'
  | 'bare soil'
  | 'brushwood'
  | 'building'
  | 'clear cut'
  | 'coniferous'
  | 'deciduous'
  | 'greenhouse'
  | 'herbaceous vegetation'
  | 'impervious surface'
  | 'ligneous'
  | 'pervious surface'
  | 'plowed land'
  | 'snow'
  | 'swimming pool'
  | 'vineyard'
  | 'water';

export interface AnalysisResult {
  type: 'classification' | 'segmentation';
  predictions: {
    class: TerrainClass | SegmentationClass;
    confidence: number;
    bbox?: [number, number, number, number]; // [x, y, width, height]
  }[];
  processedImage?: string; // URL de la imagen procesada
  timestamp: Date;
}

export interface AnalysisOptions {
  modelType: 'classification' | 'segmentation';
  confidenceThreshold?: number;
  overlayResults?: boolean;
}
