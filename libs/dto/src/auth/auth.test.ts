import { describe, expect, it } from "vitest";

import { LoginDto, loginSchema } from "./login";
import { RegisterDto, registerSchema } from "./register";
import { ForgotPasswordDto } from "./forgot-password";
import { ResetPasswordDto } from "./reset-password";
import { UpdatePasswordDto } from "./update-password";
import { AuthProvidersDto } from "./providers";

describe("LoginDto", () => {
  it("validates valid email login", () => {
    const validLogin = {
      identifier: "user@example.com",
      password: "password123",
    };

    const result = loginSchema.safeParse(validLogin);
    expect(result.success).toBe(true);
    expect(result.data.identifier).toBe("user@example.com"); // Should remain lowercase
    expect(result.data.password).toBe("password123");
  });

  it("validates valid username login", () => {
    const validLogin = {
      identifier: "testuser",
      password: "password123",
    };

    const result = loginSchema.safeParse(validLogin);
    expect(result.success).toBe(true);
    expect(result.data.identifier).toBe("testuser");
  });

  it("transforms identifier to lowercase", () => {
    const loginWithUppercase = {
      identifier: "USER@EXAMPLE.COM",
      password: "password123",
    };

    const result = loginSchema.safeParse(loginWithUppercase);
    expect(result.success).toBe(true);
    expect(result.data.identifier).toBe("user@example.com");
  });

  it("rejects invalid email format", () => {
    const invalidLogin = {
      identifier: "invalid-email",
      password: "password123",
    };

    const result = loginSchema.safeParse(invalidLogin);
    expect(result.success).toBe(false);
  });

  it("rejects invalid username format", () => {
    const invalidLogin = {
      identifier: "user@name", // Invalid username character
      password: "password123",
    };

    const result = loginSchema.safeParse(invalidLogin);
    expect(result.success).toBe(false);
  });

  it("rejects password too short", () => {
    const invalidLogin = {
      identifier: "user@example.com",
      password: "12345", // Too short
    };

    const result = loginSchema.safeParse(invalidLogin);
    expect(result.success).toBe(false);
  });
});

describe("RegisterDto", () => {
  it("validates valid registration", () => {
    const validRegistration = {
      name: "John Doe",
      email: "john@example.com",
      username: "johndoe",
      locale: "en-US",
      password: "password123",
    };

    const result = registerSchema.safeParse(validRegistration);
    expect(result.success).toBe(true);
    expect(result.data.email).toBe("john@example.com"); // Should be lowercase
    expect(result.data.username).toBe("johndoe"); // Should be lowercase
  });

  it("applies default locale", () => {
    const registrationWithoutLocale = {
      name: "John Doe",
      email: "john@example.com",
      username: "johndoe",
      password: "password123",
    };

    const result = registerSchema.safeParse(registrationWithoutLocale);
    expect(result.success).toBe(true);
    expect(result.data.locale).toBe("en-US");
  });

  it("rejects invalid email", () => {
    const invalidRegistration = {
      name: "John Doe",
      email: "invalid-email",
      username: "johndoe",
      password: "password123",
    };

    const result = registerSchema.safeParse(invalidRegistration);
    expect(result.success).toBe(false);
  });

  it("rejects invalid username", () => {
    const invalidRegistration = {
      name: "John Doe",
      email: "john@example.com",
      username: "user@name", // Invalid character
      password: "password123",
    };

    const result = registerSchema.safeParse(invalidRegistration);
    expect(result.success).toBe(false);
  });

  it("rejects username too short", () => {
    const invalidRegistration = {
      name: "John Doe",
      email: "john@example.com",
      username: "ab", // Too short
      password: "password123",
    };

    const result = registerSchema.safeParse(invalidRegistration);
    expect(result.success).toBe(false);
  });

  it("rejects empty name", () => {
    const invalidRegistration = {
      name: "",
      email: "john@example.com",
      username: "johndoe",
      password: "password123",
    };

    const result = registerSchema.safeParse(invalidRegistration);
    expect(result.success).toBe(false);
  });

  it("rejects password too short", () => {
    const invalidRegistration = {
      name: "John Doe",
      email: "john@example.com",
      username: "johndoe",
      password: "12345", // Too short
    };

    const result = registerSchema.safeParse(invalidRegistration);
    expect(result.success).toBe(false);
  });
});

describe("ForgotPasswordDto", () => {
  it("validates valid email", () => {
    const validForgotPassword = {
      email: "user@example.com",
    };

    const result = ForgotPasswordDto.createSchema().safeParse(validForgotPassword);
    expect(result.success).toBe(true);
    expect(result.data.email).toBe("user@example.com");
  });

  it("rejects invalid email", () => {
    const invalidForgotPassword = {
      email: "invalid-email",
    };

    const result = ForgotPasswordDto.createSchema().safeParse(invalidForgotPassword);
    expect(result.success).toBe(false);
  });
});

describe("ResetPasswordDto", () => {
  it("validates valid reset data", () => {
    const validResetPassword = {
      token: "reset-token-123",
      password: "newpassword123",
    };

    const result = ResetPasswordDto.createSchema().safeParse(validResetPassword);
    expect(result.success).toBe(true);
  });

  it("rejects password too short", () => {
    const invalidResetPassword = {
      token: "reset-token-123",
      password: "12345", // Too short
    };

    const result = ResetPasswordDto.createSchema().safeParse(invalidResetPassword);
    expect(result.success).toBe(false);
  });
});

describe("UpdatePasswordDto", () => {
  it("validates valid password update", () => {
    const validUpdatePassword = {
      currentPassword: "oldpassword123",
      newPassword: "newpassword123",
    };

    const result = UpdatePasswordDto.createSchema().safeParse(validUpdatePassword);
    expect(result.success).toBe(true);
  });

  it("rejects new password too short", () => {
    const invalidUpdatePassword = {
      currentPassword: "oldpassword123",
      newPassword: "12345", // Too short
    };

    const result = UpdatePasswordDto.createSchema().safeParse(invalidUpdatePassword);
    expect(result.success).toBe(false);
  });
});

describe("AuthProvidersDto", () => {
  it("validates array of providers", () => {
    const validProviders: AuthProvidersDto = ["email", "github", "google"];

    const result = AuthProvidersDto.createSchema().safeParse(validProviders);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validProviders);
  });

  it("validates empty array", () => {
    const emptyProviders: AuthProvidersDto = [];

    const result = AuthProvidersDto.createSchema().safeParse(emptyProviders);
    expect(result.success).toBe(true);
    expect(result.data).toEqual([]);
  });

  it("rejects invalid provider", () => {
    const invalidProviders = ["email", "invalid-provider"];

    const result = AuthProvidersDto.createSchema().safeParse(invalidProviders);
    expect(result.success).toBe(false);
  });
});
