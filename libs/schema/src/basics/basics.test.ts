import { describe, expect, it } from "vitest";

import { basicsSchema, defaultBasics } from "./index";

describe("basicsSchema", () => {
  it("validates valid basics data", () => {
    const validData = {
      name: "John Doe",
      headline: "Software Engineer",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      location: "San Francisco, CA",
      url: {
        label: "Portfolio",
        href: "https://johndoe.com",
      },
      customFields: [
        {
          id: "12345678901234567890123456789012", // Valid CUID2
          icon: "ph-linkedin-logo",
          name: "LinkedIn",
          value: "https://linkedin.com/in/johndoe",
        },
      ],
      picture: {
        url: "https://example.com/avatar.jpg",
        size: 128,
        aspectRatio: 1.5,
        borderRadius: 8,
        effects: {
          hidden: false,
          border: true,
          grayscale: false,
        },
      },
    };

    const result = basicsSchema.safeParse(validData);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validData);
  });

  it("validates basics with empty email", () => {
    const dataWithEmptyEmail = {
      ...defaultBasics,
      email: "",
    };

    const result = basicsSchema.safeParse(dataWithEmptyEmail);
    expect(result.success).toBe(true);
  });

  it("validates basics with empty URL href", () => {
    const dataWithEmptyUrl = {
      ...defaultBasics,
      url: {
        label: "Portfolio",
        href: "",
      },
    };

    const result = basicsSchema.safeParse(dataWithEmptyUrl);
    expect(result.success).toBe(true);
  });

  it("rejects invalid email format", () => {
    const invalidData = {
      ...defaultBasics,
      email: "invalid-email",
    };

    const result = basicsSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["email"]);
  });

  it("rejects invalid URL format", () => {
    const invalidData = {
      ...defaultBasics,
      url: {
        label: "Portfolio",
        href: "not-a-url",
      },
    };

    const result = basicsSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["url", "href"]);
  });

  it("rejects invalid custom field CUID2", () => {
    const invalidData = {
      ...defaultBasics,
      customFields: [
        {
          id: "invalid-id",
          icon: "ph-linkedin-logo",
          name: "LinkedIn",
          value: "https://linkedin.com/in/johndoe",
        },
      ],
    };

    const result = basicsSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["customFields", 0, "id"]);
  });

  it("applies default values correctly", () => {
    const minimalData = {
      name: "John Doe",
      headline: "Software Engineer",
      email: "",
      phone: "",
      location: "",
      url: {
        label: "",
        href: "",
      },
      customFields: [],
      picture: {
        url: "",
        effects: {},
      },
    };

    const result = basicsSchema.safeParse(minimalData);
    expect(result.success).toBe(true);
    expect(result.data?.picture.size).toBe(64);
    expect(result.data?.picture.aspectRatio).toBe(1);
    expect(result.data?.picture.borderRadius).toBe(0);
    expect(result.data?.picture.effects.hidden).toBe(false);
    expect(result.data?.picture.effects.border).toBe(false);
    expect(result.data?.picture.effects.grayscale).toBe(false);
  });
});

describe("defaultBasics", () => {
  it("matches the schema structure", () => {
    const result = basicsSchema.safeParse(defaultBasics);
    expect(result.success).toBe(true);
  });

  it("has expected default values", () => {
    expect(defaultBasics.name).toBe("");
    expect(defaultBasics.email).toBe("");
    expect(defaultBasics.phone).toBe("");
    expect(defaultBasics.location).toBe("");
    expect(defaultBasics.customFields).toEqual([]);
    expect(defaultBasics.picture.url).toBe("");
    expect(defaultBasics.picture.size).toBe(64);
    expect(defaultBasics.picture.effects.hidden).toBe(false);
  });
});
