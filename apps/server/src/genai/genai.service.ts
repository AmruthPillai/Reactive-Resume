import { GoogleGenerativeAI, Schema, SchemaType } from "@google/generative-ai";
import { Injectable } from "@nestjs/common";

// import { v4 as uuidv4 } from "uuid";

const schema: Schema = {
  type: SchemaType.OBJECT,
  required: [
    "basics",
    "work",
    "volunteer",
    "education",
    "awards",
    "certificates",
    "publications",
    "skills",
    "languages",
    "interests",
    "references",
    "projects",
  ],
  // description:
  //   "Any information not present in the resume should be left as an empty string or an empty array",
  properties: {
    basics: {
      type: SchemaType.OBJECT,
      description: "Personal information of the candidate",
      required: [
        "name",
        "label",
        "image",
        // "email",
        "phone",
        "url",
        "summary",
        "location",
        "profiles",
      ],
      properties: {
        name: {
          type: SchemaType.STRING,
          description: "Fullname of the candidate",
          example: "",
        },
        label: {
          type: SchemaType.STRING,
          description: "Headline of the candidate",
          example: "",
        },
        image: {
          type: SchemaType.STRING,
          description: "Must be empty",
          example: "",
        },
        email: {
          type: SchemaType.STRING,
          description: "Email of the candidate (Empty if no information available)",
          example: "",
          // nullable: true,
        },
        phone: {
          type: SchemaType.STRING,
          description: "Phone of the candidate (Empty if no information available)",
          example: "",
        },
        url: {
          type: SchemaType.STRING,
          description: "External link of the candidate (Empty if no information available)",
          example: "(URL must start with https://)",
        },
        summary: {
          type: SchemaType.STRING,
          description: String.raw`Summary of the candidate (New line using \n)`,
          example: "",
        },
        location: {
          type: SchemaType.OBJECT,
          description: "Location information of the candidate",
          required: ["address", "postalCode", "city", "countryCode", "region"],
          properties: {
            address: {
              type: SchemaType.STRING,
              description: "Address of the candidate (Empty if no information available)",
              example: "",
            },
            postalCode: {
              type: SchemaType.STRING,
              description: "Postal Code of candidate's address (Empty if no information available)",
              example: "",
            },
            city: {
              type: SchemaType.STRING,
              description: "City of the candidate (Empty if no information available)",
              example: "",
            },
            countryCode: {
              type: SchemaType.STRING,
              description: "Country code of the candidate (Empty if no information available)",
              example: "",
            },
            region: {
              type: SchemaType.STRING,
              description: "Region of the candidate (Empty if no information available)",
              example: "",
            },
          },
        },
        profiles: {
          type: SchemaType.ARRAY,
          example: [],
          items: {
            type: SchemaType.OBJECT,
            description: "Social media of the candidate",
            required: ["network", "username", "url"],
            properties: {
              network: {
                type: SchemaType.STRING,
                description: "Social media platform",
              },
              username: {
                type: SchemaType.STRING,
                description: "Username of the candidate",
              },
              url: {
                type: SchemaType.STRING,
                description: "Link to the candidate's profile page (URL must start with https://)",
              },
            },
          },
        },
      },
    },
    work: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        description: "Work experience of the candidate",
        required: ["name", "position", "url", "startDate", "endDate", "summary", "highlights"],
        properties: {
          name: {
            type: SchemaType.STRING,
            description: "The name of the company where the candidate worked",
          },
          position: {
            type: SchemaType.STRING,
            description: "The job title or role the candidate held at the company",
          },
          url: {
            type: SchemaType.STRING,
            description: "The official website of the company (URL must start with https://)",
          },
          startDate: {
            type: SchemaType.STRING,
            description: "The date when the candidate started the position at the company",
          },
          endDate: {
            type: SchemaType.STRING,
            description: "The date when the candidate ended the position at the company",
          },
          summary: {
            type: SchemaType.STRING,
            description: String.raw`A brief description of the candidate's overall responsibilities, tasks, and contributions in the role (New line using \n)`,
          },
          highlights: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.STRING,
              description:
                "Key achievements or notable milestones the candidate accomplished during their time at the company",
            },
          },
        },
      },
    },
    volunteer: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        description: "Volunteer information of the candidate",
        required: [
          "organization",
          "position",
          "url",
          "startDate",
          "endDate",
          "summary",
          "highlights",
        ],
        properties: {
          organization: {
            type: SchemaType.STRING,
            description: "The name of the organization where the candidate volunteered",
          },
          position: {
            type: SchemaType.STRING,
            description: "The role or title the candidate held as a volunteer in the organization",
          },
          url: {
            type: SchemaType.STRING,
            description:
              "The official website link of the organization (URL must start with https://)",
          },
          startDate: {
            type: SchemaType.STRING,
            description: "The date when the candidate started volunteering at the organization",
          },
          endDate: {
            type: SchemaType.STRING,
            description: "The date when the candidate ended volunteering at the organization",
          },
          summary: {
            type: SchemaType.STRING,
            description: String.raw`A brief description of the candidate's duties, responsibilities, and contributions during their volunteer role or any other information about volunteer of the candidate (New line using \n)`,
          },
          highlights: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.STRING,
              description:
                "Key achievements or notable recognitions the candidate received during their volunteer experience",
            },
          },
        },
      },
    },
    education: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        description: "Education information of the candidate",
        required: [
          "institution",
          "url",
          "area",
          "studyType",
          "startDate",
          "endDate",
          "score",
          "courses",
        ],
        properties: {
          institution: {
            type: SchemaType.STRING,
            description: "The name of the educational institution where the candidate studied",
          },
          url: {
            type: SchemaType.STRING,
            description:
              "The official website of the educational institution (URL must start with https://)",
          },
          area: {
            type: SchemaType.STRING,
            description: "The field or major the candidate studied",
            example: "Software Development",
          },
          studyType: {
            type: SchemaType.STRING,
            description: "The type of degree or qualification the candidate pursued",
            example: "Bachelor",
          },
          startDate: {
            type: SchemaType.STRING,
            description: "The date when the candidate started their studies at the institution",
          },
          endDate: {
            type: SchemaType.STRING,
            description: "The date when the candidate ended their studies at the institution",
          },
          score: {
            type: SchemaType.STRING,
            description:
              "The academic score or grade point average achieved by the candidate during their studies",
          },
          courses: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.STRING,
              description: "List of significant courses the candidate took during their education",
              example: "DB1101 - Basic SQL",
            },
          },
        },
      },
    },
    awards: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        description: "Awards received by the candidate",
        required: ["title", "date", "awarder", "summary"],
        properties: {
          title: {
            type: SchemaType.STRING,
            description: "The title of the award",
          },
          date: {
            type: SchemaType.STRING,
            description: "The date when the award was received",
          },
          awarder: {
            type: SchemaType.STRING,
            description: "The organization or entity that awarded the title",
          },
          summary: {
            type: SchemaType.STRING,
            description: String.raw`A brief description or context of the award (New line using \n)`,
          },
        },
      },
    },
    certificates: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        description: "Certificates earned by the candidate",
        required: ["name", "date", "issuer", "url"],
        properties: {
          name: {
            type: SchemaType.STRING,
            description: "The name of the certificate",
          },
          date: {
            type: SchemaType.STRING,
            description: "The date when the certificate was issued",
          },
          issuer: {
            type: SchemaType.STRING,
            description: "The entity or organization that issued the certificate",
          },
          url: {
            type: SchemaType.STRING,
            description:
              "The link to more information or the certificate itself (URL must start with https://)",
          },
        },
      },
    },
    publications: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        description: "Publications by the candidate",
        required: ["name", "publisher", "releaseDate", "url", "summary"],
        properties: {
          name: {
            type: SchemaType.STRING,
            description: "The name or title of the publication",
          },
          publisher: {
            type: SchemaType.STRING,
            description: "The publisher of the publication",
          },
          releaseDate: {
            type: SchemaType.STRING,
            description: "The date the publication was released",
          },
          url: {
            type: SchemaType.STRING,
            description: "The link to the publication (URL must start with https://)",
          },
          summary: {
            type: SchemaType.STRING,
            description: String.raw`A brief summary of the publication (New line using \n)`,
          },
        },
      },
    },
    skills: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        description: "Skills of the candidate",
        required: ["name", "level", "keywords"],
        properties: {
          name: {
            type: SchemaType.STRING,
            description: "The name of the skill",
          },
          level: {
            type: SchemaType.STRING,
            description: "The proficiency level in the skill",
          },
          keywords: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.STRING,
              description: "Must Be Empty",
            },
          },
        },
      },
    },
    languages: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        description: "Languages spoken by the candidate",
        required: ["language", "fluency"],
        properties: {
          language: {
            type: SchemaType.STRING,
            description: "The language spoken by the candidate",
          },
          fluency: {
            type: SchemaType.STRING,
            description: "The level of fluency in the language",
          },
        },
      },
    },
    interests: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        description: "Interests and hobbies of the candidate",
        required: ["name", "keywords"],
        properties: {
          name: {
            type: SchemaType.STRING,
            description: "The name of the interest or hobby",
          },
          keywords: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.STRING,
              description: "Related keywords or aspects of the interest",
            },
          },
        },
      },
    },
    references: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        description: "References for the candidate",
        required: ["name", "reference"],
        properties: {
          name: {
            type: SchemaType.STRING,
            description: "The name of the person providing the reference",
          },
          reference: {
            type: SchemaType.STRING,
            description: "The reference or recommendation provided",
          },
        },
      },
    },
    projects: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        description: "Projects completed by the candidate",
        required: ["name", "startDate", "endDate", "description", "highlights", "url"],
        properties: {
          name: {
            type: SchemaType.STRING,
            description: "The name or title of the project",
          },
          startDate: {
            type: SchemaType.STRING,
            description: "The date when the project started",
          },
          endDate: {
            type: SchemaType.STRING,
            description: "The date when the project ended",
          },
          description: {
            type: SchemaType.STRING,
            description: "Description of the project",
          },
          highlights: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.STRING,
              description: "Key achievements or highlights of the project",
            },
          },
          url: {
            type: SchemaType.STRING,
            description:
              "The link to the project or more information about it (URL must start with https://)",
          },
        },
      },
    },
  },
};

