import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import {
  CONTENT_ROOTS,
  GG_ID_RE,
  pageSchema,
  sourceSchema,
  type PageData,
  type SourceData,
} from "../src/lib/schema.ts";
import { extractCitationIds, extractWikiIds } from "../src/lib/wikilinks.ts";
import { generateCollectionId, parentFileId } from "../src/lib/paths.ts";

export type Issue = { level: "error" | "warn"; message: string; file?: string };

type LoadedPage = {
  file: string;
  fileId: string;
  data: PageData;
  body: string;
};

type LoadedSource = {
  file: string;
  data: SourceData;
};

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");

export function splitFrontmatter(raw: string): { frontmatter: string; body: string } {
  const normalized = raw.replace(/^\uFEFF/, "").replaceAll("\r\n", "\n").replaceAll("\r", "\n");
  if (!normalized.startsWith("---")) {
    throw new Error("Missing YAML frontmatter");
  }
  const end = normalized.indexOf("\n---", 3);
  if (end === -1) throw new Error("Unterminated YAML frontmatter");
  const frontmatter = normalized.slice(3, end).replace(/^\n/, "");
  const body = normalized.slice(end + 4).replace(/^\n/, "");
  return { frontmatter, body };
}

async function walkMarkdown(dir: string, acc: string[] = []): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_templates" || entry.name === "sources") continue;
      await walkMarkdown(full, acc);
    } else if (entry.name.endsWith(".md")) {
      acc.push(full);
    }
  }
  return acc;
}

