import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { Injectable } from "@nestjs/common";
import { createId } from "@paralleldrive/cuid2";
import { resumeDataSchema } from "@reactive-resume/schema";
import { zodToJsonSchema } from 'zod-to-json-schema';
// import { v4 as uuidv4 } from "uuid";

@Injectable()
export class GenaiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY ?? "");
  }

  async convertResumeToJson(resumeText: string): Promise<any> {
    const prompt = `
        Chuyển Đổi Dữ Liệu Resume Dưới Đây Thành JSON Với Định Dạng Schema ( Zod ) Sau (Với Hàm createId() Từ "@paralleldrive/cuid2"):
          (Chỉ Chuyển Đổi Thuộc Tính "basics" và "sections" Còn Bỏ Qua "metadata", Dữ Liệu Nào Không Có Thì Trả "", 0, true Tuỳ Loại)
        ${JSON.stringify(zodToJsonSchema(resumeDataSchema))}
  
        Resume data:
        ${resumeText}
      `;

    const model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const response = await model.generateContent(prompt);

    // return JSON.stringify(zodToJsonSchema(resumeDataSchema));
    return response.response.text();
    // return response.response.text;
  }
}
