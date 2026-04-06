import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { SessionCard } from "./components/SessionCard";
import { EventTimeline } from "./components/EventTimeline";
import { StageAssessmentPanel } from "./components/StageAssessmentPanel";
import { SessionDetailPage } from "./pages/SessionDetailPage";
import { RoadmapStatusPage } from "./pages/RoadmapStatusPage";
import { App } from "./App";

describe("SessionCard", () => {
  it("renders session id and status", () => {
    const html = renderToString(
      <SessionCard
        session={{ sessionId: "s1", status: "idle", agentType: "opencode" }}
      />
    );

    expect(html).toContain("s1");
    expect(html).toContain("idle");
  });
});

describe("dashboard composition", () => {
  it("renders EventTimeline", () => {
    const html = renderToString(<EventTimeline />);

    expect(html).toContain("Event timeline");
  });

  it("renders StageAssessmentPanel", () => {
    const html = renderToString(<StageAssessmentPanel />);

    expect(html).toContain("Stage assessment");
  });

  it("renders SessionDetailPage with EventTimeline", () => {
    const html = renderToString(<SessionDetailPage />);

    expect(html).toContain("Session Detail");
    expect(html).toContain("Event timeline");
  });

  it("renders RoadmapStatusPage with StageAssessmentPanel", () => {
    const html = renderToString(<RoadmapStatusPage />);

    expect(html).toContain("Roadmap Status");
    expect(html).toContain("Stage assessment");
  });

  it("renders App with first-pass pages in scope", () => {
    const html = renderToString(<App />);

    expect(html).toContain("Overview");
    expect(html).toContain("Session Detail");
    expect(html).toContain("Roadmap Status");
    expect(html).toContain("Event timeline");
    expect(html).toContain("Stage assessment");
  });
});
