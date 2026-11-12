import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = 'public/assets';
mkdirSync(OUT, { recursive: true });

const src = 'avatar-3d.jpg';
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const rgba = Buffer.from(data);

const visited = new Uint8Array(width * height);
const queue = new Int32Array(width * height);
let head = 0;
let tail = 0;

const isDarkBg = (idx) => {
  const o = idx * channels;
  return rgba[o] < 18 && rgba[o + 1] < 18 && rgba[o + 2] < 18;
};

const enqueue = (x, y) => {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const idx = y * width + x;
  if (visited[idx]) return;
  if (isDarkBg(idx)) {
    visited[idx] = 1;
    queue[tail++] = idx;
  }
};

for (let x = 0; x < width; x++) {
  enqueue(x, 0);
  enqueue(x, height - 1);
}
for (let y = 0; y < height; y++) {
  enqueue(0, y);
  enqueue(width - 1, y);
}

while (head < tail) {
  const idx = queue[head++];
  const x = idx % width;
  const y = (idx - x) / width;
  enqueue(x + 1, y);
  enqueue(x - 1, y);
  enqueue(x, y + 1);
  enqueue(x, y - 1);
}

for (let i = 0; i < width * height; i++) {
  if (visited[i]) {
    rgba[i * channels + 3] = 0;
  } else {
    const x = i % width;
    const y = (i - x) / width;
    const touchesBg =
      (x > 0 && visited[i - 1]) ||
      (x < width - 1 && visited[i + 1]) ||
      (y > 0 && visited[i - width]) ||
      (y < height - 1 && visited[i + width]);
    if (touchesBg) {
      const o = i * channels;
      const lum = (rgba[o] + rgba[o + 1] + rgba[o + 2]) / 3;
      if (lum < 32) rgba[o + 3] = Math.round((lum / 32) * 200);
    }
  }
}

const cutout = await sharp(rgba, { raw: { width, height, channels } }).png().toBuffer();

for (const w of [1100, 720, 420]) {
  await sharp(cutout).resize({ width: w }).webp({ quality: 88, alphaQuality: 92 }).toFile(`${OUT}/portrait-${w}.webp`);
}

const portrait = await sharp(cutout).resize({ height: 600 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#07070a' } })
  .composite([
    {
      input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs><radialGradient id="g" cx="78%" cy="45%" r="45%"><stop offset="0" stop-color="#e5132b" stop-opacity="0.45"/><stop offset="1" stop-color="#e5132b" stop-opacity="0"/></radialGradient></defs>
        <rect width="1200" height="630" fill="url(#g)"/>
      </svg>`),
    },
    { input: portrait, gravity: 'southeast' },
    {
      input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <text x="72" y="300" font-family="Impact, 'Arial Narrow', sans-serif" font-size="128" fill="#f4f1ec" letter-spacing="4">SARANSH</text>
        <text x="78" y="352" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="26" fill="#ff3d5a" letter-spacing="16">THE SERIES</text>
        <text x="78" y="420" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="18" fill="#a7a6ad" letter-spacing="5">SOFTWARE DEVELOPER • PYTHON &amp; FLASK • WEB CRAFT</text>
      </svg>`),
    },
  ])
  .jpeg({ quality: 85 })
  .toFile(`${OUT}/og-image.jpg`);

console.log('Clean transparent realistic portrait assets built!');
