import { describe, expect, it, vi } from "vitest";

import { JsonResumeParser } from "./index";

describe("JsonResumeParser", () => {
  let parser: JsonResumeParser;

  beforeEach(() => {
    parser = new JsonResumeParser();
  });

  describe("readFile", () => {
    it("should read and parse valid JSON file", async () => {
      const jsonData = { basics: { name: "John Doe" } };
      const file = new File([JSON.stringify(jsonData)], "resume.json", {
        type: "application/json",
      });

      const result = await parser.readFile(file);

      expect(result).toEqual(jsonData);
    });

    it("should reject on invalid JSON", async () => {
      const file = new File(["invalid json"], "resume.json", {
        type: "application/json",
      });

      await expect(parser.readFile(file)).rejects.toThrow("Failed to parse JSON");
    });

    it("should reject on file read error", async () => {
      // Create a mock file that will cause a read error
      const file = new File([], "resume.json");

      // Mock FileReader to simulate an error
      const originalFileReader = global.FileReader;
      global.FileReader = vi.fn().mockImplementation(() => ({
        readAsText: vi.fn(),
        onload: null,
        onerror: null,
        dispatchEvent: vi.fn(),
      })) as any;

      // Manually trigger error
      const reader = new global.FileReader();
      reader.onerror?.(new Event("error"));

      await expect(parser.readFile(file)).rejects.toThrow("Failed to read the file");

      // Restore original FileReader
      global.FileReader = originalFileReader;
    });
  });

  describe("validate", () => {
    it("should validate and return parsed data for valid JSON Resume", () => {
      const validData = {
        basics: {
          name: "John Doe",
          email: "john@example.com",
          summary: "A software developer",
        },
        work: [
          {
            name: "Company Inc",
            position: "Developer",
            startDate: "2020-01-01",
            endDate: "2023-01-01",
          },
        ],
      };

      const result = parser.validate(validData);

      expect(result).toHaveProperty("basics");
      expect(result.basics?.name).toBe("John Doe");
      expect(result).toHaveProperty("work");
      expect(result.work).toHaveLength(1);
    });

    it("should throw on invalid data", () => {
      const invalidData = {
        basics: {
          name: 123, // Should be string
        },
      };

      expect(() => parser.validate(invalidData)).toThrow();
    });
  });

  describe("convert", () => {
    it("should convert JSON Resume to Reactive Resume format", () => {
      const jsonResumeData = {
        basics: {
          name: "John Doe",
          label: "Software Developer",
          email: "john@example.com",
          phone: "+1234567890",
          image: "https://example.com/avatar.jpg",
          url: "https://johndoe.com",
          summary: "Experienced developer",
          location: { address: "New York, NY" },
          profiles: [
            {
              network: "GitHub",
              username: "johndoe",
              url: "https://github.com/johndoe",
            },
          ],
        },
        work: [
          {
            name: "Tech Corp",
            position: "Senior Developer",
            startDate: "2020-01-01",
            endDate: "2023-01-01",
            summary: "Developed awesome features",
            url: "https://techcorp.com",
          },
        ],
        volunteer: [
          {
            organization: "Code for Good",
            position: "Volunteer Developer",
            startDate: "2019-01-01",
            endDate: "2019-12-31",
            summary: "Built apps for non-profits",
            url: "https://codeforgood.org",
          },
        ],
        education: [
          {
            institution: "University of Tech",
            studyType: "Bachelor",
            area: "Computer Science",
            startDate: "2016-09-01",
            endDate: "2020-05-01",
            score: "3.8 GPA",
            url: "https://unitech.edu",
          },
        ],
        awards: [
          {
            title: "Employee of the Year",
            date: "2022-12-01",
            awarder: "Tech Corp",
            summary: "Outstanding performance",
          },
        ],
        certificates: [
          {
            name: "AWS Certified Developer",
            date: "2021-06-01",
            issuer: "Amazon Web Services",
            summary: "Cloud development certification",
          },
        ],
        publications: [
          {
            name: "Modern Web Development",
            publisher: "Tech Books Inc",
            releaseDate: "2022-03-01",
            summary: "A comprehensive guide",
            url: "https://books.com/modern-web-dev",
          },
        ],
        skills: [
          {
            name: "JavaScript",
            level: "Expert",
            keywords: ["React", "Node.js", "TypeScript"],
          },
        ],
        languages: [
          {
            language: "English",
            fluency: "Native",
          },
          {
            language: "Spanish",
            fluency: "Intermediate",
          },
        ],
        interests: [
          {
            name: "Open Source",
            keywords: ["contributing", "community"],
          },
        ],
        references: [
          {
            name: "Jane Smith",
            reference: "John was an excellent colleague...",
          },
        ],
      };

      const result = parser.convert(jsonResumeData);

      // Check basics
      expect(result.basics.name).toBe("John Doe");
      expect(result.basics.headline).toBe("Software Developer");
      expect(result.basics.email).toBe("john@example.com");
      expect(result.basics.phone).toBe("+1234567890");
      expect(result.basics.location).toBe("New York, NY");
      expect(result.basics.url.href).toBe("https://johndoe.com");
      expect(result.sections.summary.content).toBe("Experienced developer");

      // Check profiles
      expect(result.sections.profiles.items).toHaveLength(1);
      expect(result.sections.profiles.items[0].network).toBe("GitHub");
      expect(result.sections.profiles.items[0].username).toBe("johndoe");

      // Check work experience
      expect(result.sections.experience.items).toHaveLength(1);
      expect(result.sections.experience.items[0].company).toBe("Tech Corp");
      expect(result.sections.experience.items[0].position).toBe("Senior Developer");
      expect(result.sections.experience.items[0].date).toBe("2020-01-01 - 2023-01-01");

      // Check volunteer
      expect(result.sections.volunteer.items).toHaveLength(1);
      expect(result.sections.volunteer.items[0].organization).toBe("Code for Good");

      // Check education
      expect(result.sections.education.items).toHaveLength(1);
      expect(result.sections.education.items[0].institution).toBe("University of Tech");
      expect(result.sections.education.items[0].area).toBe("Computer Science");

      // Check awards
      expect(result.sections.awards.items).toHaveLength(1);
      expect(result.sections.awards.items[0].title).toBe("Employee of the Year");

      // Check certifications
      expect(result.sections.certifications.items).toHaveLength(1);
      expect(result.sections.certifications.items[0].name).toBe("AWS Certified Developer");

      // Check publications
      expect(result.sections.publications.items).toHaveLength(1);
      expect(result.sections.publications.items[0].name).toBe("Modern Web Development");

      // Check skills
      expect(result.sections.skills.items).toHaveLength(1);
      expect(result.sections.skills.items[0].name).toBe("JavaScript");
      expect(result.sections.skills.items[0].description).toBe("Expert");
      expect(result.sections.skills.items[0].keywords).toEqual(["React", "Node.js", "TypeScript"]);

      // Check languages
      expect(result.sections.languages.items).toHaveLength(2);
      expect(result.sections.languages.items[0].name).toBe("English");
      expect(result.sections.languages.items[1].name).toBe("Spanish");

      // Check interests
      expect(result.sections.interests.items).toHaveLength(1);
      expect(result.sections.interests.items[0].name).toBe("Open Source");

      // Check references
      expect(result.sections.references.items).toHaveLength(1);
      expect(result.sections.references.items[0].name).toBe("Jane Smith");
    });

    it("should handle empty data gracefully", () => {
      const emptyData = {};

      const result = parser.convert(emptyData);

      expect(result.basics.name).toBe("");
      expect(result.sections.profiles.items).toHaveLength(0);
      expect(result.sections.experience.items).toHaveLength(0);
    });

    it("should handle missing fields with defaults", () => {
      const minimalData = {
        basics: {
          name: "John Doe",
        },
        work: [
          {
            name: "Company",
            position: "Developer",
          },
        ],
      };

      const result = parser.convert(minimalData);

      expect(result.basics.name).toBe("John Doe");
      expect(result.sections.experience.items[0].company).toBe("Company");
      expect(result.sections.experience.items[0].position).toBe("Developer");
      expect(result.sections.experience.items[0].date).toBe("undefined - undefined");
    });
  });
});
