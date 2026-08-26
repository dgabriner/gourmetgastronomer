export type CiteInput = {
  title: string;
  url: string;
  id: string;
  updated?: string;
};

function parseIsoDate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return new Date(Date.UTC(year, month - 1, day));
}

export function formatDateLong(iso: string): string | null {
  const date = parseIsoDate(iso);
  if (!date) return null;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function apaDate(iso: string): string {
  const date = parseIsoDate(iso);
  if (!date) return "n.d.";
  const year = date.getUTCFullYear();
  const month = new Intl.DateTimeFormat("en-US", {
    month: "long",
    timeZone: "UTC",
  }).format(date);
  return `${year}, ${month} ${date.getUTCDate()}`;
}

export function recommendedCitation(input: CiteInput): string {
  const updated = input.updated ? ` Updated ${input.updated}.` : "";
  return `Gourmet Gastronomer. "${input.title}."${updated} ${input.url} ${input.id}.`;
}

export function chicagoCitation(input: CiteInput): string {
  const long = input.updated ? formatDateLong(input.updated) : null;
  const datePart = long ? ` Updated ${long}.` : "";
  return `Gourmet Gastronomer. "${input.title}." Gourmet Gastronomer.${datePart} ${input.url}.`;
}

export function apaCitation(input: CiteInput): string {
  const date = input.updated ? apaDate(input.updated) : "n.d.";
  return `Gourmet Gastronomer. (${date}). ${input.title}. ${input.url}`;
}
