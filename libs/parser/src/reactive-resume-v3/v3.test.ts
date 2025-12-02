import { describe, expect, it } from "vitest";

import { ReactiveResumeV3Parser } from "./index";

describe("ReactiveResumeV3Parser", () => {
  let parser: ReactiveResumeV3Parser;

  beforeEach(() => {
    parser = new ReactiveResumeV3Parser();
  });

  describe("readFile", () => {
    it("should read and parse valid JSON file", async () => {
      const jsonData = {
        basics: { name: "John Doe", email: "john@example.com" },
        sections: {},
      };
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
  });

  describe("validate", () => {
    it("should validate Reactive Resume V3 data", () => {
      const validData = {
        basics: {
          name: "John Doe",
          email: "john@example.com",
          phone: "+1234567890",
          headline: "Software Developer",
          photo: { url: "https://example.com/avatar.jpg" },
          summary: "Experienced developer",
          location: { address: "New York, NY" },
          profiles: [],
        },
        sections: {
          work: { items: [] },
          education: { items: [] },
          skills: { items: [] },
          projects: { items: [] },
          awards: { items: [] },
          certifications: { items: [] },
          languages: { items: [] },
          interests: { items: [] },
          volunteer: { items: [] },
          publications: { items: [] },
          references: { items: [] },
        },
      };

      const result = parser.validate(validData);

      expect(result.basics.name).toBe("John Doe");
      expect(result.basics.email).toBe("john@example.com");
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
    it("should convert Reactive Resume V3 data to current format", () => {
      const v3Data = {
        basics: {
          name: "John Doe",
          email: "john@example.com",
          phone: "+1234567890",
          headline: "Senior Software Developer",
          photo: { url: "https://example.com/avatar.jpg" },
          summary: "Experienced full-stack developer",
          location: { address: "San Francisco, CA" },
          profiles: [
            {
              network: "GitHub",
              username: "johndoe",
              url: "https://github.com/johndoe",
            },
            {
              network: "LinkedIn",
              username: "john-doe",
              url: "https://linkedin.com/in/john-doe",
            },
          ],
        },
        sections: {
          work: {
            items: [
              {
                name: "Tech Corp",
                position: "Senior Developer",
                summary: "Led development of key features",
                date: { start: "2020-01-01", end: "2023-12-31" },
                url: "https://techcorp.com",
              },
            ],
          },
          education: {
            items: [
              {
                institution: "University of Tech",
                degree: "Bachelor of Science",
                area: "Computer Science",
                score: "3.8 GPA",
                summary: "Graduated with honors",
                date: { start: "2016-09-01", end: "2020-05-01" },
                url: "https://unitech.edu",
              },
            ],
          },
          skills: {
            items: [
              {
                name: "JavaScript",
                level: "Expert",
                levelNum: 8,
                keywords: ["React", "Node.js", "TypeScript"],
              },
              {
                name: "Python",
                level: "Intermediate",
                levelNum: 6,
                keywords: ["Django", "Flask"],
              },
            ],
          },
          projects: {
            items: [
              {
                name: "Portfolio Website",
                description: "Personal portfolio built with Next.js",
                summary: "Showcase of my work and experience",
                date: { start: "2023-01-01", end: "2023-03-01" },
                keywords: ["React", "Next.js", "Tailwind"],
                url: "https://johndoe.dev",
              },
            ],
          },
          awards: {
            items: [
              {
                title: "Employee of the Year",
                awarder: "Tech Corp",
                date: "2022-12-01",
                summary: "Outstanding performance and leadership",
                url: "https://techcorp.com/awards",
              },
            ],
          },
          certifications: {
            items: [
              {
                name: "AWS Certified Solutions Architect",
                issuer: "Amazon Web Services",
                date: "2021-06-15",
                summary: "Professional cloud architecture certification",
                url: "https://aws.amazon.com/certification",
              },
            ],
          },
          languages: {
            items: [
              {
                name: "English",
                level: "Native",
                levelNum: 10,
              },
              {
                name: "Spanish",
                level: "Intermediate",
                levelNum: 6,
              },
            ],
          },
          interests: {
            items: [
              {
                name: "Open Source",
                keywords: ["contributing", "community", "GitHub"],
              },
            ],
          },
          volunteer: {
            items: [
              {
                organization: "Code for Good",
                position: "Volunteer Developer",
                summary: "Built apps for non-profit organizations",
                date: { start: "2019-01-01", end: "2019-12-31" },
                url: "https://codeforgood.org",
              },
            ],
          },
          publications: {
            items: [
              {
                name: "Modern React Patterns",
                summary: "Article about advanced React patterns",
                date: "2022-08-15",
                url: "https://medium.com/modern-react-patterns",
              },
            ],
          },
          references: {
            items: [
              {
                name: "Jane Smith",
                summary: "John was an outstanding team member...",
                relationship: "Former Manager",
              },
            ],
          },
        },
      };

      const result = parser.convert(v3Data);

      // Check basics
      expect(result.basics.name).toBe("John Doe");
      expect(result.basics.email).toBe("john@example.com");
      expect(result.basics.phone).toBe("+1234567890");
      expect(result.basics.headline).toBe("Senior Software Developer");
      expect(result.basics.location).toBe("San Francisco, CA");
      expect(result.basics.picture.url).toBe("https://example.com/avatar.jpg");
      expect(result.sections.summary.content).toBe("Experienced full-stack developer");

      // Check profiles
      expect(result.sections.profiles.items).toHaveLength(2);
      expect(result.sections.profiles.items[0].network).toBe("GitHub");
      expect(result.sections.profiles.items[0].username).toBe("johndoe");
      expect(result.sections.profiles.items[1].network).toBe("LinkedIn");

      // Check work experience
      expect(result.sections.experience.items).toHaveLength(1);
      const experience = result.sections.experience.items[0];
      expect(experience.company).toBe("Tech Corp");
      expect(experience.position).toBe("Senior Developer");
      expect(experience.summary).toBe("Led development of key features");
      expect(experience.date).toBe("2020-01-01 - 2023-12-31");

      // Check education
      expect(result.sections.education.items).toHaveLength(1);
      const education = result.sections.education.items[0];
      expect(education.institution).toBe("University of Tech");
      expect(education.studyType).toBe("Bachelor of Science");
      expect(education.area).toBe("Computer Science");
      expect(education.score).toBe("3.8 GPA");

      // Check skills
      expect(result.sections.skills.items).toHaveLength(2);
      expect(result.sections.skills.items[0].name).toBe("JavaScript");
      expect(result.sections.skills.items[0].level).toBe(4); // levelNum 8 / 2 = 4
      expect(result.sections.skills.items[0].description).toBe("Expert");
      expect(result.sections.skills.items[0].keywords).toEqual(["React", "Node.js", "TypeScript"]);

      // Check projects
      expect(result.sections.projects.items).toHaveLength(1);
      const project = result.sections.projects.items[0];
      expect(project.name).toBe("Portfolio Website");
      expect(project.description).toBe("Personal portfolio built with Next.js");
      expect(project.summary).toBe("Showcase of my work and experience");
      expect(project.keywords).toEqual(["React", "Next.js", "Tailwind"]);

      // Check awards
      expect(result.sections.awards.items).toHaveLength(1);
      const award = result.sections.awards.items[0];
      expect(award.title).toBe("Employee of the Year");
      expect(award.awarder).toBe("Tech Corp");

      // Check certifications
      expect(result.sections.certifications.items).toHaveLength(1);
      const cert = result.sections.certifications.items[0];
      expect(cert.name).toBe("AWS Certified Solutions Architect");
      expect(cert.issuer).toBe("Amazon Web Services");

      // Check languages
      expect(result.sections.languages.items).toHaveLength(2);
      expect(result.sections.languages.items[0].name).toBe("English");
      expect(result.sections.languages.items[0].level).toBe(5); // levelNum 10 / 2 = 5
      expect(result.sections.languages.items[1].name).toBe("Spanish");

      // Check interests
      expect(result.sections.interests.items).toHaveLength(1);
      expect(result.sections.interests.items[0].name).toBe("Open Source");

      // Check volunteer
      expect(result.sections.volunteer.items).toHaveLength(1);
      const volunteer = result.sections.volunteer.items[0];
      expect(volunteer.organization).toBe("Code for Good");
      expect(volunteer.position).toBe("Volunteer Developer");

      // Check publications
      expect(result.sections.publications.items).toHaveLength(1);
      const publication = result.sections.publications.items[0];
      expect(publication.name).toBe("Modern React Patterns");

      // Check references
      expect(result.sections.references.items).toHaveLength(1);
      const reference = result.sections.references.items[0];
      expect(reference.name).toBe("Jane Smith");
      expect(reference.description).toBe("Former Manager");
    });

    it("should handle missing data gracefully", () => {
      const minimalData = {
        basics: {
          name: "John Doe",
          email: "john@example.com",
          photo: { url: "" },
          summary: "",
          location: { address: "" },
          profiles: [],
        },
        sections: {},
      };

      const result = parser.convert(minimalData);

      expect(result.basics.name).toBe("John Doe");
      expect(result.basics.email).toBe("john@example.com");
      expect(result.sections.experience.items).toHaveLength(0);
      expect(result.sections.education.items).toHaveLength(0);
    });

    it("should handle string summary in basics", () => {
      const dataWithStringSummary = {
        basics: {
          name: "John Doe",
          email: "john@example.com",
          photo: { url: "" },
          summary: "This is a string summary",
          location: { address: "" },
          profiles: [],
        },
        sections: {},
      };

      const result = parser.convert(dataWithStringSummary);

      expect(result.sections.summary.content).toBe("This is a string summary");
    });

    it("should handle object summary in basics", () => {
      const dataWithObjectSummary = {
        basics: {
          name: "John Doe",
          email: "john@example.com",
          photo: { url: "" },
          summary: { body: "This is an object summary" },
          location: { address: "" },
          profiles: [],
        },
        sections: {},
      };

      const result = parser.convert(dataWithObjectSummary);

      expect(result.sections.summary.content).toBe("This is an object summary");
    });
  });
});
