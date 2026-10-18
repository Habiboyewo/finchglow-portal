// Relative luminance of a #rrggbb colour, as defined by WCAG
function luminance(hex: string): number {
  const channels = [1, 3, 5].map((start) => {
    const value = parseInt(hex.slice(start, start + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

// Contrast ratio between two #rrggbb colours: 1 (identical) to 21 (black on white)
export function contrastRatio(foreground: string, background: string): number {
  const [lighter, darker] = [
    luminance(foreground),
    luminance(background),
  ].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}