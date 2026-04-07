import { useEffect, useState } from "react";

import { apiClient } from "../api/client";
import { StageAssessmentPanel } from "../components/StageAssessmentPanel";

export function RoadmapStatusPage() {
  const [stages, setStages] = useState<Array<{ stageId: string; status: string }>>([]);

  useEffect(() => {
    void apiClient.getRoadmapStatus().then((result) => {
      setStages(result.stages);
    });
  }, []);

  return (
    <main>
      <h1>Roadmap Status</h1>
      <StageAssessmentPanel stages={stages} />
    </main>
  );
}
