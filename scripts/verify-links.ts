import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { sourceSchema } from "../src/lib/schema.ts";

const ROOT = path.join(process.cwd(), "content", "sources");

const files = await readdir(ROOT);
const urls: string[] = [];
for (const name of files) {
  if (!name.endsWith(".yaml")) continue;
  const raw = await readFile(path.join(ROOT, name), "utf8");
  const data = sourceSchema.parse(parseYaml(raw));
  if (data.url) urls.push(data.url);
}

let failed = 0;
for (const url of urls) {
  try {
    const response = await fetch(url, { method: "HEAD", redirect: "follow" });
    const ok = response.ok || response.status === 405;
    console.log(`${ok ? "ok   " : "fail "} ${response.status} ${url}`);
    if (!ok) failed += 1;
  } catch (error) {
    failed += 1;
    console.log(`fail  ${url} (${error instanceof Error ? error.message : error})`);
  }
}

if (failed) {
  console.error(`verify:links failed: ${failed} URL(s)`);
  process.exit(1);
}
console.log(`Checked ${urls.length} URL(s).`);
