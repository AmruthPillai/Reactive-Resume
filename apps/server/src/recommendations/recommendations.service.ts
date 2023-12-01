import { v1beta2 } from "@google-ai/generativelanguage";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PalmGenerateTextRequest } from "@reactive-resume/schema";
import { GoogleAuth } from "google-auth-library";

import { Config } from "../config/schema";

@Injectable()
export class RecommendationsService {
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
}
