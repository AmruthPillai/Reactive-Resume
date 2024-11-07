import { GoogleGenerativeAI } from "@google/generative-ai";
import { Injectable } from "@nestjs/common";
import { resumeDataSchema } from "@reactive-resume/schema";
import { zodToJsonSchema } from "zod-to-json-schema";

import { AnyObject } from "../resume/types";
// import { v4 as uuidv4 } from "uuid";

@Injectable()
export class GenaiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY ?? "");
  }

  async convertResumeToJson(resumeText: string): Promise<any> {
    const prompt = `
        Lọc Ra Các Trường Phù Hợp Tương Ứng Với Dữ Liệu Resume Sau:

        Resume data:
        ${resumeText}

        Return the output in valid JSON format. Ensure the JSON is properly formatted with correct syntax so that JSON.parse can be used.
      `;

    const model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        // responseSchema: zodToJsonSchema(resumeDataSchema) as ResponseSchema,
      },
    });

    const response = await model.generateContent(prompt);

    // return JSON.stringify(zodToJsonSchema(resumeDataSchema));
    return response.response.text();
    // return response.response.text;
  }
}
