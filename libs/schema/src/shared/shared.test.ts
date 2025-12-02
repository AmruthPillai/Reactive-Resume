import { describe, expect, it } from "vitest";

import { idSchema, itemSchema, defaultItem, urlSchema, defaultUrl } from "./index";

describe("idSchema", () => {
  it("validates valid CUID2", () => {
    const validId = "12345678901234567890123456789012"; // Valid CUID2 format
    const result = idSchema.safeParse(validId);
    expect(result.success).toBe(true);
    expect(result.data).toBe(validId);
  });

  it("rejects invalid CUID2", () => {
    const invalidId = "invalid-id";
    const result = idSchema.safeParse(invalidId);
    expect(result.success).toBe(false);
  });

  it("generates default ID", () => {
    const result = idSchema.safeParse(undefined);
    expect(result.success).toBe(true);
    expect(typeof result.data).toBe("string");
    expect(result.data).toMatch(/^[a-z0-9]{24}$/); // CUID2 format
  });
});

describe("itemSchema", () => {
  it("validates valid item", () => {
    const validItem = {
      id: "12345678901234567890123456789012",
      visible: true,
    };

    const result = itemSchema.safeParse(validItem);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validItem);
  });

  it("validates hidden item", () => {
    const hiddenItem = {
      id: "12345678901234567890123456789012",
      visible: false,
    };

    const result = itemSchema.safeParse(hiddenItem);
    expect(result.success).toBe(true);
    expect(result.data?.visible).toBe(false);
  });

  it("generates default ID for item", () => {
    const itemWithoutId = {
      visible: true,
    };

    const result = itemSchema.safeParse(itemWithoutId);
    expect(result.success).toBe(true);
    expect(result.data?.visible).toBe(true);
    expect(typeof result.data?.id).toBe("string");
  });
});

describe("urlSchema", () => {
  it("validates valid URL", () => {
    const validUrl = {
      label: "Website",
      href: "https://example.com",
    };

    const result = urlSchema.safeParse(validUrl);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validUrl);
  });

  it("validates empty href", () => {
    const emptyUrl = {
      label: "Website",
      href: "",
    };

    const result = urlSchema.safeParse(emptyUrl);
    expect(result.success).toBe(true);
    expect(result.data?.href).toBe("");
  });

  it("rejects invalid URL format", () => {
    const invalidUrl = {
      label: "Website",
      href: "not-a-url",
    };

    const result = urlSchema.safeParse(invalidUrl);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["href"]);
  });

  it("validates URL with various protocols", () => {
    const httpsUrl = { label: "Site", href: "https://example.com" };
    const httpUrl = { label: "Site", href: "http://example.com" };

    expect(urlSchema.safeParse(httpsUrl).success).toBe(true);
    expect(urlSchema.safeParse(httpUrl).success).toBe(true);
  });
});

describe("defaultItem", () => {
  it("has expected default values", () => {
    expect(defaultItem.visible).toBe(true);
    expect(defaultItem.id).toBe("");
  });

  it("can be extended with valid ID", () => {
    const itemWithValidId = {
      ...defaultItem,
      id: "12345678901234567890123456789012",
    };

    const result = itemSchema.safeParse(itemWithValidId);
    expect(result.success).toBe(true);
  });
});

describe("defaultUrl", () => {
  it("matches the schema structure", () => {
    const result = urlSchema.safeParse(defaultUrl);
    expect(result.success).toBe(true);
  });

  it("has expected default values", () => {
    expect(defaultUrl.label).toBe("");
    expect(defaultUrl.href).toBe("");
  });
});
