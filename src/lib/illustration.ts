export const ILLUSTRATION_NAMES = [
  "loaf",
  "starter",
  "wheat",
  "city",
  "mill",
  "jam",
  "grape",
  "cheese",
  "path",
  "pin",
  "mark",
  "search",
] as const;

export type IllustrationName = (typeof ILLUSTRATION_NAMES)[number];

export const illustrationCaptions: Record<IllustrationName, string> = {
  loaf: "A bâtard with one long score and an ear — the shape used in the teaching country loaf.",
  starter: "A jar of ripe sourdough starter, with a band at the height from the last feeding.",
  wheat: "Wheat heads: the grain behind bread flour, not a specific mill’s variety.",
  city: "Hills, fog, and water — a diagram of San Francisco’s setting, not a photograph of a block.",
  mill: "Millstones: grain is crushed, not a portrait of a named mill.",
  jam: "A jar of fruit preserve set to a gel.",
  grape: "A grape cluster, the fruit behind wine.",
  cheese: "A wheel with a wedge cut, showing paste and rind.",
  path: "A short sequence of steps — how a pathway is meant to be read.",
  pin: "A place mark, used for bakeries and other atlas entries.",
  mark: "Gourmet Gastronomer mark.",
  search: "Search.",
};

export function illustrationFor(
  kind: string,
  tags: string[],
  fileId: string,
): IllustrationName | null {
  const hay = `${fileId} ${tags.join(" ")}`.toLowerCase();

  if (
    hay.includes("jam") ||
    hay.includes("jelly") ||
    hay.includes("marmalade") ||
    hay.includes("pectin") ||
    hay.includes("canning") ||
    hay.includes("strawberry")
  ) {
    return "jam";
  }
  if (
    hay.includes("wine") ||
    hay.includes("grape") ||
    hay.includes("tannin") ||
    hay.includes("napa") ||
    hay.includes("sonoma")
  ) {
    return "grape";
  }
  if (
    hay.includes("cheese") ||
    hay.includes("curd") ||
    hay.includes("affinage") ||
    hay.includes("creamery") ||
    hay.includes("cowgirl") ||
    hay.includes("point-reyes") ||
    hay.includes("coagulation") ||
    hay.includes("rind")
  ) {
    return "cheese";
  }
  if (
    hay.includes("starter") ||
    hay.includes("levain") ||
    fileId === "learn/sourdough"
  ) {
    return "starter";
  }
  if (hay.includes("milling") || fileId.includes("giustos")) {
    return "mill";
  }
  if (hay.includes("wheat") || hay.includes("flour")) {
    return "wheat";
  }
  if (kind === "pathway") return "path";
  if (
    kind === "place" ||
    fileId.startsWith("atlas/") ||
    hay.includes("san-francisco") ||
    hay.includes("bay-area") ||
    hay.includes("ferry")
  ) {
    return "city";
  }
  if (
    kind === "recipe" ||
    hay.includes("bread") ||
    hay.includes("sourdough") ||
    hay.includes("baking") ||
    hay.includes("dough") ||
    hay.includes("gluten") ||
    hay.includes("scoring") ||
    hay.includes("shaping") ||
    hay.includes("proof") ||
    hay.includes("bake")
  ) {
    return "loaf";
  }
  if (kind === "ingredient") return "wheat";
  return null;
}
