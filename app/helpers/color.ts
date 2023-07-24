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
