import { describe, expect, it } from "vitest";
import { z } from "zod";

import { createSectionDefaults, createSectionSchema } from "./factory";

describe("createSectionSchema", () => {
  it("creates a schema with common fields", () => {
    const schema = createSectionSchema({
      title: z.string(),
      description: z.string(),
    });

    const validData = {
      id: "12345678901234567890123456789012",
      visible: true,
      date: "2023-01-01",
      summary: "Test summary",
      url: { label: "", href: "" },
      title: "Test Title",
      description: "Test Description",
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("makes specified field required when requiredField is provided", () => {
    const schema = createSectionSchema(
      {
        title: z.string(),
        description: z.string(),
      },
      "title"
    );

    const invalidData = {
      id: "12345678901234567890123456789012",
      visible: true,
      date: "",
      summary: "",
      url: { label: "", href: "" },
      title: "", // This should fail because it's required
      description: "",
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("allows optional fields when no requiredField is specified", () => {
    const schema = createSectionSchema({
      title: z.string(),
      description: z.string(),
    });

    const validData = {
      id: "12345678901234567890123456789012",
      visible: true,
      date: "",
      summary: "",
      url: { label: "", href: "" },
      title: "", // This should be valid because nothing is required
      description: "",
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("includes all common fields", () => {
    const schema = createSectionSchema({
      customField: z.string(),
    });

    // Check that all expected fields exist in the schema
    const shape = schema._def.shape();
    expect(shape).toHaveProperty("id");
    expect(shape).toHaveProperty("visible");
    expect(shape).toHaveProperty("date");
    expect(shape).toHaveProperty("summary");
    expect(shape).toHaveProperty("url");
    expect(shape).toHaveProperty("customField");
  });
});

describe("createSectionDefaults", () => {
  it("creates defaults with common fields", () => {
    const defaults = createSectionDefaults({
      title: "Default Title",
      description: "",
    });

    expect(defaults).toEqual({
      id: "",
      visible: true,
      date: "",
      summary: "",
      url: { label: "", href: "" },
      title: "Default Title",
      description: "",
    });
  });

  it("merges provided defaults with common defaults", () => {
    const defaults = createSectionDefaults({
      title: "Custom Title",
      count: 5,
    });

    expect(defaults.title).toBe("Custom Title");
    expect(defaults.count).toBe(5);
    expect(defaults.visible).toBe(true);
    expect(defaults.id).toBe("");
  });

  it("overrides common defaults when provided", () => {
    const defaults = createSectionDefaults({
      visible: false,
      id: "custom-id",
    });

    expect(defaults.visible).toBe(false);
    expect(defaults.id).toBe("custom-id");
  });
});
