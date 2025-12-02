import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateResumeDto, ImportResumeDto, UpdateResumeDto } from "@reactive-resume/dto";
import { defaultResumeData } from "@reactive-resume/schema";
import { ErrorMessage } from "@reactive-resume/utils";
import slugify from "@sindresorhus/slugify";
import deepmerge from "deepmerge";
import { PrismaService } from "nestjs-prisma";

import { PrinterService } from "../printer/printer.service";
import { StorageService } from "../storage/storage.service";
import { ResumeService } from "./resume.service";

describe("ResumeService", () => {
  let service: ResumeService;
  let prisma: jest.Mocked<PrismaService>;
  let printerService: jest.Mocked<PrinterService>;
  let storageService: jest.Mocked<StorageService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResumeService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUniqueOrThrow: jest.fn(),
            },
            resume: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              findFirstOrThrow: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            statistics: {
              upsert: jest.fn(),
            },
          },
        },
        {
          provide: PrinterService,
          useValue: {
            printResume: jest.fn(),
            printPreview: jest.fn(),
          },
        },
        {
          provide: StorageService,
          useValue: {
            deleteObject: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ResumeService>(ResumeService);
    prisma = module.get(PrismaService);
    printerService = module.get(PrinterService);
    storageService = module.get(StorageService);
  });

  describe("create", () => {
    const userId = "user-id";
    const createResumeDto: CreateResumeDto = {
      title: "My Resume",
      visibility: "private",
    };

    it("should create resume successfully", async () => {
      const mockUser = {
        name: "John Doe",
        email: "john@example.com",
        picture: "avatar.jpg",
      };

      const mockResume = {
        id: "resume-id",
        title: "My Resume",
        slug: "my-resume",
        visibility: "private",
        data: {},
      };

      prisma.user.findUniqueOrThrow.mockResolvedValue(mockUser as any);
      prisma.resume.create.mockResolvedValue(mockResume as any);

      const result = await service.create(userId, createResumeDto);

      expect(prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: userId },
        select: { name: true, email: true, picture: true },
      });

      expect(prisma.resume.create).toHaveBeenCalledWith({
        data: {
          data: deepmerge(defaultResumeData, {
            basics: {
              name: mockUser.name,
              email: mockUser.email,
              picture: { url: mockUser.picture },
            },
          }),
          userId,
          title: createResumeDto.title,
          visibility: createResumeDto.visibility,
          slug: slugify(createResumeDto.title),
        },
      });

      expect(result).toBe(mockResume);
    });

    it("should handle null picture", async () => {
      const mockUser = {
        name: "John Doe",
        email: "john@example.com",
        picture: null,
      };

      prisma.user.findUniqueOrThrow.mockResolvedValue(mockUser as any);
      prisma.resume.create.mockResolvedValue({} as any);

      await service.create(userId, createResumeDto);

      expect(prisma.resume.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          data: deepmerge(defaultResumeData, {
            basics: {
              name: mockUser.name,
              email: mockUser.email,
              picture: { url: "" },
            },
          }),
        }),
      });
    });

    it("should use custom slug when provided", async () => {
      const dtoWithSlug: CreateResumeDto = {
        title: "My Resume",
        visibility: "private",
        slug: "custom-slug",
      };

      const mockUser = {
        name: "John Doe",
        email: "john@example.com",
        picture: null,
      };

      prisma.user.findUniqueOrThrow.mockResolvedValue(mockUser as any);
      prisma.resume.create.mockResolvedValue({} as any);

      await service.create(userId, dtoWithSlug);

      expect(prisma.resume.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          slug: "custom-slug",
        }),
      });
    });
  });

  describe("import", () => {
    const userId = "user-id";
    const importResumeDto: ImportResumeDto = {
      title: "Imported Resume",
      data: {
        basics: {
          name: "Jane Doe",
          email: "",
          phone: "",
          location: "",
          url: { label: "", href: "" },
          customFields: [],
          picture: { url: "", effects: {} },
        },
        sections: {},
        metadata: {},
      },
    };

    it("should import resume with provided title", async () => {
      const mockResume = {
        id: "resume-id",
        title: "Imported Resume",
        slug: "imported-resume",
        visibility: "private",
      };

      prisma.resume.create.mockResolvedValue(mockResume as any);

      const result = await service.import(userId, importResumeDto);

      expect(prisma.resume.create).toHaveBeenCalledWith({
        data: {
          userId,
          visibility: "private",
          data: importResumeDto.data,
          title: importResumeDto.title,
          slug: slugify(importResumeDto.title!),
        },
      });

      expect(result).toBe(mockResume);
    });

    it("should generate random title when not provided", async () => {
      const dtoWithoutTitle: ImportResumeDto = {
        data: importResumeDto.data,
      };

      prisma.resume.create.mockResolvedValue({} as any);

      await service.import(userId, dtoWithoutTitle);

      expect(prisma.resume.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: expect.any(String),
          slug: expect.any(String),
        }),
      });
    });
  });

  describe("findAll", () => {
    it("should return user resumes ordered by updatedAt", async () => {
      const userId = "user-id";
      const mockResumes = [
        { id: "1", updatedAt: new Date("2023-01-02") },
        { id: "2", updatedAt: new Date("2023-01-01") },
      ];

      prisma.resume.findMany.mockResolvedValue(mockResumes as any);

      const result = await service.findAll(userId);

      expect(prisma.resume.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });

      expect(result).toBe(mockResumes);
    });
  });

  describe("findOne", () => {
    it("should find resume by id", async () => {
      const id = "resume-id";
      const mockResume = { id, title: "Test Resume" };

      prisma.resume.findUniqueOrThrow.mockResolvedValue(mockResume as any);

      const result = await service.findOne(id);

      expect(prisma.resume.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id },
      });

      expect(result).toBe(mockResume);
    });

    it("should find resume by userId and id", async () => {
      const id = "resume-id";
      const userId = "user-id";
      const mockResume = { id, title: "Test Resume" };

      prisma.resume.findUniqueOrThrow.mockResolvedValue(mockResume as any);

      const result = await service.findOne(id, userId);

      expect(prisma.resume.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { userId_id: { userId, id } },
      });

      expect(result).toBe(mockResume);
    });
  });

  describe("findOneStatistics", () => {
    it("should return statistics", async () => {
      const id = "resume-id";
      const mockStats = { views: 10, downloads: 5 };

      prisma.statistics.findFirst.mockResolvedValue(mockStats as any);

      const result = await service.findOneStatistics(id);

      expect(prisma.statistics.findFirst).toHaveBeenCalledWith({
        select: { views: true, downloads: true },
        where: { resumeId: id },
      });

      expect(result).toEqual(mockStats);
    });

    it("should return default statistics when none found", async () => {
      const id = "resume-id";

      prisma.statistics.findFirst.mockResolvedValue(null);

      const result = await service.findOneStatistics(id);

      expect(result).toEqual({
        views: 0,
        downloads: 0,
      });
    });
  });

  describe("findOneByUsernameSlug", () => {
    const username = "johndoe";
    const slug = "my-resume";

    it("should find public resume by username and slug", async () => {
      const mockResume = {
        id: "resume-id",
        title: "My Resume",
        user: { username },
      };

      prisma.resume.findFirstOrThrow.mockResolvedValue(mockResume as any);

      const result = await service.findOneByUsernameSlug(username, slug);

      expect(prisma.resume.findFirstOrThrow).toHaveBeenCalledWith({
        where: {
          user: { username },
          slug,
          visibility: "public",
        },
      });

      expect(result).toBe(mockResume);
    });

    it("should increment view count when accessed by non-owner", async () => {
      const mockResume = { id: "resume-id", user: { username } };

      prisma.resume.findFirstOrThrow.mockResolvedValue(mockResume as any);
      prisma.statistics.upsert.mockResolvedValue({} as any);

      await service.findOneByUsernameSlug(username, slug);

      expect(prisma.statistics.upsert).toHaveBeenCalledWith({
        where: { resumeId: mockResume.id },
        create: { views: 1, downloads: 0, resumeId: mockResume.id },
        update: { views: { increment: 1 } },
      });
    });

    it("should not increment view count when accessed by owner", async () => {
      const userId = "owner-id";
      const mockResume = { id: "resume-id", user: { username } };

      prisma.resume.findFirstOrThrow.mockResolvedValue(mockResume as any);

      await service.findOneByUsernameSlug(username, slug, userId);

      expect(prisma.statistics.upsert).not.toHaveBeenCalled();
    });
  });

  describe("update", () => {
    const userId = "user-id";
    const id = "resume-id";
    const updateResumeDto: UpdateResumeDto = {
      title: "Updated Title",
      visibility: "public",
    };

    it("should update resume successfully", async () => {
      const mockResume = {
        id,
        locked: false,
        title: "Updated Title",
      };

      prisma.resume.findUniqueOrThrow.mockResolvedValue({ locked: false } as any);
      prisma.resume.update.mockResolvedValue(mockResume as any);

      const result = await service.update(userId, id, updateResumeDto);

      expect(prisma.resume.update).toHaveBeenCalledWith({
        data: {
          title: updateResumeDto.title,
          slug: updateResumeDto.slug,
          visibility: updateResumeDto.visibility,
          data: updateResumeDto.data as any,
        },
        where: { userId_id: { userId, id } },
      });

      expect(result).toBe(mockResume);
    });

    it("should throw BadRequestException for locked resume", async () => {
      prisma.resume.findUniqueOrThrow.mockResolvedValue({ locked: true } as any);

      await expect(service.update(userId, id, updateResumeDto)).rejects.toThrow(
        ErrorMessage.ResumeLocked
      );
    });
  });

  describe("lock", () => {
    it("should lock resume", async () => {
      const userId = "user-id";
      const id = "resume-id";
      const set = true;

      prisma.resume.update.mockResolvedValue({} as any);

      const result = await service.lock(userId, id, set);

      expect(prisma.resume.update).toHaveBeenCalledWith({
        data: { locked: set },
        where: { userId_id: { userId, id } },
      });

      expect(result).toBeDefined();
    });
  });

  describe("remove", () => {
    it("should delete resume and clean up storage", async () => {
      const userId = "user-id";
      const id = "resume-id";

      storageService.deleteObject.mockResolvedValue();
      prisma.resume.delete.mockResolvedValue({} as any);

      const result = await service.remove(userId, id);

      expect(storageService.deleteObject).toHaveBeenCalledWith(userId, "resumes", id);
      expect(storageService.deleteObject).toHaveBeenCalledWith(userId, "previews", id);
      expect(prisma.resume.delete).toHaveBeenCalledWith({
        where: { userId_id: { userId, id } },
      });

      expect(result).toBeDefined();
    });
  });

  describe("printResume", () => {
    it("should print resume and update download statistics", async () => {
      const resume = { id: "resume-id", title: "Test Resume" } as any;
      const userId = "user-id";
      const mockUrl = "https://example.com/resume.pdf";

      printerService.printResume.mockResolvedValue(mockUrl);
      prisma.statistics.upsert.mockResolvedValue({} as any);

      const result = await service.printResume(resume, userId);

      expect(printerService.printResume).toHaveBeenCalledWith(resume);
      expect(prisma.statistics.upsert).not.toHaveBeenCalled(); // Should not update when userId provided
      expect(result).toBe(mockUrl);
    });

    it("should increment download count for anonymous access", async () => {
      const resume = { id: "resume-id", title: "Test Resume" } as any;
      const mockUrl = "https://example.com/resume.pdf";

      printerService.printResume.mockResolvedValue(mockUrl);
      prisma.statistics.upsert.mockResolvedValue({} as any);

      const result = await service.printResume(resume);

      expect(prisma.statistics.upsert).toHaveBeenCalledWith({
        where: { resumeId: resume.id },
        create: { views: 0, downloads: 1, resumeId: resume.id },
        update: { downloads: { increment: 1 } },
      });

      expect(result).toBe(mockUrl);
    });
  });

  describe("printPreview", () => {
    it("should delegate to printer service", async () => {
      const resume = { id: "resume-id" } as any;
      const mockResult = "preview-data";

      printerService.printPreview.mockResolvedValue(mockResult);

      const result = await service.printPreview(resume);

      expect(printerService.printPreview).toHaveBeenCalledWith(resume);
      expect(result).toBe(mockResult);
    });
  });
});
