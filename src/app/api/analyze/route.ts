import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Guardar el archivo temporalmente
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempPath = path.join(process.cwd(), 'public/temp', file.name);
    await fs.promises.writeFile(tempPath, buffer);

    // Ejecutar el modelo
    const scriptPath = path.join(process.cwd(), 'src/lib/ai/scripts/run_model.py');
    
    return new Promise((resolve) => {
      const pythonProcess = spawn('venv/bin/python', [
        scriptPath,
        '--input', tempPath,
        '--type', 'image'
      ]);

      let output = '';
      let error = '';

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
        console.log('Python output:', data.toString());
      });

      pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
        console.error('Python error:', data.toString());
      });

      pythonProcess.on('close', (code) => {
        // Limpiar archivo temporal
        fs.unlinkSync(tempPath);

        if (code !== 0) {
          resolve(NextResponse.json(
            { error: `Process failed: ${error}` },
            { status: 500 }
          ));
        } else {
          try {
            // Buscar la línea que contiene el JSON en la salida
            const jsonLine = output.split('\n').find(line => line.trim().startsWith('{'));
            if (jsonLine) {
              const results = JSON.parse(jsonLine);
              resolve(NextResponse.json(results));
            } else {
              resolve(NextResponse.json({
                success: false,
                error: 'No se encontraron resultados válidos'
              }));
            }
          } catch (e) {
            resolve(NextResponse.json({
              success: false,
              error: 'Error al procesar los resultados'
            }));
          }
        }
      });
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}