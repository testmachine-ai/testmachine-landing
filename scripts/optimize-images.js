#!/usr/bin/env node
/**
 * Converts PNG and JPG images in static/assets/ to WebP format.
 * Run via: npm run optimize-images
 * Skips files that already have an up-to-date WebP counterpart.
 */
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';

const ASSETS_DIR = new URL('../static/assets', import.meta.url).pathname;
const QUALITY = 82; // WebP quality — good balance of size vs fidelity

async function main() {
  const files = await readdir(ASSETS_DIR);
  const targets = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));

  let converted = 0;
  let skipped = 0;

  for (const file of targets) {
    const srcPath = join(ASSETS_DIR, file);
    const webpName = basename(file, extname(file)) + '.webp';
    const destPath = join(ASSETS_DIR, webpName);

    // Skip if WebP already exists and is newer than source
    const srcStat = await stat(srcPath);
    let destStat = null;
    try { destStat = await stat(destPath); } catch { /* not found */ }

    if (destStat && destStat.mtimeMs >= srcStat.mtimeMs) {
      skipped++;
      continue;
    }

    try {
      const info = await sharp(srcPath)
        .webp({ quality: QUALITY })
        .toFile(destPath);
      const saving = ((srcStat.size - info.size) / srcStat.size * 100).toFixed(0);
      console.log(`✓ ${file} → ${webpName}  (${(srcStat.size / 1024).toFixed(0)}KB → ${(info.size / 1024).toFixed(0)}KB, -${saving}%)`);
      converted++;
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
    }
  }

  console.log(`\nDone: ${converted} converted, ${skipped} skipped (already up-to-date).`);
}

main().catch(err => { console.error(err); process.exit(1); });
