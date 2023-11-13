import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LanguageDto } from "@reactive-resume/dto";

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

  async fetchTranslations(locale: string) {
    const distributionHash = this.configService.get("CROWDIN_DISTRIBUTION_HASH");
    const response = await this.httpService.axiosRef.get(
      `https://distributions.crowdin.net/${distributionHash}/content/${locale}/messages.json`,
    );

    return response.data;
  }

  async fetchLanguages() {
    const projectId = this.configService.get("CROWDIN_PROJECT_ID");
    const accessToken = this.configService.get("CROWDIN_ACCESS_TOKEN");

    const response = await this.httpService.axiosRef.get(
      `https://api.crowdin.com/api/v2/projects/${projectId}/languages/progress?limit=100`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    const { data } = response.data as CrowdinResponse;

    return data.map(({ data }) => {
      return {
        id: data.language.id,
        name: data.language.name,
        progress: data.translationProgress,
        editorCode: data.language.editorCode,
        locale: data.language.locale,
      } satisfies LanguageDto;
    });
  }
}
