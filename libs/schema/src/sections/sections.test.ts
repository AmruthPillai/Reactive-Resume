import { describe, expect, it } from "vitest";

import { sectionsSchema, defaultSections, defaultSection } from "./index";

describe("sectionSchema", () => {
  it("validates valid section data", () => {
    const validSection = {
      id: "experience",
      name: "Experience",
      columns: 2,
      separateLinks: false,
      visible: true,
      items: [],
    };

    const result = sectionsSchema.safeParse({
      ...defaultSections,
      experience: validSection,
    });
    expect(result.success).toBe(true);
  });

  it("applies default values", () => {
    const minimalSection = {
      id: "experience",
      name: "Experience",
      items: [],
    };

    const result = sectionsSchema.safeParse({
      ...defaultSections,
      experience: minimalSection,
    });
    expect(result.success).toBe(true);
    expect(result.data?.experience.columns).toBe(1);
    expect(result.data?.experience.separateLinks).toBe(true);
    expect(result.data?.experience.visible).toBe(true);
  });

  it("validates column constraints", () => {
    const invalidSection = {
      id: "experience",
      name: "Experience",
      columns: 10, // Max is 5
      items: [],
    };

    const result = sectionsSchema.safeParse({
      ...defaultSections,
      experience: invalidSection,
    });
    expect(result.success).toBe(false);
  });
});

describe("sectionsSchema", () => {
  it("validates complete sections object", () => {
    const result = sectionsSchema.safeParse(defaultSections);
    expect(result.success).toBe(true);
  });

  it("validates sections with custom sections", () => {
    const sectionsWithCustom = {
      ...defaultSections,
      custom: {
        "custom-1": {
          id: "12345678901234567890123456789012", // Valid CUID2
          name: "Custom Section",
          columns: 1,
          separateLinks: true,
          visible: true,
          items: [],
        },
      },
    };

    const result = sectionsSchema.safeParse(sectionsWithCustom);
    expect(result.success).toBe(true);
  });

  it("validates sections with items", () => {
    const sectionsWithItems = {
      ...defaultSections,
      experience: {
        ...defaultSections.experience,
        items: [
          {
            id: "12345678901234567890123456789012",
            visible: true,
            company: "Tech Corp",
            position: "Developer",
            location: "Remote",
            date: "2020 - Present",
            summary: "Building awesome software",
            url: {
              label: "",
              href: "https://techcorp.com",
            },
          },
        ],
      },
    };

    const result = sectionsSchema.safeParse(sectionsWithItems);
    expect(result.success).toBe(true);
    expect(result.data?.experience.items).toHaveLength(1);
  });

  it("enforces section ID literals", () => {
    const invalidSections = {
      ...defaultSections,
      experience: {
        ...defaultSections.experience,
        id: "wrong-id", // Should be "experience"
      },
    };

    const result = sectionsSchema.safeParse(invalidSections);
    expect(result.success).toBe(false);
  });

  it("validates summary section with content", () => {
    const sectionsWithSummary = {
      ...defaultSections,
      summary: {
        ...defaultSections.summary,
        content: "Experienced software engineer with 5+ years...",
      },
    };

    const result = sectionsSchema.safeParse(sectionsWithSummary);
    expect(result.success).toBe(true);
    expect(result.data?.summary.content).toBe("Experienced software engineer with 5+ years...");
  });
});

describe("defaultSection", () => {
  it("has expected default values", () => {
    expect(defaultSection.name).toBe("");
    expect(defaultSection.columns).toBe(1);
    expect(defaultSection.separateLinks).toBe(true);
    expect(defaultSection.visible).toBe(true);
  });
});

describe("defaultSections", () => {
  it("matches the schema structure", () => {
    const result = sectionsSchema.safeParse(defaultSections);
    expect(result.success).toBe(true);
  });

  it("has all required sections", () => {
    const sectionKeys = Object.keys(defaultSections);
    expect(sectionKeys).toContain("summary");
    expect(sectionKeys).toContain("experience");
    expect(sectionKeys).toContain("education");
    expect(sectionKeys).toContain("skills");
    expect(sectionKeys).toContain("projects");
  });

  it("has correct section IDs", () => {
    expect(defaultSections.experience.id).toBe("experience");
    expect(defaultSections.education.id).toBe("education");
    expect(defaultSections.summary.id).toBe("summary");
  });

  it("has empty items arrays by default", () => {
    expect(defaultSections.experience.items).toEqual([]);
    expect(defaultSections.education.items).toEqual([]);
    expect(defaultSections.skills.items).toEqual([]);
  });

  it("has empty custom sections object", () => {
    expect(defaultSections.custom).toEqual({});
  });
});
