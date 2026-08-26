import type { RecipeData } from "./schema";

const GRAMS_RE = /(\d+(?:\.\d+)?)\s*g(?:rams?)?\b/i;

export function parseGrams(amount: string, grams?: number): number | undefined {
  if (grams != null && Number.isFinite(grams)) return grams;
  const match = GRAMS_RE.exec(amount);
  if (!match) return undefined;
  return Number(match[1]);
}

export type FormulaRow = {
  name: string;
  amount: string;
  grams?: number;
  bakers_percent?: number;
  stage?: string;
  url?: string;
};

export type FormulaSummary = {
  rows: FormulaRow[];
  flourGrams?: number;
  hydration?: number;
  inoculation?: number;
};

export function summarizeFormula(
  recipe: RecipeData,
  resolve: (id: string) => { url: string; title: string } | undefined,
): FormulaSummary {
  const rows: FormulaRow[] = recipe.ingredients.map((ingredient) => {
    const target = ingredient.id ? resolve(ingredient.id) : undefined;
    return {
      name: ingredient.name ?? target?.title ?? ingredient.id ?? "ingredient",
      amount: ingredient.amount,
      grams: parseGrams(ingredient.amount, ingredient.grams),
      bakers_percent: ingredient.bakers_percent,
      stage: ingredient.stage,
      url: target?.url,
    };
  });

  const flour = rows.find((row) => row.bakers_percent === 100 && row.grams);
  const flourGrams = flour?.grams;
  if (flourGrams) {
    for (const row of rows) {
      if (row.bakers_percent == null && row.grams != null) {
        row.bakers_percent = Math.round((row.grams / flourGrams) * 1000) / 10;
      }
    }
  }

  const water = rows.find((row) => /water/i.test(row.name) && row.grams);
  const starter = rows.find(
    (row) => /starter|levain/i.test(row.name) && row.grams,
  );

  return {
    rows,
    flourGrams,
    hydration:
      flourGrams && water?.grams != null
        ? Math.round((water.grams / flourGrams) * 1000) / 10
        : undefined,
    inoculation:
      flourGrams && starter?.grams != null
        ? Math.round((starter.grams / flourGrams) * 1000) / 10
        : undefined,
  };
}
