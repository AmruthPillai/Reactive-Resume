import { Controller, Get, Param } from "@nestjs/common";

import { UtilsService } from "../utils/utils.service";
import { TranslationService } from "./translation.service";

@Controller("translation")
export class TranslationController {
  constructor(
    private readonly translationService: TranslationService,
    private readonly utils: UtilsService,
  ) {}

  @Get("/languages")
  async languages() {
    return this.utils.getCachedOrSet(
      `translation:languages`,
      async () => this.translationService.fetchLanguages(),
      1000 * 60 * 60 * 24, // 24 hours
    );
  }

  @Get("/:locale")
  async translation(@Param("locale") locale: string) {
    return this.utils.getCachedOrSet(
      `translation:${locale}`,
      async () => this.translationService.fetchTranslations(locale),
      1000 * 60 * 60 * 24, // 24 hours
    );
  }
}
