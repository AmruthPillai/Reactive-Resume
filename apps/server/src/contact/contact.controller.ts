import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ContactService } from "./contact.service";
import { ContactDto } from "./dto/contact.dto";

@ApiTags("Contact")
@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async sendContactEmail(@Body() contactDto: ContactDto) {
    await this.contactService.sendContactEmail(contactDto);
    return { success: true };
  }
}