export async function loadCorpus(): Promise<{
  pages: LoadedPage[];
  sources: LoadedSource[];
  issues: Issue[];
}> {
  const issues: Issue[] = [];
  const pages: LoadedPage[] = [];
  const sources: LoadedSource[] = [];

  const markdownFiles = await walkMarkdown(CONTENT);
  for (const file of markdownFiles) {
    const rel = path.relative(CONTENT, file);
    const raw = await readFile(file, "utf8");
    try {
      const { frontmatter, body } = splitFrontmatter(raw);
      const parsed = pageSchema.parse(parseYaml(frontmatter));
      pages.push({
        file: rel,
        fileId: generateCollectionId(rel.replaceAll("\\", "/")),
        data: parsed,
        body,
      });
    } catch (error) {
      issues.push({
        level: "error",
        file: rel,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const sourceDir = path.join(CONTENT, "sources");
  const sourceFiles = await readdir(sourceDir);
  for (const name of sourceFiles) {
    if (!name.endsWith(".yaml")) continue;
    const file = path.join(sourceDir, name);
    const raw = await readFile(file, "utf8");
    try {
      const parsed = sourceSchema.parse(parseYaml(raw));
      sources.push({ file: `sources/${name}`, data: parsed });
    } catch (error) {
      issues.push({
        level: "error",
        file: `sources/${name}`,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return { pages, sources, issues };
}

export async function validateCorpus(): Promise<Issue[]> {
  const { pages, sources, issues } = await loadCorpus();
  const ggIds = new Map<string, string>();
  const urls = new Map<string, string>();
  const sourceIds = new Set(sources.map((source) => source.data.id));

  for (const page of pages) {
    if (ggIds.has(page.data.id)) {
      issues.push({
        level: "error",
        file: page.file,
        message: `Duplicate id ${page.data.id} (also ${ggIds.get(page.data.id)})`,
      });
    } else {
      ggIds.set(page.data.id, page.file);
    }
    if (urls.has(page.fileId)) {
      issues.push({
        level: "error",
        file: page.file,
        message: `Duplicate URL path ${page.fileId}`,
      });
    } else {
      urls.set(page.fileId, page.file);
    }
    const root = page.fileId.split("/")[0];
    if (!(CONTENT_ROOTS as readonly string[]).includes(root)) {
      issues.push({
        level: "error",
        file: page.file,
        message: `Unknown content root ${root}`,
      });
    }
    if (page.data.related.length > 8) {
      issues.push({
        level: "warn",
        file: page.file,
        message: `related has ${page.data.related.length} items (cap 8)`,
      });
    }
    if (page.data.status === "reviewed" && page.data.sources.length === 0) {
      issues.push({
        level: "warn",
        file: page.file,
        message: "reviewed page has no sources",
      });
    }
    if (/\bTODO\b/.test(page.body)) {
      issues.push({
        level: "warn",
        file: page.file,
        message: "Body contains TODO",
      });
    }
  }

  for (const source of sources) {
    if (ggIds.has(source.data.id) || [...sourceIds].filter((id) => id === source.data.id).length > 1) {
      issues.push({
        level: "error",
        file: source.file,
        message: `Duplicate source id ${source.data.id}`,
      });
    }
    if (!source.data.url && !source.data.isbn && !source.data.doi) {
      issues.push({
        level: "warn",
        file: source.file,
        message: "Source has no url, isbn, or doi",
      });
    }
    if (!source.data.id.startsWith("gg:source:")) {
      issues.push({
        level: "error",
        file: source.file,
        message: `Source id must start with gg:source:`,
      });
    }
  }

  const allIds = new Set([...ggIds.keys(), ...sourceIds]);

  const checkRef = (id: string, file: string, field: string) => {
    if (!GG_ID_RE.test(id)) {
      issues.push({ level: "error", file, message: `Malformed id in ${field}: ${id}` });
      return;
    }
    if (!allIds.has(id)) {
      issues.push({
        level: "error",
        file,
        message: `${field} references missing id ${id}`,
      });
    }
  };

  for (const page of pages) {
    for (const id of page.data.related) checkRef(id, page.file, "related");
    for (const id of page.data.prerequisites) checkRef(id, page.file, "prerequisites");
    for (const id of page.data.sources) {
      if (!sourceIds.has(id)) {
        issues.push({
          level: "error",
          file: page.file,
          message: `sources references missing source ${id}`,
        });
      }
    }
    if (page.data.kind === "ingredient") {
      for (const id of page.data.substitutes) checkRef(id, page.file, "substitutes");
    }
    if (page.data.kind === "recipe") {
      for (const id of page.data.equipment) checkRef(id, page.file, "equipment");
      for (const ingredient of page.data.ingredients) {
        if (ingredient.id) checkRef(ingredient.id, page.file, "ingredients");
      }
    }
    if (page.data.kind === "place" && page.data.part_of) {
      checkRef(page.data.part_of, page.file, "part_of");
    }
    if (page.data.kind === "pathway") {
      for (const step of page.data.steps) {
        if (step.id.startsWith("gg:source:") || step.id.startsWith("gg:pathway:")) {
          issues.push({
            level: "error",
            file: page.file,
            message: `Pathway step may not point at ${step.id}`,
          });
        }
        checkRef(step.id, page.file, "steps");
      }
    }
    for (const id of extractWikiIds(page.body)) checkRef(id, page.file, "[[wiki]]");
    for (const id of extractCitationIds(page.body)) {
      if (!sourceIds.has(id)) {
        issues.push({
          level: "error",
          file: page.file,
          message: `[src:] references missing source ${id}`,
        });
      }
    }
    const mdLinks = [...page.body.matchAll(/\]\((\/[^)]+)\)/g)];
    if (mdLinks.length) {
      issues.push({
        level: "warn",
        file: page.file,
        message: "Markdown path links present; prefer [[gg:...]] IDs",
      });
    }
  }

  const inbound = new Set<string>();
  for (const page of pages) {
    for (const id of [
      ...page.data.related,
      ...page.data.prerequisites,
      ...page.data.sources,
      ...extractWikiIds(page.body),
    ]) {
      inbound.add(id);
    }
    if (page.data.kind === "pathway") {
      for (const step of page.data.steps) inbound.add(step.id);
    }
    if (page.data.kind === "recipe") {
      for (const ingredient of page.data.ingredients) {
        if (ingredient.id) inbound.add(ingredient.id);
      }
    }
    const parent = parentFileId(page.fileId);
    if (parent) inbound.add(parent);
  }
  for (const page of pages) {
    const isIndex = page.file.endsWith("index.md");
    if (!inbound.has(page.data.id) && !isIndex) {
      issues.push({
        level: "warn",
        file: page.file,
        message: `Orphan page ${page.data.id}`,
      });
    }
  }

  return issues;
}

const isMain = process.argv[1]?.includes("validate.ts");
if (isMain && !process.argv[1]?.includes("validate.test.ts")) {
  const issues = await validateCorpus();
  for (const issue of issues) {
    const prefix = issue.level === "error" ? "error" : "warn ";
    console.log(`${prefix} ${issue.file ?? ""} ${issue.message}`);
  }
  const errors = issues.filter((issue) => issue.level === "error");
  if (errors.length) {
    console.error(`Validation failed: ${errors.length} error(s)`);
    process.exit(1);
  }
  console.log(`Validation passed with ${issues.length} warning(s).`);
}
