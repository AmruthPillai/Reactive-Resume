import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Language, languages } from "@reactive-resume/utils";

import { Config } from "../config/schema";

type CrowdinResponse = {
  data: {
    data: {
      language: { id: string; name: string; locale: string; editorCode: string };
      translationProgress: number;
    };
  }[];
};

@Injectable()
export class TranslationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<Config>,
  ) {}

  async fetchLanguages() {
    const isDevelopment = this.configService.get("NODE_ENV") === "development";

    try {
      const projectId = this.configService.getOrThrow("CROWDIN_PROJECT_ID");
      const accessToken = this.configService.getOrThrow("CROWDIN_ACCESS_TOKEN");

      const response = await this.httpService.axiosRef.get(
        `https://api.crowdin.com/api/v2/projects/${projectId}/languages/progress?limit=100`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      const { data } = response.data as CrowdinResponse;

      if (isDevelopment) {
        data.push({
          data: {
            language: {
              id: "zu-ZA",
              locale: "zu-ZA",
              editorCode: "zuza",
              name: "Psuedo Locale",
            },
            translationProgress: 100,
          },
        });
      }

      return data.map(({ data }) => {
        return {
          id: data.language.id,
          name: data.language.name,
          progress: data.translationProgress,
          editorCode: data.language.editorCode,
          locale: data.language.locale,
        } satisfies Language;
      });
    } catch (error) {
      return languages;
    }
  }
}
