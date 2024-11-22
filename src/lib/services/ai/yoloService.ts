// src/lib/services/ai/yoloService.ts
import { YOLO } from 'ultralytics';

export class YOLOService {
  private static instance: YOLOService;
  private model: any = null;

  private constructor() {}

  static getInstance(): YOLOService {
    if (!YOLOService.instance) {
      YOLOService.instance = new YOLOService();
    }
    return YOLOService.instance;
  }

  async loadModel(modelPath: string) {
    try {
      this.model = await YOLO(modelPath);
      return true;
    } catch (error) {
      console.error('Error loading YOLO model:', error);
      return false;
    }
  }

  async predict(imageSource: string | File, options = { conf: 0.25, save: true }) {
    if (!this.model) {
      throw new Error('Model not loaded');
    }

    try {
      const results = await this.model.predict(imageSource, options);
      return results;
    } catch (error) {
      console.error('Error during prediction:', error);
      throw error;
    }
  }

  async processVideo(videoSource: string, options = { conf: 0.25, save: true }) {
    if (!this.model) {
      throw new Error('Model not loaded');
    }

    try {
      const results = await this.model.predict(videoSource, {
        ...options,
        stream: true
      });
      return results;
    } catch (error) {
      console.error('Error processing video:', error);
      throw error;
    }
  }
}