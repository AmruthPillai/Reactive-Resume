import { Controller, Get, Render } from '@nestjs/common';

@Controller('mail')
export class MailController {
  @Get('forgot-password')
  @Render('forgot-password')
  forgotPassword() {
    return { name: 'Amruth', url: 'https://amruthpillai.com/' };
  }
}
