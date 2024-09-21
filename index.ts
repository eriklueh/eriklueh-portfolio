#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execAsync = promisify(exec);

async function createApp(projectName: string) {
  const currentDir = process.cwd();
  const projectDir = path.join(currentDir, projectName);

  try {
    // Crear el directorio del proyecto
    await fs.ensureDir(projectDir);

    // Copiar archivos de template
    await fs.copy(path.join(__dirname, '..', 'template'), projectDir);

    // Cambiar al directorio del proyecto
    process.chdir(projectDir);

    // Instalar dependencias
    console.log('Instalando dependencias...');
    await execAsync('npm install');

    console.log(`Proyecto ${projectName} creado exitosamente!`);
    console.log(`Para comenzar, ejecuta:`);
    console.log(`  cd ${projectName}`);
    console.log(`  npm run dev`);
  } catch (error) {
    console.error('Error al crear el proyecto:', error);
  }
}

const projectName = process.argv[2];

if (!projectName) {
  console.error('Por favor, proporciona un nombre para el proyecto');
  process.exit(1);
}

createApp(projectName);