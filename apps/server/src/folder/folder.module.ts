import { Module } from "@nestjs/common";

import { ResumeModule } from "../resume/resume.module";
import { FolderController } from "./folder.controller";
import { FolderService } from "./folder.service";

@Module({
  imports: [ResumeModule],
  controllers: [FolderController],
  providers: [FolderService],
})
export class FolderModule {}
