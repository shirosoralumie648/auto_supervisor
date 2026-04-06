export type ReviewCommandInput = {
  path: string;
  decision: string;
  summary?: string;
};

export function reviewCommand({ path, decision, summary }: ReviewCommandInput) {
  return `${path}\t${decision}${summary ? `\t${summary}` : ""}`;
}
