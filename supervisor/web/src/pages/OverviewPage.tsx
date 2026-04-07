import { useEffect, useState } from "react";

import { apiClient } from "../api/client";
import { SessionCard } from "../components/SessionCard";

export function OverviewPage() {
  const [sessions, setSessions] = useState<
    Array<{ sessionId: string; status: string; agentType: string }>
  >([]);

  useEffect(() => {
    void apiClient.getOverview().then((result) => {
      setSessions(result.sessions);
    });
  }, []);

  return (
    <main>
      <h1>Overview</h1>
      {sessions.map((session) => (
        <SessionCard key={session.sessionId} session={session} />
      ))}
    </main>
  );
}
