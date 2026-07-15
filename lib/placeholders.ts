// Procedural placeholder tiles — gradient backgrounds keyed by index.
// Swap with your own imagery in /public when ready.

const palettes = [
  ["#ff8400", "#fecc33"],
  ["#21935b", "#0e4d2f"],
  ["#6b4e8c", "#2b1d3d"],
  ["#c9a86a", "#5a4220"],
  ["#4a7c8c", "#1d3640"],
  ["#c0392b", "#4a1010"],
  ["#1a1a1a", "#3a3a3a"],
  ["#e8e6e1", "#9b9890"],
  ["#0e1b3a", "#26447a"],
  ["#b9d2cd", "#4a7066"],
];

export function tile(i: number) {
  const [a, b] = palettes[i % palettes.length];
  return `linear-gradient(135deg, ${a} 0%, ${b} 100%)`;
}

export const tiles = Array.from({ length: 24 }, (_, i) => tile(i));
