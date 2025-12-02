import { describe, expect, it } from "vitest";

import { metadataSchema, defaultMetadata, defaultLayout } from "./index";

describe("metadataSchema", () => {
  it("validates valid metadata", () => {
    const validMetadata = {
      template: "azurill",
      layout: [
        [
          ["summary", "experience"],
          ["skills", "education"]
        ]
      ],
      css: {
        value: "body { font-family: Arial; }",
        visible: true,
      },
      page: {
        margin: 20,
        format: "letter" as const,
        options: {
          breakLine: false,
          pageNumbers: false,
        },
      },
      theme: {
        background: "#f8f9fa",
        text: "#212529",
        primary: "#007bff",
      },
      typography: {
        font: {
          family: "Open Sans",
          subset: "latin",
          variants: ["regular", "italic", "700"],
          size: 16,
        },
        lineHeight: 1.6,
        hideIcons: true,
        underlineLinks: false,
      },
      notes: "Custom resume notes",
    };

    const result = metadataSchema.safeParse(validMetadata);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validMetadata);
  });

  it("applies default values", () => {
    const minimalMetadata = {
      layout: [],
      css: { value: "", visible: false },
      page: { margin: 18, format: "a4" as const, options: { breakLine: true, pageNumbers: true } },
      theme: { background: "", text: "", primary: "" },
      typography: {
        font: { subset: "", variants: [], size: 14 },
        lineHeight: 1.5,
        hideIcons: false,
        underlineLinks: true
      },
      notes: "",
    };

    const result = metadataSchema.safeParse(minimalMetadata);
    expect(result.success).toBe(true);
    expect(result.data?.template).toBe("rhyhorn");
    expect(result.data?.page.format).toBe("a4");
    expect(result.data?.typography.font.family).toBe("IBM Plex Serif");
  });

  it("validates page format enum", () => {
    const invalidMetadata = {
      layout: [],
      css: { value: "", visible: false },
      page: {
        margin: 18,
        format: "invalid-format" as any,
        options: { breakLine: true, pageNumbers: true },
      },
      theme: { background: "", text: "", primary: "" },
      typography: {
        font: { family: "", subset: "", variants: [], size: 14 },
        lineHeight: 1.5,
        hideIcons: false,
        underlineLinks: true
      },
      notes: "",
    };

    const result = metadataSchema.safeParse(invalidMetadata);
    expect(result.success).toBe(false);
    expect(result.error?.issues.some(issue => issue.path.includes("format"))).toBe(true);
  });

  it("validates layout structure", () => {
    const validLayout = [
      [
        ["summary", "experience"],
        ["skills", "education"]
      ],
      [
        ["projects"]
      ]
    ];

    const metadataWithLayout = {
      layout: validLayout,
      css: { value: "", visible: false },
      page: { margin: 18, format: "a4" as const, options: { breakLine: true, pageNumbers: true } },
      theme: { background: "", text: "", primary: "" },
      typography: {
        font: { family: "", subset: "", variants: [], size: 14 },
        lineHeight: 1.5,
        hideIcons: false,
        underlineLinks: true
      },
      notes: "",
    };

    const result = metadataSchema.safeParse(metadataWithLayout);
    expect(result.success).toBe(true);
    expect(result.data?.layout).toEqual(validLayout);
  });

  it("validates theme colors", () => {
    const metadataWithTheme = {
      layout: [],
      css: { value: "", visible: false },
      page: { margin: 18, format: "a4" as const, options: { breakLine: true, pageNumbers: true } },
      theme: {
        background: "#ffffff",
        text: "#000000",
        primary: "#ff0000",
      },
      typography: {
        font: { family: "", subset: "", variants: [], size: 14 },
        lineHeight: 1.5,
        hideIcons: false,
        underlineLinks: true
      },
      notes: "",
    };

    const result = metadataSchema.safeParse(metadataWithTheme);
    expect(result.success).toBe(true);
  });

  it("validates typography settings", () => {
    const metadataWithTypography = {
      layout: [],
      css: { value: "", visible: false },
      page: { margin: 18, format: "a4" as const, options: { breakLine: true, pageNumbers: true } },
      theme: { background: "", text: "", primary: "" },
      typography: {
        font: {
          family: "Roboto",
          subset: "latin-ext",
          variants: ["300", "regular", "500", "700"],
          size: 12,
        },
        lineHeight: 1.4,
        hideIcons: true,
        underlineLinks: false,
      },
      notes: "",
    };

    const result = metadataSchema.safeParse(metadataWithTypography);
    expect(result.success).toBe(true);
  });
});

describe("defaultLayout", () => {
  it("has expected structure", () => {
    expect(Array.isArray(defaultLayout)).toBe(true);
    expect(defaultLayout).toHaveLength(1);
    expect(Array.isArray(defaultLayout[0])).toBe(true);
    expect(defaultLayout[0]).toHaveLength(2);
  });

  it("contains expected sections", () => {
    const allSections = defaultLayout.flat(2);
    expect(allSections).toContain("profiles");
    expect(allSections).toContain("summary");
    expect(allSections).toContain("experience");
    expect(allSections).toContain("skills");
    expect(allSections).toContain("education");
  });
});

describe("defaultMetadata", () => {
  it("matches the schema structure", () => {
    const result = metadataSchema.safeParse(defaultMetadata);
    expect(result.success).toBe(true);
  });

  it("has expected default values", () => {
    expect(defaultMetadata.template).toBe("rhyhorn");
    expect(defaultMetadata.page.margin).toBe(18);
    expect(defaultMetadata.page.format).toBe("a4");
    expect(defaultMetadata.theme.primary).toBe("#dc2626");
    expect(defaultMetadata.typography.font.family).toBe("IBM Plex Serif");
    expect(defaultMetadata.typography.font.size).toBe(14);
  });

  it("has default layout", () => {
    expect(defaultMetadata.layout).toEqual(defaultLayout);
  });

  it("has default CSS", () => {
    expect(defaultMetadata.css.visible).toBe(false);
    expect(defaultMetadata.css.value).toContain("outline: 1px solid #000");
  });

  it("has default page options", () => {
    expect(defaultMetadata.page.options.breakLine).toBe(true);
    expect(defaultMetadata.page.options.pageNumbers).toBe(true);
  });
});
