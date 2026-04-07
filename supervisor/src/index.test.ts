import { describe, expect, it } from "vitest";

import { supervisorVersion } from "./index";

describe("supervisorVersion", () => {
  it("exports the current project version", () => {
    expect(supervisorVersion).toBe("0.1.0");
  });
});
