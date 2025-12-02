import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthProvidersDto, LoginDto, RegisterDto } from "@reactive-resume/dto";
import { ErrorMessage } from "@reactive-resume/utils";
import { authenticator } from "otplib";

import { Config } from "../config/schema";
import { MailService } from "../mail/mail.service";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;
  let configService: jest.Mocked<ConfigService<Config>>;
  let userService: jest.Mocked<UserService>;
  let mailService: jest.Mocked<MailService>;
  let jwtService: jest.Mocked<JwtService>;

  const mockConfig = {
    ACCESS_TOKEN_SECRET: "access-secret",
    REFRESH_TOKEN_SECRET: "refresh-secret",
    PUBLIC_URL: "http://localhost:3000",
    DISABLE_EMAIL_AUTH: false,
    GITHUB_CLIENT_ID: "github-id",
    GITHUB_CLIENT_SECRET: "github-secret",
    GITHUB_CALLBACK_URL: "http://localhost:3000/auth/github/callback",
    GOOGLE_CLIENT_ID: "google-id",
    GOOGLE_CLIENT_SECRET: "google-secret",
    GOOGLE_CALLBACK_URL: "http://localhost:3000/auth/google/callback",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn((key: keyof Config) => mockConfig[key]),
            get: jest.fn((key: string) => mockConfig[key as keyof Config]),
          },
        },
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findOneByIdentifierOrThrow: jest.fn(),
            updateByEmail: jest.fn(),
            updateByResetToken: jest.fn(),
          },
        },
        {
          provide: MailService,
          useValue: {
            sendEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    configService = module.get(ConfigService);
    userService = module.get(UserService);
    mailService = module.get(MailService);
    jwtService = module.get(JwtService);
  });

  describe("hash", () => {
    it("should hash password", async () => {
      const password = "password123";
      const hashed = await (service as any).hash(password);

      expect(hashed).toBeDefined();
      expect(typeof hashed).toBe("string");
      expect(hashed).not.toBe(password);
    });
  });

  describe("compare", () => {
    it("should return true for matching password", async () => {
      const password = "password123";
      const hashed = await (service as any).hash(password);

      const result = await (service as any).compare(password, hashed);
      expect(result).toBe(true);
    });

    it("should return false for non-matching password", async () => {
      const password = "password123";
      const hashed = await (service as any).hash(password);

      const result = await (service as any).compare("wrongpassword", hashed);
      expect(result).toBe(false);
    });
  });

  describe("validatePassword", () => {
    it("should not throw for valid password", async () => {
      const password = "password123";
      const hashed = await (service as any).hash(password);

      await expect((service as any).validatePassword(password, hashed)).resolves.not.toThrow();
    });

    it("should throw BadRequestException for invalid password", async () => {
      const password = "password123";
      const hashed = await (service as any).hash("differentpassword");

      await expect((service as any).validatePassword(password, hashed)).rejects.toThrow(
        ErrorMessage.InvalidCredentials
      );
    });
  });

  describe("generateToken", () => {
    it("should generate access token with payload", () => {
      const payload = { id: "user-id", email: "user@example.com" };
      const token = "mock-access-token";

      jwtService.sign.mockReturnValue(token as any);

      const result = service.generateToken("access", payload);

      expect(jwtService.sign).toHaveBeenCalledWith(payload, {
        secret: mockConfig.ACCESS_TOKEN_SECRET,
        expiresIn: "15m",
      });
      expect(result).toBe(token);
    });

    it("should generate refresh token with payload", () => {
      const payload = { id: "user-id", email: "user@example.com" };
      const token = "mock-refresh-token";

      jwtService.sign.mockReturnValue(token as any);

      const result = service.generateToken("refresh", payload);

      expect(jwtService.sign).toHaveBeenCalledWith(payload, {
        secret: mockConfig.REFRESH_TOKEN_SECRET,
        expiresIn: "2d",
      });
      expect(result).toBe(token);
    });

    it("should generate reset token", () => {
      const result = service.generateToken("reset");

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    it("should generate verification token", () => {
      const result = service.generateToken("verification");

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    it("should throw for access token without payload", () => {
      expect(() => service.generateToken("access")).toThrow("InvalidTokenPayload");
    });

    it("should throw for refresh token without payload", () => {
      expect(() => service.generateToken("refresh")).toThrow("InvalidTokenPayload");
    });
  });

  describe("register", () => {
    const registerDto: RegisterDto = {
      name: "John Doe",
      email: "john@example.com",
      username: "johndoe",
      locale: "en-US",
      password: "password123",
    };

    it("should register user successfully", async () => {
      const mockUser = {
        id: "user-id",
        email: "john@example.com",
        secrets: { create: { password: "hashed" } },
      };

      userService.create.mockResolvedValue(mockUser as any);

      const result = await service.register(registerDto);

      expect(userService.create).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        username: "johndoe",
        locale: "en-US",
        provider: "email",
        emailVerified: false,
        secrets: { create: { password: expect.any(String) } },
      });
      expect(result).toBe(mockUser);
    });

    it("should send verification email", async () => {
      const mockUser = {
        id: "user-id",
        email: "john@example.com",
        secrets: { create: { password: "hashed" } },
      };

      userService.create.mockResolvedValue(mockUser as any);
      mailService.sendEmail.mockResolvedValue({});

      await service.register(registerDto);

      expect(mailService.sendEmail).toHaveBeenCalledWith({
        to: "john@example.com",
        subject: "Verify your email address",
        text: expect.stringContaining("Please verify your email address"),
      });
    });

    it("should throw BadRequestException for duplicate user", async () => {
      const prismaError = new PrismaClientKnownRequestError("Unique constraint failed", {
        code: "P2002",
        clientVersion: "1.0.0",
      });

      userService.create.mockRejectedValue(prismaError);

      await expect(service.register(registerDto)).rejects.toThrow(ErrorMessage.UserAlreadyExists);
    });
  });

  describe("authenticate", () => {
    const loginDto: LoginDto = {
      identifier: "john@example.com",
      password: "password123",
    };

    it("should authenticate user successfully", async () => {
      const mockUser = {
        id: "user-id",
        email: "john@example.com",
        secrets: { password: "hashed-password" },
      };

      userService.findOneByIdentifierOrThrow.mockResolvedValue(mockUser as any);
      (service as any).compare = jest.fn().mockResolvedValue(true);

      const result = await service.authenticate(loginDto);

      expect(userService.findOneByIdentifierOrThrow).toHaveBeenCalledWith("john@example.com");
      expect(result).toBe(mockUser);
    });

    it("should throw BadRequestException for OAuth user", async () => {
      const mockUser = {
        id: "user-id",
        email: "john@example.com",
        secrets: null, // OAuth user
      };

      userService.findOneByIdentifierOrThrow.mockResolvedValue(mockUser as any);

      await expect(service.authenticate(loginDto)).rejects.toThrow(ErrorMessage.OAuthUser);
    });
  });

  describe("forgotPassword", () => {
    it("should send reset email", async () => {
      const email = "user@example.com";

      userService.updateByEmail.mockResolvedValue({} as any);
      mailService.sendEmail.mockResolvedValue({});

      await service.forgotPassword(email);

      expect(userService.updateByEmail).toHaveBeenCalledWith(email, {
        secrets: { update: { resetToken: expect.any(String) } },
      });

      expect(mailService.sendEmail).toHaveBeenCalledWith({
        to: email,
        subject: "Reset your Reactive Resume password",
        text: expect.stringContaining("reset your password"),
      });
    });
  });

  describe("resetPassword", () => {
    it("should reset password", async () => {
      const token = "reset-token";
      const password = "newpassword123";

      userService.updateByResetToken.mockResolvedValue({} as any);

      await service.resetPassword(token, password);

      expect(userService.updateByResetToken).toHaveBeenCalledWith(token, {
        resetToken: null,
        password: expect.any(String),
      });
    });
  });

  describe("getAuthProviders", () => {
    it("should return enabled providers", () => {
      const result = service.getAuthProviders();

      expect(result).toContain("email");
      expect(result).toContain("github");
      expect(result).toContain("google");
      expect(result).not.toContain("openid");
    });

    it("should exclude email when disabled", () => {
      configService.get.mockImplementation((key: string) => {
        if (key === "DISABLE_EMAIL_AUTH") return "true";
        return mockConfig[key as keyof Config];
      });

      const result = service.getAuthProviders();

      expect(result).not.toContain("email");
    });
  });

  describe("sendVerificationEmail", () => {
    it("should send verification email", async () => {
      const email = "user@example.com";

      userService.updateByEmail.mockResolvedValue({} as any);
      mailService.sendEmail.mockResolvedValue({});

      await (service as any).sendVerificationEmail(email);

      expect(userService.updateByEmail).toHaveBeenCalledWith(email, {
        secrets: { update: { verificationToken: expect.any(String) } },
      });

      expect(mailService.sendEmail).toHaveBeenCalledWith({
        to: email,
        subject: "Verify your email address",
        text: expect.stringContaining("verify your email address"),
      });
    });
  });

  describe("verifyEmail", () => {
    it("should verify email successfully", async () => {
      const id = "user-id";
      const token = "verification-token";
      const mockUser = {
        id,
        email: "user@example.com",
        secrets: { verificationToken: token },
      };

      userService.findOneById.mockResolvedValue(mockUser as any);
      userService.updateByEmail.mockResolvedValue({} as any);

      await service.verifyEmail(id, token);

      expect(userService.updateByEmail).toHaveBeenCalledWith("user@example.com", {
        emailVerified: true,
        secrets: { update: { verificationToken: null } },
      });
    });

    it("should throw for invalid token", async () => {
      const id = "user-id";
      const token = "wrong-token";
      const mockUser = {
        id,
        email: "user@example.com",
        secrets: { verificationToken: "correct-token" },
      };

      userService.findOneById.mockResolvedValue(mockUser as any);

      await expect(service.verifyEmail(id, token)).rejects.toThrow(
        ErrorMessage.InvalidVerificationToken
      );
    });
  });

  describe("Two-Factor Authentication", () => {
    describe("setup2FASecret", () => {
      it("should setup 2FA secret", async () => {
        const email = "user@example.com";
        const mockUser = { id: "user-id", email, twoFactorEnabled: false };

        userService.findOneByIdentifierOrThrow.mockResolvedValue(mockUser as any);
        userService.updateByEmail.mockResolvedValue({} as any);

        const result = await (service as any).setup2FASecret(email);

        expect(result.message).toBeDefined();
        expect(typeof result.message).toBe("string");
        expect(userService.updateByEmail).toHaveBeenCalledWith(email, {
          secrets: { update: { twoFactorSecret: expect.any(String) } },
        });
      });

      it("should throw if 2FA already enabled", async () => {
        const email = "user@example.com";
        const mockUser = { id: "user-id", email, twoFactorEnabled: true };

        userService.findOneByIdentifierOrThrow.mockResolvedValue(mockUser as any);

        await expect((service as any).setup2FASecret(email)).rejects.toThrow(
          ErrorMessage.TwoFactorAlreadyEnabled
        );
      });
    });

    describe("enable2FA", () => {
      it("should enable 2FA successfully", async () => {
        const email = "user@example.com";
        const code = "123456";
        const mockUser = {
          id: "user-id",
          email,
          twoFactorEnabled: false,
          secrets: { twoFactorSecret: "secret" },
        };

        userService.findOneByIdentifierOrThrow.mockResolvedValue(mockUser as any);
        userService.updateByEmail.mockResolvedValue({} as any);

        // Mock authenticator.verify to return true
        jest.spyOn(authenticator, "verify").mockReturnValue(true);

        const result = await (service as any).enable2FA(email, code);

        expect(result.backupCodes).toHaveLength(8);
        expect(userService.updateByEmail).toHaveBeenCalledWith(email, {
          twoFactorEnabled: true,
          secrets: { update: { twoFactorBackupCodes: expect.any(Array) } },
        });
      });

      it("should throw for invalid code", async () => {
        const email = "user@example.com";
        const code = "invalid";
        const mockUser = {
          id: "user-id",
          email,
          twoFactorEnabled: false,
          secrets: { twoFactorSecret: "secret" },
        };

        userService.findOneByIdentifierOrThrow.mockResolvedValue(mockUser as any);

        // Mock authenticator.verify to return false
        jest.spyOn(authenticator, "verify").mockReturnValue(false);

        await expect((service as any).enable2FA(email, code)).rejects.toThrow(
          ErrorMessage.InvalidTwoFactorCode
        );
      });
    });

    describe("disable2FA", () => {
      it("should disable 2FA", async () => {
        const email = "user@example.com";
        const mockUser = {
          id: "user-id",
          email,
          twoFactorEnabled: true,
        };

        userService.findOneByIdentifierOrThrow.mockResolvedValue(mockUser as any);
        userService.updateByEmail.mockResolvedValue({} as any);

        await (service as any).disable2FA(email);

        expect(userService.updateByEmail).toHaveBeenCalledWith(email, {
          twoFactorEnabled: false,
          secrets: { update: { twoFactorSecret: null, twoFactorBackupCodes: [] } },
        });
      });
    });
  });
});
