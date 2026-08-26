import type { CollectionEntry } from "astro:content";
import {
  fileIdToUrl,
  parentFileId,
  rootOf,
} from "./paths";
import type { PageData, SourceData } from "./schema";

export type PageEntry = CollectionEntry<"pages">;
export type SourceEntry = CollectionEntry<"sources">;

export type GraphNode = {
  fileId: string;
  url: string;
  data: PageData;
  body: string;
};

export type GraphSource = {
  fileId: string;
  data: SourceData;
};

export type FocusWindow = {
  parent: GraphNode | null;
  current: GraphNode;
  siblings: GraphNode[];
  children: GraphNode[];
  siblingOverflow: number;
  childOverflow: number;
};

const WINDOW_CAP = 12;

export function buildGraph(
  pages: PageEntry[],
  sources: SourceEntry[],
): {
  nodes: Map<string, GraphNode>;
  byGgId: Map<string, GraphNode>;
  sourcesById: Map<string, GraphSource>;
  childrenOf: Map<string, GraphNode[]>;
} {
  const nodes = new Map<string, GraphNode>();
  const byGgId = new Map<string, GraphNode>();
  const sourcesById = new Map<string, GraphSource>();
  const childrenOf = new Map<string, GraphNode[]>();

  for (const page of pages) {
    const node: GraphNode = {
      fileId: page.id,
      url: fileIdToUrl(page.id),
      data: page.data,
      body: page.body ?? "",
    };
    nodes.set(page.id, node);
    byGgId.set(page.data.id, node);
  }

  for (const source of sources) {
    sourcesById.set(source.data.id, {
      fileId: source.id,
      data: source.data,
    });
  }

  for (const node of nodes.values()) {
    const parent = parentFileId(node.fileId);
    if (!parent) continue;
    const list = childrenOf.get(parent) ?? [];
    list.push(node);
    childrenOf.set(parent, list);
  }

  for (const list of childrenOf.values()) {
    list.sort((a, b) => a.data.title.localeCompare(b.data.title));
  }

  return { nodes, byGgId, sourcesById, childrenOf };
}

export function breadcrumbsFor(node: GraphNode, nodes: Map<string, GraphNode>) {
  const crumbs: GraphNode[] = [];
  let current: string | null = node.fileId;
  while (current) {
    const found = nodes.get(current);
    if (found) crumbs.unshift(found);
    current = parentFileId(current);
  }
  return crumbs;
}

export function focusWindow(
  node: GraphNode,
  nodes: Map<string, GraphNode>,
  childrenOf: Map<string, GraphNode[]>,
): FocusWindow {
  const parentId = parentFileId(node.fileId);
  const parent = parentId ? (nodes.get(parentId) ?? null) : null;
  const siblingSource = parentId
    ? (childrenOf.get(parentId) ?? [])
    : [...nodes.values()].filter((candidate) => !parentFileId(candidate.fileId));
  const siblingsAll = siblingSource.filter((item) => item.fileId !== node.fileId);
  const childrenAll = childrenOf.get(node.fileId) ?? [];

  return {
    parent,
    current: node,
    siblings: siblingsAll.slice(0, WINDOW_CAP),
    children: childrenAll.slice(0, WINDOW_CAP),
    siblingOverflow: Math.max(0, siblingsAll.length - WINDOW_CAP),
    childOverflow: Math.max(0, childrenAll.length - WINDOW_CAP),
  };
}

export function groupRelated(node: GraphNode, byGgId: Map<string, GraphNode>) {
  const groups = new Map<string, GraphNode[]>();
  for (const id of node.data.related) {
    const target = byGgId.get(id);
    if (!target) continue;
    const key = target.data.kind;
    const list = groups.get(key) ?? [];
    list.push(target);
    groups.set(key, list);
  }
  return groups;
}

export function inboundRelated(ggId: string, nodes: Iterable<GraphNode>) {
  return [...nodes].filter((node) => node.data.related.includes(ggId));
}

export function recipesUsing(ggId: string, nodes: Iterable<GraphNode>) {
  return [...nodes].filter((node) => {
    if (node.data.kind !== "recipe") return false;
    return node.data.ingredients.some((ingredient) => ingredient.id === ggId);
  });
}

export function pathwaysContaining(ggId: string, nodes: Iterable<GraphNode>) {
  return [...nodes].filter((node) => {
    if (node.data.kind !== "pathway") return false;
    return node.data.steps.some((step) => step.id === ggId);
  });
}

export function nodesByRoot(
  root: string,
  nodes: Iterable<GraphNode>,
): GraphNode[] {
  return [...nodes]
    .filter((node) => rootOf(node.fileId) === root)
    .sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export function placesByKind(
  placeKind: string,
  nodes: Iterable<GraphNode>,
): GraphNode[] {
  return [...nodes]
    .filter(
      (node) =>
        node.data.kind === "place" && node.data.place_kind === placeKind,
    )
    .sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export function nodesByTag(tag: string, nodes: Iterable<GraphNode>): GraphNode[] {
  return [...nodes]
    .filter((node) => node.data.tags.includes(tag))
    .sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export function nodesByKind(kind: string, nodes: Iterable<GraphNode>): GraphNode[] {
  return [...nodes]
    .filter((node) => node.data.kind === kind)
    .sort((a, b) => a.data.title.localeCompare(b.data.title));
}
