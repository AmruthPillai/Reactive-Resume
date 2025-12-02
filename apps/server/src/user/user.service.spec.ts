import { InternalServerErrorException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ErrorMessage } from "@reactive-resume/utils";
import { PrismaService } from "nestjs-prisma";

import { StorageService } from "../storage/storage.service";
import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;
  let prisma: jest.Mocked<PrismaService>;
  let storageService: jest.Mocked<StorageService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUniqueOrThrow: jest.fn(),
              findUnique: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            resume: {
              deleteMany: jest.fn(),
            },
            statistics: {
              deleteMany: jest.fn(),
            },
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

    service = module.get<UserService>(UserService);
    prisma = module.get(PrismaService);
    storageService = module.get(StorageService);
  });

  describe("findOneById", () => {
    it("should return user with secrets", async () => {
      const id = "user-id";
      const mockUser = {
        id,
        email: "user@example.com",
        secrets: { password: "hashed" },
      };

      prisma.user.findUniqueOrThrow.mockResolvedValue(mockUser as any);

      const result = await service.findOneById(id);

      expect(prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id },
        include: { secrets: true },
      });

      expect(result).toBe(mockUser);
    });

    it("should throw InternalServerErrorException when secrets are null", async () => {
      const id = "user-id";
      const mockUser = {
        id,
        email: "user@example.com",
        secrets: null,
      };

      prisma.user.findUniqueOrThrow.mockResolvedValue(mockUser as any);

      await expect(service.findOneById(id)).rejects.toThrow(ErrorMessage.SecretsNotFound);
    });
  });

  describe("findOneByIdentifier", () => {
    it("should find user by email", async () => {
      const email = "user@example.com";
      const mockUser = {
        id: "user-id",
        email,
        secrets: { password: "hashed" },
      };

      prisma.user.findUnique.mockResolvedValueOnce(mockUser as any);

      const result = await service.findOneByIdentifier(email);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email },
        include: { secrets: true },
      });

      expect(result).toBe(mockUser);
    });

    it("should find user by username when email not found", async () => {
      const username = "johndoe";
      const mockUser = {
        id: "user-id",
        username,
        secrets: { password: "hashed" },
      };

      prisma.user.findUnique.mockResolvedValueOnce(null); // Email not found
      prisma.user.findUnique.mockResolvedValueOnce(mockUser as any); // Username found

      const result = await service.findOneByIdentifier(username);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: username },
        include: { secrets: true },
      });

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { username },
        include: { secrets: true },
      });

      expect(result).toBe(mockUser);
    });

    it("should return null when user not found", async () => {
      const identifier = "nonexistent@example.com";

      prisma.user.findUnique.mockResolvedValue(null);

      const result = await service.findOneByIdentifier(identifier);

      expect(result).toBeNull();
    });
  });

  describe("findOneByIdentifierOrThrow", () => {
    it("should return user when found", async () => {
      const identifier = "user@example.com";
      const mockUser = {
        id: "user-id",
        email: identifier,
        secrets: { password: "hashed" },
      };

      jest.spyOn(service, "findOneByIdentifier").mockResolvedValue(mockUser as any);

      const result = await service.findOneByIdentifierOrThrow(identifier);

      expect(result).toBe(mockUser);
    });

    it("should throw when user not found", async () => {
      const identifier = "nonexistent@example.com";

      jest.spyOn(service, "findOneByIdentifier").mockResolvedValue(null);

      await expect(service.findOneByIdentifierOrThrow(identifier)).rejects.toThrow();
    });
  });

  describe("create", () => {
    const createData = {
      name: "John Doe",
      email: "john@example.com",
      username: "johndoe",
      locale: "en-US",
      provider: "email" as any,
      emailVerified: false,
      secrets: { create: { password: "hashed" } },
    };

    it("should create user successfully", async () => {
      const mockUser = {
        id: "user-id",
        ...createData,
      };

      prisma.user.create.mockResolvedValue(mockUser as any);

      const result = await service.create(createData);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: createData,
      });

      expect(result).toBe(mockUser);
    });

    it("should throw for duplicate email", async () => {
      const prismaError = new PrismaClientKnownRequestError("Unique constraint failed", {
        code: "P2002",
        clientVersion: "1.0.0",
      });

      prisma.user.create.mockRejectedValue(prismaError);

      await expect(service.create(createData)).rejects.toThrow();
    });
  });

  describe("update", () => {
    it("should update user", async () => {
      const id = "user-id";
      const updateData = { name: "Updated Name" };
      const mockUser = { id, name: "Updated Name" };

      prisma.user.update.mockResolvedValue(mockUser as any);

      const result = await service.update(id, updateData);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });

      expect(result).toBe(mockUser);
    });
  });

  describe("updateByEmail", () => {
    it("should update user by email", async () => {
      const email = "user@example.com";
      const updateData = { name: "Updated Name" };
      const mockUser = { email, name: "Updated Name" };

      prisma.user.update.mockResolvedValue(mockUser as any);

      const result = await service.updateByEmail(email, updateData);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { email },
        data: updateData,
      });

      expect(result).toBe(mockUser);
    });
  });

  describe("updateByResetToken", () => {
    it("should update user by reset token", async () => {
      const token = "reset-token";
      const updateData = { secrets: { update: { resetToken: null } } };
      const mockUser = { id: "user-id" };

      prisma.user.update.mockResolvedValue(mockUser as any);

      const result = await service.updateByResetToken(token, updateData);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { secrets: { resetToken: token } },
        data: updateData,
      });

      expect(result).toBe(mockUser);
    });
  });

  describe("remove", () => {
    const id = "user-id";

    it("should delete user and related data", async () => {
      const mockUser = {
        id,
        email: "user@example.com",
        picture: "avatar.jpg",
      };

      prisma.user.findUniqueOrThrow.mockResolvedValue(mockUser as any);
      storageService.deleteObject.mockResolvedValue();
      prisma.resume.deleteMany.mockResolvedValue({ count: 2 });
      prisma.statistics.deleteMany.mockResolvedValue({ count: 2 });
      prisma.user.delete.mockResolvedValue(mockUser as any);

      const result = await service.remove(id);

      // Should delete avatar if exists
      expect(storageService.deleteObject).toHaveBeenCalledWith(id, "avatars", "avatar.jpg");

      // Should delete all resumes and statistics
      expect(prisma.resume.deleteMany).toHaveBeenCalledWith({ where: { userId: id } });
      expect(prisma.statistics.deleteMany).toHaveBeenCalledWith({ where: { resumeId: { in: [] } } });

      // Should delete user
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id } });

      expect(result).toBe(mockUser);
    });

    it("should not delete avatar when picture is null", async () => {
      const mockUser = {
        id,
        email: "user@example.com",
        picture: null,
      };

      prisma.user.findUniqueOrThrow.mockResolvedValue(mockUser as any);
      storageService.deleteObject.mockResolvedValue();
      prisma.resume.deleteMany.mockResolvedValue({ count: 0 });
      prisma.statistics.deleteMany.mockResolvedValue({ count: 0 });
      prisma.user.delete.mockResolvedValue(mockUser as any);

      await service.remove(id);

      // Should not delete avatar
      expect(storageService.deleteObject).not.toHaveBeenCalled();
    });

    it("should handle resumes deletion", async () => {
      const mockUser = { id, picture: null };
      const resumeIds = ["resume1", "resume2"];

      prisma.user.findUniqueOrThrow.mockResolvedValue(mockUser as any);
      prisma.resume.findFirst.mockResolvedValue(null); // No resumes found initially
      prisma.resume.deleteMany.mockResolvedValue({ count: 0 });
      prisma.statistics.deleteMany.mockResolvedValue({ count: 0 });
      prisma.user.delete.mockResolvedValue(mockUser as any);

      await service.remove(id);

      // Should attempt to delete statistics for any found resumes
      expect(prisma.statistics.deleteMany).toHaveBeenCalledWith({
        where: { resumeId: { in: [] } },
      });
    });
  });

  describe("findOneByUsername", () => {
    it("should find user by username", async () => {
      const username = "johndoe";
      const mockUser = {
        id: "user-id",
        username,
        email: "john@example.com",
      };

      prisma.user.findUnique.mockResolvedValue(mockUser as any);

      const result = await service.findOneByUsername(username);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { username },
      });

      expect(result).toBe(mockUser);
    });

    it("should return null when user not found", async () => {
      const username = "nonexistent";

      prisma.user.findUnique.mockResolvedValue(null);

      const result = await service.findOneByUsername(username);

      expect(result).toBeNull();
    });
  });

  describe("findOneByUsernameOrThrow", () => {
    it("should return user when found", async () => {
      const username = "johndoe";
      const mockUser = {
        id: "user-id",
        username,
      };

      jest.spyOn(service, "findOneByUsername").mockResolvedValue(mockUser as any);

      const result = await service.findOneByUsernameOrThrow(username);

      expect(result).toBe(mockUser);
    });

    it("should throw when user not found", async () => {
      const username = "nonexistent";

      jest.spyOn(service, "findOneByUsername").mockResolvedValue(null);

      await expect(service.findOneByUsernameOrThrow(username)).rejects.toThrow();
    });
  });

  describe("isUsernameAvailable", () => {
    it("should return true when username is available", async () => {
      const username = "newusername";

      jest.spyOn(service, "findOneByUsername").mockResolvedValue(null);

      const result = await service.isUsernameAvailable(username);

      expect(result).toBe(true);
    });

    it("should return false when username is taken", async () => {
      const username = "takenusername";

      jest.spyOn(service, "findOneByUsername").mockResolvedValue({} as any);

      const result = await service.isUsernameAvailable(username);

      expect(result).toBe(false);
    });
  });
});
