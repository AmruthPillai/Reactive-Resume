import { v1beta2 } from "@google-ai/generativelanguage";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PalmGenerateTextRequest, PalmSuggestionResponse } from "@reactive-resume/schema";
import { GoogleAuth } from "google-auth-library";

import { Config } from "../../config/schema";
import { PROMPT } from "./palm.prompt";

@Injectable()
export class PalmService {
  readonly palm_key: string;
  readonly palm_modal_name: string;

  constructor(private readonly configService: ConfigService<Config>) {
    this.palm_key = this.configService.get("PALM_API_KEY") || "";
    this.palm_modal_name = this.configService.get("PALM_MODEL_NAME") || "";
  }

  async getTextRecommendation(palmReq: PalmGenerateTextRequest) {
    const client = new v1beta2.TextServiceClient({
      authClient: new GoogleAuth().fromAPIKey(this.palm_key),
    });
    const result = await client.generateText(palmReq);
    return result;
  }
  async getRecommendation(
    jobTitle: string,
    section: "summary" | "education" | "experience",
  ): Promise<PalmSuggestionResponse> {
    const client = new v1beta2.TextServiceClient({
      authClient: new GoogleAuth().fromAPIKey(this.palm_key),
    });
    const text = PROMPT[section].replace("{input}", jobTitle);
    const data = await client.generateText({
      model: "models/text-bison-001",
      prompt: {
        text,
      },
      stopSequences: ['"""'],
    });

    if (!data[0].candidates || !data[0].candidates[0].output) {
      throw new Error(`AI did not return any choices for your text.`);
    }

    try {
      const result = data[0].candidates[0].output;
      return JSON.parse(result) as PalmSuggestionResponse;
    } catch {
      throw new Error(`AI did not return a valid JSON.`);
    }
  }
}
