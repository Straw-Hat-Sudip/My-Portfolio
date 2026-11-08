const sharp = require('sharp');
const fs = require('fs');

async function build() {
  const { data, info } = await sharp('public/images/sudip-signal.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const cols = 150;
  const rows = 190;

  const hash = (x, y) => {
    const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
    return s - Math.floor(s);
  };

  const getLum = (px, py) => {
    const idx = (py * width + px) * 3;
    return 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
  };

  const points = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const u = c / (cols - 1);
      const v = r / (rows - 1);
      const imgX = Math.min(width - 1, Math.max(0, Math.floor(u * (width - 1))));
      const imgY = Math.min(height - 1, Math.max(0, Math.floor(v * (height - 1))));

      const lum = getLum(imgX, imgY);
      if (lum < 16) continue; // Pure black background: completely discarded

      // Sub-pixel jitter for organic constellation stipple feel
      const jx = (hash(c, r) - 0.5) * 0.40 * (3.2 / cols);
      const jy = (hash(r, c) - 0.5) * 0.40 * (4.0 / rows);

      const px = (u - 0.5) * 3.2 + jx;
      const py = (0.5 - v) * 4.0 + jy;

      // 3D face curvature
      const dx = px / 0.68;
      const dy = (py - 0.35) / 0.88;
      const distFace = Math.sqrt(dx * dx + dy * dy);
      let pz = (hash(c * 2.3, r * 4.1) - 0.5) * 0.03;
      if (distFace < 1.0) {
        pz += Math.cos(distFace * 1.5708) * 0.16 * Math.min(1.0, lum / 120);
      }

      const seed = hash(c * 3.7 + 11.0, r * 5.9 + 17.0);
      const normLum = Math.min(1.0, lum / 255);

      points.push({ px, py, pz, seed, lum: normLum });
    }
  }

  const floats = new Float32Array(points.length * 5);
  for (let i = 0; i < points.length; i++) {
    floats[i * 5 + 0] = points[i].px;
    floats[i * 5 + 1] = points[i].py;
    floats[i * 5 + 2] = points[i].pz;
    floats[i * 5 + 3] = points[i].seed;
    floats[i * 5 + 4] = points[i].lum;
  }

  const b64 = Buffer.from(floats.buffer).toString('base64');

  const tsContent = `// Auto-generated portrait particle dataset
// Contains ${points.length} particles tracing face, hair, neck, and shoulders (0 corner particles)
export const PORTRAIT_PARTICLE_COUNT = ${points.length};

const RAW_BASE64 = "${b64}";

export function getPortraitBuffers(): {
  positions: Float32Array;
  seeds: Float32Array;
  lums: Float32Array;
} {
  const binary = typeof window !== "undefined" ? atob(RAW_BASE64) : Buffer.from(RAW_BASE64, "base64").toString("binary");
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const rawFloats = new Float32Array(bytes.buffer, bytes.byteOffset, len / 4);
  const count = rawFloats.length / 5;

  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const lums = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = rawFloats[i * 5 + 0];
    positions[i * 3 + 1] = rawFloats[i * 5 + 1];
    positions[i * 3 + 2] = rawFloats[i * 5 + 2];
    seeds[i] = rawFloats[i * 5 + 3];
    lums[i] = rawFloats[i * 5 + 4];
  }

  return { positions, seeds, lums };
}
`;

  fs.writeFileSync('src/components/3d/portraitData.ts', tsContent, 'utf-8');
  console.log('Successfully wrote src/components/3d/portraitData.ts with ' + points.length + ' particles.');
}

build();
