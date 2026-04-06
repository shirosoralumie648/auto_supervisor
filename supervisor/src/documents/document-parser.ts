export type ParsedDocument = {
  headings: string[];
  hasDoneWhen: boolean;
  content: string;
};

export function parseMarkdownDocument(content: string): ParsedDocument {
  const headings = content
    .split("\n")
    .filter((line) => /^\s*#/.test(line))
    .map((line) => line.replace(/^\s*#+\s*/, ""));

  const lowerContent = content.toLowerCase();

  return {
    headings,
    hasDoneWhen:
      lowerContent.includes("done_when") ||
      lowerContent.includes("completion criteria"),
    content
  };
}
