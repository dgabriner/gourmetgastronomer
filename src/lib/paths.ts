import { CONTENT_ROOTS, type ContentRoot, type PageKind } from "./schema";

export function parseGgId(id: string): { kind: string; slug: string } | null {
  const match = /^gg:([a-z]+):([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(id);
  if (!match) return null;
  return { kind: match[1], slug: match[2] };
}

export function fileIdToUrl(fileId: string): string {
  const trimmed = fileId.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
  return `/${trimmed}/`;
}

export function urlToFileId(url: string): string {
  return url.replace(/^\/+|\/+$/g, "");
}

export function parentFileId(fileId: string): string | null {
  const parts = fileId.split("/");
  if (parts.length <= 1) return null;
  return parts.slice(0, -1).join("/");
}

export function rootOf(fileId: string): ContentRoot | null {
  const root = fileId.split("/")[0];
  return (CONTENT_ROOTS as readonly string[]).includes(root)
    ? (root as ContentRoot)
    : null;
}

export function kindLabel(kind: PageKind | string): string {
  switch (kind) {
    case "topic":
      return "Topic";
    case "ingredient":
      return "Ingredient";
    case "recipe":
      return "Formula";
    case "place":
      return "Place";
    case "pathway":
      return "Pathway";
    case "person":
      return "Person";
    case "source":
      return "Source";
    default:
      return kind;
  }
}

export function rootLabel(root: ContentRoot): string {
  const labels: Record<ContentRoot, string> = {
    baking: "Baking",
    cheese: "Cheese",
    preserving: "Preserving",
    wine: "Wine",
    ingredients: "Ingredients",
    science: "Science",
    skills: "Skills",
    atlas: "Atlas",
    recipes: "Formulas",
    learn: "Learn",
  };
  return labels[root];
}

export function generateCollectionId(entry: string): string {
  return entry
    .replace(/\\/g, "/")
    .replace(/\/index\.md$/i, "")
    .replace(/\.md$/i, "");
}
