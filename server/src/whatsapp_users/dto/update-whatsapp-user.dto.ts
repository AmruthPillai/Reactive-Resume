import { PartialType } from '@nestjs/mapped-types';

import { CreateWhatsappUserDto } from './create--whatsapp-user.dto';

export class UpdateWhatsAppUserDto extends PartialType(CreateWhatsappUserDto) {}
