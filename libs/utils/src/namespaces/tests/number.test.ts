import { describe, expect, it } from "vitest";

import { linearTransform } from "../number";

describe("linearTransform", () => {
  it("transforms values from one range to another", () => {
    const value = 5;
    const result = linearTransform(value, 0, 10, 0, 100);
    expect(result).toBe(50);
  });

  it("handles negative ranges", () => {
    const value = -5;
    const result = linearTransform(value, -10, 0, 0, 100);
    expect(result).toBe(50);
  });

  it("correctly transforms the minimum input value to the minimum output value", () => {
    const value = 0;
    const result = linearTransform(value, 0, 10, 0, 100);
    expect(result).toBe(0);
  });

  it("correctly transforms the maximum input value to the maximum output value", () => {
    const value = 10;
    const result = linearTransform(value, 0, 10, 0, 100);
    expect(result).toBe(100);
  });

  it("transforms values outside the input range", () => {
    const value = 15;
    const result = linearTransform(value, 0, 10, 0, 100);
    expect(result).toBe(150);
  });

  it("handles inverted output ranges", () => {
    const value = 5;
    const result = linearTransform(value, 0, 10, 100, 0);
    expect(result).toBe(50);
  });

  it("returns NaN if input maximum equals input minimum", () => {
    const value = 5;
    const result = linearTransform(value, 0, 0, 0, 100);
    expect(result).toBe(NaN);
  });

  it("returns NaN if input range is zero (avoids division by zero)", () => {
    const value = 5;
    const result = linearTransform(value, 10, 10, 0, 100);
    expect(result).toBeNaN();
  });
});
