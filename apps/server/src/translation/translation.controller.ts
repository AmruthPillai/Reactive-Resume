import { Controller, Get } from "@nestjs/common";

import { TranslationService } from "./translation.service";

@Controller("translation")
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Get("/languages")
  async languages() {
    return this.translationService.fetchLanguages();
  }
}
