import { describe, expect, it } from "vitest";

import { checkMtlCompatibility } from "@/lib/compat";

describe("checkMtlCompatibility", () => {
  it("returns compatible by default during Step A", () => {
    expect(checkMtlCompatibility()).toEqual({ compatible: true });
  });
});

