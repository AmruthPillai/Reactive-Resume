import { describe, expect, it } from "vitest";

import { deepSearchAndParseDates, sortByDate } from "../date";

type TestType = { date?: Date };

describe("sortByDate", () => {
  it("sorts by date in descending order when desc is true", () => {
    const a: TestType = { date: new Date("2023-01-01") };
    const b: TestType = { date: new Date("2023-01-02") };
    expect(sortByDate(a, b, "date")).toBe(1);
    expect(sortByDate(b, a, "date")).toBe(-1);
  });

  it("sorts by date in ascending order when desc is false", () => {
    const a: TestType = { date: new Date("2023-01-01") };
    const b: TestType = { date: new Date("2023-01-02") };
    expect(sortByDate(a, b, "date", false)).toBe(-1);
    expect(sortByDate(b, a, "date", false)).toBe(1);
  });

  it("returns 0 if one of the dates is missing", () => {
    const a: TestType = { date: new Date("2023-01-01") };
    const b: TestType = {};
    expect(sortByDate(a, b, "date")).toBe(0);
  });

  it("returns 0 if one of the values is not a date", () => {
    const a: TestType = { date: new Date("2023-01-01") };
    const b: TestType = { date: "2023-01-02" as unknown as Date };
    expect(sortByDate(a, b, "date")).toBe(0);
  });

  it("handles equal dates", () => {
    const a: TestType = { date: new Date("2023-01-01") };
    const b: TestType = { date: new Date("2023-01-01") };
    expect(sortByDate(a, b, "date")).toBe(0);
    expect(sortByDate(a, b, "date", false)).toBe(0);
  });
});

describe("deepSearchAndParseDates", () => {
  it("parses dates at various nesting levels", () => {
    const input = {
      level1: {
        date: "2021-08-17T00:00:00Z",
        nested: {
          date: "2022-08-17T00:00:00Z",
        },
      },
      otherKey: "value",
    };
    const dateKeys = ["date"];
    const output = deepSearchAndParseDates(input, dateKeys);

    expect(output.level1.date).toBeInstanceOf(Date);
    expect(output.level1.nested.date).toBeInstanceOf(Date);
    expect(output.otherKey).toBe("value");
  });

  it("does not parse invalid date strings", () => {
    const input = {
      date: "not a date",
    };
    const dateKeys = ["date"];
    const output = deepSearchAndParseDates(input, dateKeys);

    expect(output.date).toBe("not a date");
  });

  it("does not modify non-object input", () => {
    const input = "2021-08-17T00:00:00Z";
    const dateKeys = ["date"];
    const output = deepSearchAndParseDates(input, dateKeys);

    expect(output).toBe(input);
  });

  it("returns null for null input", () => {
    const input = null;
    const dateKeys = ["date"];
    const output = deepSearchAndParseDates(input, dateKeys);

    expect(output).toBeNull();
  });

  it("handles arrays with date strings", () => {
    const input = ["2021-08-17T00:00:00Z", "2022-08-17"];
    const dateKeys = ["0", "1"]; // Assuming the keys are stringified indices
    const output = deepSearchAndParseDates(input, dateKeys);

    expect(output[0]).toBeInstanceOf(Date);
    expect(output[1]).toBeInstanceOf(Date);
  });

  it("ignores keys that are not in the dateKeys", () => {
    const input = {
      date: "2021-08-17T00:00:00Z",
      notADate: "2021-08-17T00:00:00Z",
    };
    const dateKeys = ["date"];
    const output = deepSearchAndParseDates(input, dateKeys);

    expect(output.date).toBeInstanceOf(Date);
    expect(output.notADate).toBe("2021-08-17T00:00:00Z");
  });
});
