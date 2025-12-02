import { describe, expect, it } from "vitest";
import * as JSZip from "jszip";

import { LinkedInParser } from "./index";

describe("LinkedInParser", () => {
  let parser: LinkedInParser;

  beforeEach(() => {
    parser = new LinkedInParser();
  });

  describe("readFile", () => {
    it("should load valid zip file", async () => {
      const zip = new JSZip();
      zip.file("Profile.csv", "Name,John Doe\nEmail,john@example.com");

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const file = new File([zipBlob], "linkedin.zip", { type: "application/zip" });

      const result = await parser.readFile(file);

      expect(result).toBeInstanceOf(JSZip);
      expect(Object.keys(result.files)).toContain("Profile.csv");
    });

    it("should throw error for empty zip", async () => {
      const zip = new JSZip();
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const file = new File([zipBlob], "empty.zip", { type: "application/zip" });

      await expect(parser.readFile(file)).rejects.toThrow(
        "ParserError: There were no files found inside the zip archive."
      );
    });
  });

  describe("validate", () => {
    it("should validate LinkedIn data structure", async () => {
      const zip = new JSZip();

      // Add required CSV files
      zip.file("Profile.csv", "Name,John Doe\nEmail,john@example.com");
      zip.file("Positions.csv", "Name,Software Engineer\nCompany,Tech Corp");
      zip.file("Education.csv", "School Name,University\nDegree,Bachelor");
      zip.file("Skills.csv", "Name,JavaScript");
      zip.file("Projects.csv", "Name,My Project\nDescription,Project description");
      zip.file("Languages.csv", "Name,English\nProficiency,Full professional");
      zip.file("Certifications.csv", "Name,AWS Certified\nAuthority,Amazon Web Services");

      const result = await parser.validate(zip);

      expect(result).toHaveProperty("profile");
      expect(result).toHaveProperty("positions");
      expect(result).toHaveProperty("education");
      expect(result).toHaveProperty("skills");
    });

    it("should handle missing optional files", async () => {
      const zip = new JSZip();
      zip.file("Profile.csv", "Name,John Doe");

      const result = await parser.validate(zip);

      expect(result.profile).toBeDefined();
      expect(result.positions).toEqual([]);
      expect(result.education).toEqual([]);
    });
  });

  describe("convert", () => {
    it("should convert LinkedIn data to Reactive Resume format", () => {
      const linkedinData = {
        profile: {
          "First Name": "John",
          "Last Name": "Doe",
          Email: "john@example.com",
          Headline: "Software Developer",
          Summary: "Experienced developer",
          "Phone Numbers": "+1234567890",
          Websites: "https://johndoe.com",
          Address: "New York, NY",
        },
        positions: [
          {
            Name: "Senior Developer",
            Company: "Tech Corp",
            Location: "San Francisco, CA",
            "Started On": "Jan 2020",
            "Finished On": "Present",
            Description: "Developing awesome features",
          },
        ],
        education: [
          {
            "School Name": "University of Tech",
            Degree: "Bachelor of Science",
            "Field of Study": "Computer Science",
            "Started On": "Sep 2016",
            "Finished On": "May 2020",
          },
        ],
        skills: [
          { Name: "JavaScript" },
          { Name: "React" },
          { Name: "Node.js" },
        ],
        projects: [
          {
            Name: "Portfolio Website",
            Description: "Personal portfolio built with React",
            "Started On": "Jan 2023",
            "Finished On": "Mar 2023",
          },
        ],
        languages: [
          {
            Name: "English",
            Proficiency: "Full professional proficiency",
          },
        ],
        certifications: [
          {
            Name: "AWS Certified Developer",
            Authority: "Amazon Web Services",
            "Finished On": "Jun 2021",
          },
        ],
      };

      const result = parser.convert(linkedinData);

      // Check basics
      expect(result.basics.name).toBe("John Doe");
      expect(result.basics.email).toBe("john@example.com");
      expect(result.basics.headline).toBe("Software Developer");
      expect(result.basics.location).toBe("New York, NY");
      expect(result.basics.phone).toBe("+1234567890");
      expect(result.sections.summary.content).toBe("Experienced developer");

      // Check experience
      expect(result.sections.experience.items).toHaveLength(1);
      const experience = result.sections.experience.items[0];
      expect(experience.position).toBe("Senior Developer");
      expect(experience.company).toBe("Tech Corp");
      expect(experience.location).toBe("San Francisco, CA");
      expect(experience.summary).toBe("Developing awesome features");

      // Check education
      expect(result.sections.education.items).toHaveLength(1);
      const education = result.sections.education.items[0];
      expect(education.institution).toBe("University of Tech");
      expect(education.area).toBe("Computer Science");
      expect(education.studyType).toBe("Bachelor of Science");

      // Check skills
      expect(result.sections.skills.items).toHaveLength(3);
      expect(result.sections.skills.items.map(s => s.name)).toEqual(["JavaScript", "React", "Node.js"]);

      // Check projects
      expect(result.sections.projects.items).toHaveLength(1);
      const project = result.sections.projects.items[0];
      expect(project.name).toBe("Portfolio Website");
      expect(project.description).toBe("Personal portfolio built with React");

      // Check languages
      expect(result.sections.languages.items).toHaveLength(1);
      expect(result.sections.languages.items[0].name).toBe("English");

      // Check certifications
      expect(result.sections.certifications.items).toHaveLength(1);
      const cert = result.sections.certifications.items[0];
      expect(cert.name).toBe("AWS Certified Developer");
      expect(cert.issuer).toBe("Amazon Web Services");
    });

    it("should handle missing data gracefully", () => {
      const minimalData = {
        profile: {},
        positions: [],
        education: [],
        skills: [],
        projects: [],
        languages: [],
        certifications: [],
      };

      const result = parser.convert(minimalData);

      expect(result.basics.name).toBe("");
      expect(result.sections.experience.items).toHaveLength(0);
      expect(result.sections.education.items).toHaveLength(0);
    });

    it("should handle name variations", () => {
      const dataWithVariations = {
        profile: {
          "First Name": "John",
          "Last Name": "Doe",
          Name: "Jane Smith", // Should prefer this
        },
        positions: [],
        education: [],
        skills: [],
        projects: [],
        languages: [],
        certifications: [],
      };

      const result = parser.convert(dataWithVariations);

      expect(result.basics.name).toBe("Jane Smith");
    });
  });
});
