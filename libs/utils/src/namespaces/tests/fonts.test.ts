import { describe, expect, it } from "vitest";

import { isLocalFont, localFonts } from "../fonts";

describe("isLocalFont", () => {
  it("returns true for known local fonts (case-insensitive)", () => {
    expect(isLocalFont("Arial")).toBe(true);
    expect(isLocalFont("arial")).toBe(true);
    expect(isLocalFont("Times New Roman")).toBe(true);
    expect(isLocalFont("times new roman")).toBe(true);
  });

  it("returns false for non-local fonts", () => {
    expect(isLocalFont("Roboto")).toBe(false);
    expect(isLocalFont("Open Sans")).toBe(false);
  });
});

describe("localFonts", () => {
  it("includes the expected base set", () => {
    for (const f of ["Arial", "Cambria", "Garamond", "Times New Roman"]) {
      expect(localFonts).toContain(f);
    }
  });
});
