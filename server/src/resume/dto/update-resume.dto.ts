import { PartialType } from '@nestjs/mapped-types';

import { Resume } from '../entities/resume.entity';

export class UpdateResumeDto extends PartialType(Resume) {}
