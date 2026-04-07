import { useEffect, useState } from "react";

import { apiClient } from "../api/client";
import { EventTimeline } from "../components/EventTimeline";

export function SessionDetailPage() {
  const [detail, setDetail] = useState<{
    sessionId: string;
    status: string;
    agentType: string;
    events: string[];
  } | null>(null);

  useEffect(() => {
    void apiClient.getSessionDetail("session-1").then((result) => {
      setDetail(result);
    });
  }, []);

  return (
    <main>
      <h1>Session Detail</h1>
      {detail ? (
        <>
          <h2>{detail.sessionId}</h2>
          <p>{detail.agentType}</p>
          <p>{detail.status}</p>
          <EventTimeline events={detail.events} />
        </>
      ) : null}
    </main>
  );
}
