// 3D value-noise used for the drifting stippled background.
// Self-contained, no dependencies.

export interface NoiseField {
  noise3D: (x: number, y: number, z: number) => number;
}

export function createNoiseField(): NoiseField {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const fade = (t: number): number => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number): number => a + t * (b - a);
  const hash = (x: number, y: number, z: number): number =>
    perm[(perm[(perm[x & 255] + y) & 255] + z) & 255] / 255;

  function noise3D(x: number, y: number, z: number): number {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const zi = Math.floor(z);
    const xf = x - xi;
    const yf = y - yi;
    const zf = z - zi;
    const u = fade(xf);
    const v = fade(yf);
    const w = fade(zf);

    const c000 = hash(xi, yi, zi);
    const c100 = hash(xi + 1, yi, zi);
    const c010 = hash(xi, yi + 1, zi);
    const c110 = hash(xi + 1, yi + 1, zi);
    const c001 = hash(xi, yi, zi + 1);
    const c101 = hash(xi + 1, yi, zi + 1);
    const c011 = hash(xi, yi + 1, zi + 1);
    const c111 = hash(xi + 1, yi + 1, zi + 1);

    const x00 = lerp(c000, c100, u);
    const x10 = lerp(c010, c110, u);
    const x01 = lerp(c001, c101, u);
    const x11 = lerp(c011, c111, u);

    return lerp(lerp(x00, x10, v), lerp(x01, x11, v), w);
  }

  return { noise3D };
}
