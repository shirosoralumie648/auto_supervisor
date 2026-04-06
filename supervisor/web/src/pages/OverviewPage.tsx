import { SessionCard } from "../components/SessionCard";

const sampleSession = {
  sessionId: "sample-session",
  status: "idle",
  agentType: "opencode"
};

export function OverviewPage() {
  return (
    <main>
      <h1>Overview</h1>
      <SessionCard session={sampleSession} />
    </main>
  );
}
