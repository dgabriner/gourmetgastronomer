import { z } from "astro/zod";

export const PAGE_KINDS = [
  "topic",
  "ingredient",
  "recipe",
  "place",
  "pathway",
  "person",
] as const;

export const SOURCE_KINDS = [
  "book",
  "article",
  "standard",
  "institution",
  "dataset",
  "web",
] as const;

export const STATUSES = ["stub", "developing", "reviewed"] as const;
export const LEVELS = ["beginner", "intermediate", "advanced"] as const;
export const PLACE_KINDS = [
  "bakery",
  "mill",
  "farm",
  "market",
  "restaurant",
  "shop",
  "winery",
  "creamery",
  "institution",
  "neighborhood",
  "region",
  "organization",
] as const;
export const RECIPE_SAFETY = ["canning", "fermentation", "raw"] as const;
export const PLACE_OPERATING = [
  "current",
  "closed",
  "historical",
  "unknown",
] as const;

export type PageKind = (typeof PAGE_KINDS)[number];
export type SourceKind = (typeof SOURCE_KINDS)[number];
export type Status = (typeof STATUSES)[number];

export const GG_ID_RE =
  /^gg:(topic|ingredient|recipe|place|pathway|person|source):[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const ggId = z
  .string()
  .regex(GG_ID_RE, "Expected gg:<kind>:<kebab-slug>");

export const isoDate = z.preprocess((value) => {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    const year = value.getUTCFullYear();
    const month = String(value.getUTCMonth() + 1).padStart(2, "0");
    const day = String(value.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return value;
}, z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD"));

const basePage = {
  id: ggId,
  title: z.string().min(1),
  summary: z.string().min(1),
  status: z.enum(STATUSES),
  updated: isoDate.optional(),
  tags: z.array(z.string()).default([]),
  sources: z.array(ggId).default([]),
  related: z.array(ggId).default([]),
  prerequisites: z.array(ggId).default([]),
};

export const topicSchema = z.object({
  ...basePage,
  kind: z.literal("topic"),
  level: z.enum(LEVELS).optional(),
});

export const ingredientSchema = z.object({
  ...basePage,
  kind: z.literal("ingredient"),
  also_called: z.array(z.string()).default([]),
  substitutes: z.array(ggId).default([]),
});

export const recipeIngredientSchema = z
  .object({
    id: ggId.optional(),
    name: z.string().optional(),
    amount: z.string().min(1),
    prep: z.string().optional(),
    note: z.string().optional(),
    bakers_percent: z.number().optional(),
    grams: z.number().positive().optional(),
    stage: z.string().optional(),
  })
  .refine((row) => Boolean(row.id || row.name), {
    message: "Recipe ingredient needs id or name",
  });

export const recipeSchema = z.object({
  ...basePage,
  kind: z.literal("recipe"),
  yield: z.string().optional(),
  safety: z.enum(RECIPE_SAFETY).optional(),
  ingredients: z.array(recipeIngredientSchema).min(1),
  equipment: z.array(ggId).default([]),
});

export const placeSchema = z.object({
  ...basePage,
  kind: z.literal("place"),
  place_kind: z.enum(PLACE_KINDS),
  operating: z.enum(PLACE_OPERATING).optional(),
  website: z.url().optional(),
  part_of: ggId.optional(),
  address: z
    .object({
      street: z.string().optional(),
      locality: z.string().optional(),
      region: z.string().optional(),
      postal: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
});

export const pathwaySchema = z.object({
  ...basePage,
  kind: z.literal("pathway"),
  level: z.enum(LEVELS).optional(),
  steps: z
    .array(
      z.object({
        id: ggId,
        as: z.string().optional(),
      }),
    )
    .min(1),
});

export const personSchema = z.object({
  ...basePage,
  kind: z.literal("person"),
  roles: z.array(z.string()).default([]),
});

export const pageSchema = z
  .discriminatedUnion("kind", [
    topicSchema,
    ingredientSchema,
    recipeSchema,
    placeSchema,
    pathwaySchema,
    personSchema,
  ])
  .superRefine((value, ctx) => {
    const expected = `gg:${value.kind}:`;
    if (!value.id.startsWith(expected)) {
      ctx.addIssue({
        code: "custom",
        message: `id ${value.id} does not match kind ${value.kind}`,
        path: ["id"],
      });
    }
  });

export const sourceSchema = z.object({
  id: ggId,
  kind: z.enum(SOURCE_KINDS),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  authors: z.array(z.string()).default([]),
  publisher: z.string().optional(),
  year: z.number().int().optional(),
  isbn: z.string().optional(),
  doi: z.string().optional(),
  url: z.url().optional(),
  verified: isoDate,
  note: z.string().optional(),
});

export type PageData = z.infer<typeof pageSchema>;
export type SourceData = z.infer<typeof sourceSchema>;
export type RecipeData = z.infer<typeof recipeSchema>;
export type PlaceData = z.infer<typeof placeSchema>;
export type PathwayData = z.infer<typeof pathwaySchema>;
export type IngredientData = z.infer<typeof ingredientSchema>;

export const CONTENT_ROOTS = [
  "baking",
  "cheese",
  "preserving",
  "wine",
  "ingredients",
  "science",
  "skills",
  "atlas",
  "recipes",
  "learn",
] as const;

export type ContentRoot = (typeof CONTENT_ROOTS)[number];
