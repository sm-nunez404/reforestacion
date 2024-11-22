export interface AIModel {
  id: string;
  name: string;
  type: 'classification' | 'segmentation';
  description: string;
  inputSize: [number, number]; // [width, height]
  numClasses: number;
  framework: 'keras' | 'pytorch';
  version: string;
}

export interface ModelConfig {
  modelPath: string;
  weightsPath?: string;
  classLabels: string[];
  inputSize: [number, number];
}
