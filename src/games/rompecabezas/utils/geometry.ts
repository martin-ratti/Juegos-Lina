export const INK = '#3D2645';

/** Genera un contorno festoneado suave (melena de león, nubes, flores o sellos) */
export function scallopPath(
  cx: number,
  cy: number,
  radius: number,
  lobes: number,
  wave: number
): string {
  const parts: string[] = [];
  for (let i = 0; i < lobes; i++) {
    const a1 = (i / lobes) * Math.PI * 2;
    const aMid = ((i + 0.5) / lobes) * Math.PI * 2;
    const a2 = ((i + 1) / lobes) * Math.PI * 2;

    const x1 = cx + Math.cos(a1) * radius;
    const y1 = cy + Math.sin(a1) * radius;
    const xCtrl = cx + Math.cos(aMid) * (radius + wave);
    const yCtrl = cy + Math.sin(aMid) * (radius + wave);
    const x2 = cx + Math.cos(a2) * radius;
    const y2 = cy + Math.sin(a2) * radius;

    if (i === 0) {
      parts.push(`M${x1.toFixed(1)} ${y1.toFixed(1)}`);
    }
    parts.push(`Q${xCtrl.toFixed(1)} ${yCtrl.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);
  }
  return parts.join(' ') + 'Z';
}

/** Genera una estrella simétrica en coordenadas polares */
export function starPath(
  cx: number,
  cy: number,
  points: number,
  outerR: number,
  innerR: number
): string {
  const coords: string[] = [];
  const total = points * 2;
  for (let i = 0; i < total; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    coords.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return coords.join(' ') + 'Z';
}
