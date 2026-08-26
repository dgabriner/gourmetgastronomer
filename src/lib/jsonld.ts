import type { GraphNode } from "./graph";
import { kindLabel, rootLabel, rootOf } from "./paths";
import type { PageKind } from "./schema";

const SITE = "https://gourmetgastronomer.com";

export const CC_BY_40 = "https://creativecommons.org/licenses/by/4.0/";

export const SITE_DESCRIPTION =
  "A source-backed food encyclopedia centered on bread, sourdough, practical kitchen skill, and the San Francisco Bay Area food world.";

/** Real profiles only. Add the Wikidata QID URL once an item exists. */
const ORGANIZATION_SAME_AS: string[] = [
  "https://github.com/dgabriner/gourmetgastronomer",
];

export function canonicalUrl(path: string): string {
  const url = new URL(path, SITE);
  return url.href;
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "Gourmet Gastronomer",
    url: SITE,
    description: SITE_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: canonicalUrl("/logo.svg"),
    },
    ...(ORGANIZATION_SAME_AS.length ? { sameAs: ORGANIZATION_SAME_AS } : {}),
  };
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
    "@id": `${SITE}/#website`,
    name: "Gourmet Gastronomer",
    url: SITE,
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE}/search/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function nodeJsonLd(node: GraphNode): Record<string, unknown> | null {
  const url = canonicalUrl(node.url);
  const data = node.data;
  const base = {
    "@context": "https://schema.org",
    "@id": `${url}#entry`,
    name: data.title,
    description: data.summary,
    url,
    mainEntityOfPage: url,
    isPartOf: { "@id": `${SITE}/#website` },
    author: { "@id": `${SITE}/#organization` },
    publisher: { "@id": `${SITE}/#organization` },
    license: CC_BY_40,
    ...(data.updated ? { dateModified: data.updated } : {}),
    ...(data.tags.length ? { keywords: data.tags.join(", ") } : {}),
  };

  if (data.kind === "recipe") {
    return {
      ...base,
      "@type": "Recipe",
      headline: data.title,
      recipeYield: data.yield,
      recipeIngredient: data.ingredients.map((ingredient) => {
        const name =
          ingredient.name ?? ingredient.id?.split(":").slice(2).join(":") ?? "";
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
      teaches: data.summary,
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
    inLanguage: "en-US",
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
