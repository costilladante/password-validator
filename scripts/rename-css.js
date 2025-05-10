import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

const files = fs.readdirSync(distDir);
const cssFile = files.find(f => f.endsWith('.css') && f !== 'style.css');

if (cssFile) {
  const from = path.join(distDir, cssFile);
  const to = path.join(distDir, 'style.css');
  fs.renameSync(from, to);
  console.log(`✅ Renamed ${cssFile} → style.css`);
} else {
  console.warn('⚠️ No CSS file found to rename.');
}