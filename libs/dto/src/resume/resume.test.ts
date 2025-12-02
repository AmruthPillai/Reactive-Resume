import { describe, expect, it } from "vitest";

import { CreateResumeDto, createResumeSchema } from "./create";
import { UpdateResumeDto, updateResumeSchema } from "./update";
import { ResumeDto, resumeSchema } from "./resume";
import { ImportResumeDto } from "./import";

describe("CreateResumeDto", () => {
  it("validates valid resume creation", () => {
    const validCreateResume = {
      title: "Software Engineer Resume",
      slug: "software-engineer-resume",
      visibility: "private" as const,
    };

    const result = createResumeSchema.safeParse(validCreateResume);
    expect(result.success).toBe(true);
    expect(result.data.title).toBe("Software Engineer Resume");
    expect(result.data.slug).toBe("software-engineer-resume");
    expect(result.data.visibility).toBe("private");
  });

  it("applies default visibility", () => {
    const createWithoutVisibility = {
      title: "My Resume",
    };

    const result = createResumeSchema.safeParse(createWithoutVisibility);
    expect(result.success).toBe(true);
    expect(result.data.visibility).toBe("private");
  });

  it("transforms slug from title", () => {
    const createWithTitleOnly = {
      title: "My Awesome Resume!",
    };

    const result = createResumeSchema.safeParse(createWithTitleOnly);
    expect(result.success).toBe(true);
    expect(result.data.slug).toBe("my-awesome-resume");
  });

  it("generates random slug for invalid title", () => {
    const createWithInvalidTitle = {
      title: "!!!", // Only special characters
    };

    const result = createResumeSchema.safeParse(createWithInvalidTitle);
    expect(result.success).toBe(true);
    expect(result.data.slug).toMatch(/^[a-z0-9]{24}$/); // CUID2 format
  });

  it("rejects empty title", () => {
    const invalidCreate = {
      title: "",
    };

    const result = createResumeSchema.safeParse(invalidCreate);
    expect(result.success).toBe(false);
  });

  it("rejects invalid visibility", () => {
    const invalidCreate = {
      title: "My Resume",
      visibility: "invalid" as any,
    };

    const result = createResumeSchema.safeParse(invalidCreate);
    expect(result.success).toBe(false);
  });
});

describe("UpdateResumeDto", () => {
  it("allows partial updates", () => {
    const partialUpdate = {
      title: "Updated Title",
    };

    const result = updateResumeSchema.safeParse(partialUpdate);
    expect(result.success).toBe(true);
    expect(result.data.title).toBe("Updated Title");
  });

  it("allows empty update object", () => {
    const emptyUpdate = {};

    const result = updateResumeSchema.safeParse(emptyUpdate);
    expect(result.success).toBe(true);
  });

  it("validates visibility enum when provided", () => {
    const updateWithVisibility = {
      visibility: "public" as const,
    };

    const result = updateResumeSchema.safeParse(updateWithVisibility);
    expect(result.success).toBe(true);
    expect(result.data.visibility).toBe("public");
  });

  it("rejects invalid visibility", () => {
    const invalidUpdate = {
      visibility: "invalid" as any,
    };

    const result = updateResumeSchema.safeParse(invalidUpdate);
    expect(result.success).toBe(false);
  });
});

describe("ResumeDto", () => {
  it("validates complete resume data", () => {
    const validResume = {
      id: "12345678901234567890123456789012",
      title: "Software Engineer Resume",
      slug: "software-engineer-resume",
      data: {
        basics: {
          name: "John Doe",
          headline: "",
          email: "",
          phone: "",
          location: "",
          url: { label: "", href: "" },
          customFields: [],
          picture: { url: "", effects: {} },
        },
        sections: {
          summary: { id: "summary", name: "Summary", columns: 1, separateLinks: true, visible: true, content: "" },
          experience: { id: "experience", name: "Experience", columns: 1, separateLinks: true, visible: true, items: [] },
          education: { id: "education", name: "Education", columns: 1, separateLinks: true, visible: true, items: [] },
          skills: { id: "skills", name: "Skills", columns: 1, separateLinks: true, visible: true, items: [] },
          projects: { id: "projects", name: "Projects", columns: 1, separateLinks: true, visible: true, items: [] },
          awards: { id: "awards", name: "Awards", columns: 1, separateLinks: true, visible: true, items: [] },
          certifications: { id: "certifications", name: "Certifications", columns: 1, separateLinks: true, visible: true, items: [] },
          volunteer: { id: "volunteer", name: "Volunteering", columns: 1, separateLinks: true, visible: true, items: [] },
          interests: { id: "interests", name: "Interests", columns: 1, separateLinks: true, visible: true, items: [] },
          languages: { id: "languages", name: "Languages", columns: 1, separateLinks: true, visible: true, items: [] },
          profiles: { id: "profiles", name: "Profiles", columns: 1, separateLinks: true, visible: true, items: [] },
          publications: { id: "publications", name: "Publications", columns: 1, separateLinks: true, visible: true, items: [] },
          references: { id: "references", name: "References", columns: 1, separateLinks: true, visible: true, items: [] },
          custom: {},
        },
        metadata: {
          template: "rhyhorn",
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
        },
      },
      visibility: "private" as const,
      locked: false,
      userId: "12345678901234567890123456789012",
      user: undefined,
      createdAt: new Date("2023-01-01T00:00:00Z"),
      updatedAt: new Date("2023-01-01T00:00:00Z"),
    };

    const result = resumeSchema.safeParse(validResume);
    expect(result.success).toBe(true);
  });

  it("validates resume with public visibility", () => {
    const publicResume = {
      id: "12345678901234567890123456789012",
      title: "Public Resume",
      slug: "public-resume",
      data: {}, // Minimal data for test
      visibility: "public" as const,
      locked: false,
      userId: "12345678901234567890123456789012",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = resumeSchema.safeParse(publicResume);
    expect(result.success).toBe(true);
    expect(result.data.visibility).toBe("public");
  });

  it("validates locked resume", () => {
    const lockedResume = {
      id: "12345678901234567890123456789012",
      title: "Locked Resume",
      slug: "locked-resume",
      data: {},
      visibility: "private" as const,
      locked: true,
      userId: "12345678901234567890123456789012",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = resumeSchema.safeParse(lockedResume);
    expect(result.success).toBe(true);
    expect(result.data.locked).toBe(true);
  });
});

describe("ImportResumeDto", () => {
  it("validates valid import data", () => {
    const validImport = {
      title: "Imported Resume",
      data: {
        basics: {
          name: "Jane Doe",
          headline: "",
          email: "",
          phone: "",
          location: "",
          url: { label: "", href: "" },
          customFields: [],
          picture: { url: "", effects: {} },
        },
        sections: {},
        metadata: {},
      },
    };

    const result = ImportResumeDto.createSchema().safeParse(validImport);
    expect(result.success).toBe(true);
  });

  it("makes title optional in import", () => {
    const importWithoutTitle = {
      data: {
        basics: {
          name: "Jane Doe",
          headline: "",
          email: "",
          phone: "",
          location: "",
          url: { label: "", href: "" },
          customFields: [],
          picture: { url: "", effects: {} },
        },
        sections: {},
        metadata: {},
      },
    };

    const result = ImportResumeDto.createSchema().safeParse(importWithoutTitle);
    expect(result.success).toBe(true);
  });
});
