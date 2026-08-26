import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { pageSchema, sourceSchema } from "./lib/schema";
import { generateCollectionId } from "./lib/paths";

const pages = defineCollection({
  loader: glob({
    pattern: "{baking,cheese,preserving,wine,ingredients,science,skills,atlas,recipes,learn}/**/*.md",
    base: "./content",
    generateId: ({ entry }) => generateCollectionId(entry),
    deferRender: true,
  }),
  schema: pageSchema,
});

const sources = defineCollection({
  loader: glob({
    pattern: "*.yaml",
    base: "./content/sources",
  }),
  schema: sourceSchema,
});

export const collections = { pages, sources };
