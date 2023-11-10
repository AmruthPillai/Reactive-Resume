import { HttpService } from "@nestjs/axios";
import { Controller, Get, Header, Param } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Config } from "../config/schema";
import { UtilsService } from "../utils/utils.service";

@Controller("translation")
export class TranslationController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<Config>,
    private readonly utils: UtilsService,
  ) {}

  private async fetchTranslations(locale: string) {
    const distributionHash = this.configService.get("CROWDIN_DISTRIBUTION_HASH");
    const response = await this.httpService.axiosRef.get(
      `https://distributions.crowdin.net/${distributionHash}/content/${locale}/messages.json`,
    );

    return response.data;
  }

  @Get("/:locale")
  @Header("Content-Type", "application/octet-stream")
  @Header("Content-Disposition", 'attachment; filename="messages.po"')
  async getTranslation(@Param("locale") locale: string) {
    return this.utils.getCachedOrSet(
      `translation:${locale}`,
      async () => this.fetchTranslations(locale),
      1000 * 60 * 60 * 24, // 24 hours
    );
  }
}
