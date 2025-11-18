import { Injectable } from "@nestjs/common";
import {
  CreateFolderDto,
  MoveResumeToFolderDto,
  ResumeDto,
  UpdateFolderDto,
} from "@reactive-resume/dto";
import { PrismaService } from "nestjs-prisma";

import { ResumeService } from "../resume/resume.service";
import { FolderCountResume } from "./types";

@Injectable()
export class FolderService {
  constructor(
    private readonly prisma: PrismaService,
    private resumesService: ResumeService,
  ) {}
  async create(userId: string, createFolderDto: CreateFolderDto) {
    await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    return this.prisma.folder.create({
      data: {
        userId,
        name: createFolderDto.name,
        resumes: {
          connect: this.getResumesIds(createFolderDto.resumes),
        },
      },
    });
  }

  async findAll(userId: string) {
    await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const folders = await this.prisma.folder.findMany({
      include: {
        _count: {
          select: {
            resumes: true,
          },
        },
      },
    });

    const mappedFolders = folders.map((folder) => this.mapFolderResumesCount(folder));

    return mappedFolders;
  }

  private mapFolderResumesCount(folder: FolderCountResume) {
    const { _count, ...restFolder } = folder;
    const resumesCount = _count.resumes;
    return { ...restFolder, resumesCount };
  }

  async findOne(id: string) {
    return await this.prisma.folder.findUnique({
      where: {
        id,
      },
      include: {
        resumes: true,
      },
    });
  }

  async update(userId: string, id: string, updateFolderDto: UpdateFolderDto) {
    const folder = await this.prisma.folder.update({
      data: {
        name: updateFolderDto.name,
      },
      where: {
        userId_id: { userId, id },
      },
      include: {
        _count: {
          select: {
            resumes: true,
          },
        },
        resumes: true,
      },
    });
    const mappedFolder = this.mapFolderResumesCount(folder);
    return mappedFolder;
  }

  async moveResumeToFolder(userId: string, id: string, moveResumeDto: MoveResumeToFolderDto) {
    const resumeId = moveResumeDto.resumeId;
    let mappedSourceFolder;

    const sourceFolder = await this.prisma.folder.findFirst({
      where: {
        userId,
        resumes: {
          some: { id: resumeId },
        },
      },
      include: {
        resumes: true,
      },
    });

    if (sourceFolder) {
      const updatedSourceFolder = await this.prisma.folder.update({
        where: { userId_id: { userId, id: sourceFolder.id } },
        data: {
          resumes: {
            disconnect: { id: resumeId },
          },
        },
        include: {
          _count: {
            select: {
              resumes: true,
            },
          },
          resumes: true,
        },
      });
      mappedSourceFolder = this.mapFolderResumesCount(updatedSourceFolder);
    }

    const targetFolder = await this.prisma.folder.update({
      where: { userId_id: { userId, id } },
      data: {
        resumes: { connect: { id: resumeId } },
      },
      include: {
        _count: {
          select: {
            resumes: true,
          },
        },
        resumes: true,
      },
    });
    const mappedTargetFolder = this.mapFolderResumesCount(targetFolder);

    return { sourceFolder: mappedSourceFolder, targetFolder: mappedTargetFolder };
  }

  private getResumesIds(resumes?: Partial<ResumeDto>[]) {
    if (!Array.isArray(resumes) || resumes.length === 0) {
      return [];
    }
    const resume = resumes.map((resume) => ({
      id: resume.id,
    }));

    return resume;
  }

  async remove(id: string, userId: string, isDeleteResumes: boolean) {
    if (isDeleteResumes) {
      const folder = await this.findOne(id);
      const resumes = folder?.resumes ?? [];
      await Promise.allSettled(
        resumes.map((resume) => this.resumesService.remove(userId, resume.id)),
      );
    }
    return await this.prisma.folder.delete({
      where: {
        id,
      },
    });
  }
}
