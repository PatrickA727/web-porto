// One-off: convert project screenshots to WebP to shrink modal payloads.
// Walks public/projects/**, writes a .webp next to each PNG/JPG (max 1280px
// wide, quality 80). Re-runnable; skips up-to-date outputs.
//
// Usage: node scripts/convert-images.mjs

import { readdir, stat } from 'node:fs/promises';
import { join, extname, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'projects');
const SRC_EXT = new Set(['.png', '.jpg', '.jpeg']);
const MAX_WIDTH = 1280;
const QUALITY = 80;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (SRC_EXT.has(extname(entry.name).toLowerCase())) {
      await convert(full);
    }
  }
}

async function convert(src) {
  const out = join(dirname(src), basename(src, extname(src)) + '.webp');
  try {
    const [s, o] = await Promise.all([stat(src), stat(out).catch(() => null)]);
    if (o && o.mtimeMs >= s.mtimeMs) {
      console.log(`skip  ${out} (up to date)`);
      return;
    }
  } catch {
    /* fall through to conversion */
  }
  await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  console.log(`write ${out}`);
}

await walk(ROOT);
console.log('done.');
