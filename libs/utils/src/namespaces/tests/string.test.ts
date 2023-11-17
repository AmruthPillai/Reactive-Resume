import { describe, expect, it } from "vitest";

import {
  extractUrl,
  generateRandomName,
  getInitials,
  isEmptyString,
  isUrl,
  kebabCase,
  processUsername,
} from "../string";

describe("getInitials", () => {
  it("returns the initials of a name", () => {
    expect(getInitials("John Doe")).toBe("JD");
    expect(getInitials("Mary Jane Watson")).toBe("MW");
  });
});

describe("isUrl", () => {
  it("checks if a string is a URL", () => {
    expect(isUrl("https://example.com")).toBe(true);
    expect(isUrl("not a url")).toBe(false);
  });
});

describe("isEmptyString", () => {
  it("checks if a string is empty or only contains whitespace", () => {
    expect(isEmptyString("")).toBe(true);
    expect(isEmptyString(" ")).toBe(true);
    expect(isEmptyString("<p></p>")).toBe(true);
    expect(isEmptyString("not empty")).toBe(false);
  });
});

describe("extractUrl", () => {
  it("extracts a URL from a string", () => {
    expect(extractUrl("Visit https://example.com today!")).toBe("https://example.com");
    expect(extractUrl("No URL here.")).toBeNull();
  });
});

describe("kebabCase", () => {
  it("converts a string to kebab-case", () => {
    expect(kebabCase("fooBar")).toBe("foo-bar");
    expect(kebabCase("Foo Bar")).toBe("foo-bar");
    expect(kebabCase("foo_bar")).toBe("foo-bar");
    expect(kebabCase("")).toBe("");
    expect(kebabCase(null)).toBe("");
  });
});

describe("generateRandomName", () => {
  it("generates a random name", () => {
    const name = generateRandomName();
    expect(name).toMatch(/^[A-Z][a-z]+ [A-Z][a-z]+ [A-Z][a-z]+$/);
  });
});

describe("processUsername", () => {
  it("processes a username by removing non-alphanumeric characters", () => {
    expect(processUsername("User@Name!")).toBe("username");
    expect(processUsername("")).toBe("");
    expect(processUsername(null)).toBe("");
  });
});