@Injectable()
export class GenaiService {
  private genAI: GoogleGenerativeAI;
  // private fileManager: GoogleAIFileManager;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY ?? "");
    // this.fileManager = new GoogleAIFileManager(process.env.GENAI_API_KEY ?? "");
  }

  async convertResumeToJson(str: string): Promise<any> {
    const prompt = `
      Lọc Ra Các Trường Phù Hợp Tương Ứng Với Dữ Liệu Resume Sau Và Những Trường Được Required Mà Không Có Dữ Liệu Thì Trả Về Chuỗi Rỗng Hoặc Mảng Rỗng (Lưu Ý Là Lấy Tất Cả Các Dữ Liệu Có Thể Trong Resume):
      Resume Text: ${str}
      Return the output in valid JSON format. Ensure the JSON is properly formatted with correct syntax so that JSON.parse can be used.
    `;

    const model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash-exp-0827",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    // const uploadResponse = await this.fileManager.uploadFile(str, {
    //   mimeType: "application/pdf",
    //   displayName: "Gemini 1.5 PDF",
    // });

    // const response = await model.generateContent([
    //   { text: prompt },
    //   {
    //     fileData: {
    //       mimeType: uploadResponse.file.mimeType,
    //       fileUri: uploadResponse.file.uri,
    //     },
    //   },
    // ]);

    const response = await model.generateContent(prompt);

    // return JSON.stringify(zodToJsonSchema(resumeDataSchema));
    return response.response.text();
    // return response.response.text;
  }
}
