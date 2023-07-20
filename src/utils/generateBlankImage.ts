import { createCanvas } from 'canvas';
import * as fs from 'fs';

interface generateAndSaveImageProps {
  /**
   * Folder where save your file
   */
  folderPath: string;
  fileName: string;
  width: number;
  height: number;
}

/**
 * generate images for tests
 */
export function generateAndSaveImage({
  fileName,
  folderPath,
  height,
  width,
}: generateAndSaveImageProps) {
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');
  context.fillStyle = 'white';
  context.fillRect(0, 0, width, height);

  const dataUrl = canvas.toDataURL().split(';base64,').pop() || '';
  const imageData = Buffer.from(dataUrl, 'base64');

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const filePath = `${folderPath}/${fileName}`;
  fs.writeFileSync(filePath, imageData);
}
