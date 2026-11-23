/** A product tile drawn from its name: our own artwork instead of other shops' images. */
export const tileOf = (name: string): { initials: string; hue: number } => {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.codePointAt(0)!) >>> 0;
  const words = name.replace(/[^\p{L}\p{N} ]/gu, ' ').split(/\s+/).filter(Boolean);
  const initials = (words.length > 1 ? words[0][0] + words[1][0] : (words[0] ?? '?').slice(0, 2)).toUpperCase();
  return { initials, hue: hash % 360 };
};
