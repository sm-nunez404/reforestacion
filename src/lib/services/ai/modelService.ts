import { spawn } from 'child_process';
import path from 'path';

export class ModelService {
  private static instance: ModelService;
  private pythonPath: string;

  private constructor() {
    this.pythonPath = process.platform === 'win32' 
      ? 'venv\\Scripts\\python.exe'
      : 'venv/bin/python';
  }

  static getInstance(): ModelService {
    if (!ModelService.instance) {
      ModelService.instance = new ModelService();
    }
    return ModelService.instance;
  }

  async analyzeImage(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error en el análisis');
      }

      const data = await response.json();
      
      // Log para debugging
      console.log('Received data:', data);
      
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async analyzeVideo(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/analyze-video', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error en el análisis del video');
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}