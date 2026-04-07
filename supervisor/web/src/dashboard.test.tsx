import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { act } from "react";
import ReactDOMClient from "react-dom/client";
import { renderToString } from "react-dom/server";
import { SessionCard } from "./components/SessionCard";
import { EventTimeline } from "./components/EventTimeline";
import { StageAssessmentPanel } from "./components/StageAssessmentPanel";
import { SessionDetailPage } from "./pages/SessionDetailPage";
import { RoadmapStatusPage } from "./pages/RoadmapStatusPage";
import { OverviewPage } from "./pages/OverviewPage";
import { App } from "./App";

vi.mock("./api/client", () => ({
  apiClient: {
    getOverview: vi.fn(async () => ({
      sessions: [
        { sessionId: "session-1", status: "idle", agentType: "claude-code" }
      ]
    })),
    getSessionDetail: vi.fn(async () => ({
      sessionId: "session-1",
      status: "idle",
      agentType: "claude-code",
      events: ["session.started", "session.idle"]
    })),
    getRoadmapStatus: vi.fn(async () => ({
      stages: [{ stageId: "m1", status: "in_progress" }]
    }))
  }
}));

describe("OverviewPage", () => {
  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders session data returned by the API client", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = ReactDOMClient.createRoot(container);

    await act(async () => {
      root.render(<OverviewPage />);
    });

    expect(container.textContent).toContain("session-1");
    expect(container.textContent).toContain("claude-code");
    expect(container.textContent).toContain("idle");

    await act(async () => {
      root.unmount();
    });
  });

  it("renders session detail returned by the API client", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = ReactDOMClient.createRoot(container);

    await act(async () => {
      root.render(<SessionDetailPage />);
    });

    expect(container.textContent).toContain("session-1");
    expect(container.textContent).toContain("claude-code");
    expect(container.textContent).toContain("session.started");

    await act(async () => {
      root.unmount();
    });
  });

  it("renders stage data returned by the API client", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = ReactDOMClient.createRoot(container);

    await act(async () => {
      root.render(<RoadmapStatusPage />);
    });

    expect(container.textContent).toContain("m1");
    expect(container.textContent).toContain("in_progress");

    await act(async () => {
      root.unmount();
    });
  });
});

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
  it("renders EventTimeline entries", () => {
    const html = renderToString(<EventTimeline events={["session.started"]} />);

    expect(html).toContain("session.started");
  });

  it("renders StageAssessmentPanel entries", () => {
    const html = renderToString(
      <StageAssessmentPanel stages={[{ stageId: "m1", status: "in_progress" }]} />
    );

    expect(html).toContain("m1");
    expect(html).toContain("in_progress");
  });

  it("renders App with first-pass pages in scope", () => {
    const html = renderToString(<App />);

    expect(html).toContain("Overview");
    expect(html).toContain("Session Detail");
    expect(html).toContain("Roadmap Status");
  });
});
