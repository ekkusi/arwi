export function hexToRgbA(hex: string, opacity: number = 1) {
  let c;
  if (opacity < 0 || opacity > 1) throw new Error("Opacity must be between 0 and 1");
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join("")}`;
    // @ts-ignore
    // eslint-disable-next-line
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",")},${opacity})`;
  }
  throw new Error(`Bad Hex: ${hex}`);
}

export type RGBAColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export function parseColor(input: string): RGBAColor {
  const rgbaRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/;
  const match = input.match(rgbaRegex);

  if (!match) {
    throw new Error('Invalid color format. Please use the format "rgba(red, green, blue, alpha)"');
  }

  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: parseFloat(match[4]),
  };
}

export function rgbaToString(color: RGBAColor): string {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}

export function blendColors(foregroundColorStr: string, backgroundColorStr: string): RGBAColor {
  const foregroundColor = parseColor(foregroundColorStr);
  const backgroundColor = parseColor(backgroundColorStr);
  const alpha = foregroundColor.a;

  const r = Math.round(alpha * foregroundColor.r + (1 - alpha) * backgroundColor.r);
  const g = Math.round(alpha * foregroundColor.g + (1 - alpha) * backgroundColor.g);
  const b = Math.round(alpha * foregroundColor.b + (1 - alpha) * backgroundColor.b);
  const a = 1; // The resulting color is fully opaque

  return { r, g, b, a };
}
