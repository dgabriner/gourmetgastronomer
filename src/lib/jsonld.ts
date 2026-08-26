import type { GraphNode } from "./graph";
import { kindLabel, rootLabel, rootOf } from "./paths";
import type { PageKind } from "./schema";

const SITE = "https://gourmetgastronomer.com";

export function canonicalUrl(path: string): string {
  const url = new URL(path, SITE);
  return url.href;
}

export function pageTitle(title: string, extras: string[] = []): string {
  return [...extras, title, "Gourmet Gastronomer"].join(" — ");
}

export function breadcrumbJsonLd(
  crumbs: { name: string; url: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: canonicalUrl(crumb.url),
    })),
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gourmet Gastronomer",
    url: SITE,
    description:
      "A working encyclopedia of food: kitchen, formulas, and the places they come from.",
  };
}

export function nodeJsonLd(node: GraphNode): Record<string, unknown> | null {
  const url = canonicalUrl(node.url);
  const data = node.data;
  const base = {
    "@context": "https://schema.org",
    name: data.title,
    description: data.summary,
    url,
  };

  if (data.kind === "recipe") {
    return {
      ...base,
      "@type": "Recipe",
      recipeYield: data.yield,
      recipeIngredient: data.ingredients.map((ingredient) => {
        const name = ingredient.name ?? ingredient.id ?? "";
        return [ingredient.amount, ingredient.prep, name]
          .filter(Boolean)
          .join(" ");
      }),
    };
  }

  if (data.kind === "place") {
    const type =
      data.place_kind === "bakery" ||
      data.place_kind === "restaurant" ||
      data.place_kind === "shop" ||
      data.place_kind === "creamery" ||
      data.place_kind === "winery"
        ? "FoodEstablishment"
        : "Place";
    return {
      ...base,
      "@type": type,
      ...(data.website ? { sameAs: data.website } : {}),
      ...(data.address
        ? {
            address: {
              "@type": "PostalAddress",
              streetAddress: data.address.street,
              addressLocality: data.address.locality,
              addressRegion: data.address.region,
              postalCode: data.address.postal,
              addressCountry: data.address.country,
            },
          }
        : {}),
    };
  }

  if (data.kind === "pathway") {
    return {
      ...base,
      "@type": "LearningResource",
      learningResourceType: "pathway",
      educationalLevel: data.level,
    };
  }

  if (data.kind === "ingredient") {
    return {
      ...base,
      "@type": "DefinedTerm",
      inDefinedTermSet: canonicalUrl("/catalog/ingredients/"),
    };
  }

  if (data.kind === "person") {
    return {
      ...base,
      "@type": "Person",
    };
  }

  return {
    ...base,
    "@type": "TechArticle",
    headline: data.title,
  };
}

export function eyebrowFor(node: GraphNode): string {
  const root = rootOf(node.fileId);
  const parts = [kindLabel(node.data.kind as PageKind)];
  if (root) parts.push(rootLabel(root));
  if (node.data.status === "stub") parts.push("sketch");
  return parts.join(" · ");
}

export function jsonLdScript(data: Record<string, unknown> | null): string {
  if (!data) return "";
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export { SITE };
