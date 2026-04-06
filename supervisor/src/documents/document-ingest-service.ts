import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

import { parseMarkdownDocument } from "./document-parser";

export async function ingestDocument(path: string, kind: string) {
  const content = await readFile(path, "utf8");

  return {
    path,
    kind,
    observedAt: new Date().toISOString(),
    version: createHash("sha256").update(content).digest("hex"),
    parsed: parseMarkdownDocument(content)
  };
}
