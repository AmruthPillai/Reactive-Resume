import { describe, expect, it } from "vitest";

import { UpdateUserDto, updateUserSchema } from "./update-user";
import { UserDto, userSchema, UserWithSecrets, userWithSecretsSchema, usernameSchema } from "./user";

describe("usernameSchema", () => {
  it("validates valid username", () => {
    const validUsernames = ["testuser", "user123", "user.name", "user-name", "user_name"];

    validUsernames.forEach(username => {
      const result = usernameSchema.safeParse(username);
      expect(result.success).toBe(true);
      expect(result.data).toBe(username.toLowerCase());
    });
  });

  it("transforms to lowercase", () => {
    const result = usernameSchema.safeParse("TestUser");
    expect(result.success).toBe(true);
    expect(result.data).toBe("testuser");
  });

  it("rejects username too short", () => {
    const result = usernameSchema.safeParse("ab");
    expect(result.success).toBe(false);
  });

  it("rejects username too long", () => {
    const longUsername = "a".repeat(256);
    const result = usernameSchema.safeParse(longUsername);
    expect(result.success).toBe(false);
  });

  it("rejects invalid characters", () => {
    const invalidUsernames = ["user@name", "user name", "user!name", "user#name"];

    invalidUsernames.forEach(username => {
      const result = usernameSchema.safeParse(username);
      expect(result.success).toBe(false);
    });
  });
});

describe("userSchema", () => {
  it("validates complete user data", () => {
    const validUser = {
      id: "12345678901234567890123456789012",
      name: "John Doe",
      picture: "https://example.com/avatar.jpg",
      username: "johndoe",
      email: "john@example.com",
      locale: "en-US",
      emailVerified: true,
      twoFactorEnabled: false,
      provider: "email" as const,
      createdAt: new Date("2023-01-01T00:00:00Z"),
      updatedAt: new Date("2023-01-01T00:00:00Z"),
    };

    const result = userSchema.safeParse(validUser);
    expect(result.success).toBe(true);
    expect(result.data.email).toBe("john@example.com"); // Lowercase
    expect(result.data.username).toBe("johndoe"); // Lowercase
  });

  it("applies default values", () => {
    const minimalUser = {
      id: "12345678901234567890123456789012",
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = userSchema.safeParse(minimalUser);
    expect(result.success).toBe(true);
    expect(result.data.locale).toBe("en-US");
    expect(result.data.emailVerified).toBe(false);
    expect(result.data.twoFactorEnabled).toBe(false);
    expect(result.data.provider).toBe("email");
  });

  it("validates null picture", () => {
    const userWithNullPicture = {
      id: "12345678901234567890123456789012",
      name: "John Doe",
      picture: null,
      username: "johndoe",
      email: "john@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = userSchema.safeParse(userWithNullPicture);
    expect(result.success).toBe(true);
    expect(result.data.picture).toBeNull();
  });

  it("validates empty picture string", () => {
    const userWithEmptyPicture = {
      id: "12345678901234567890123456789012",
      name: "John Doe",
      picture: "",
      username: "johndoe",
      email: "john@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = userSchema.safeParse(userWithEmptyPicture);
    expect(result.success).toBe(true);
    expect(result.data.picture).toBe("");
  });

  it("transforms email to lowercase", () => {
    const userWithUppercaseEmail = {
      id: "12345678901234567890123456789012",
      name: "John Doe",
      username: "johndoe",
      email: "JOHN@EXAMPLE.COM",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = userSchema.safeParse(userWithUppercaseEmail);
    expect(result.success).toBe(true);
    expect(result.data.email).toBe("john@example.com");
  });

  it("rejects invalid email", () => {
    const invalidUser = {
      id: "12345678901234567890123456789012",
      name: "John Doe",
      username: "johndoe",
      email: "invalid-email",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = userSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });

  it("rejects invalid username", () => {
    const invalidUser = {
      id: "12345678901234567890123456789012",
      name: "John Doe",
      username: "user@name",
      email: "john@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = userSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });

  it("rejects empty name", () => {
    const invalidUser = {
      id: "12345678901234567890123456789012",
      name: "",
      username: "johndoe",
      email: "john@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = userSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });

  it("rejects invalid provider", () => {
    const invalidUser = {
      id: "12345678901234567890123456789012",
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      provider: "invalid" as any,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = userSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });
});

describe("userWithSecretsSchema", () => {
  it("validates user with secrets", () => {
    const userWithSecrets = {
      id: "12345678901234567890123456789012",
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      secrets: {
        id: "12345678901234567890123456789012",
        password: "hashedpassword",
        lastSignedIn: new Date(),
        verificationToken: null,
        twoFactorSecret: null,
        twoFactorBackupCodes: [],
        refreshToken: null,
        resetToken: null,
        userId: "12345678901234567890123456789012",
      },
    };

    const result = userWithSecretsSchema.safeParse(userWithSecrets);
    expect(result.success).toBe(true);
  });

  it("allows null secrets", () => {
    const userWithoutSecrets = {
      id: "12345678901234567890123456789012",
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      secrets: null,
    };

    const result = userWithSecretsSchema.safeParse(userWithoutSecrets);
    expect(result.success).toBe(true);
    expect(result.data.secrets).toBeNull();
  });
});

describe("UpdateUserDto", () => {
  it("allows partial user updates", () => {
    const partialUpdate = {
      name: "Updated Name",
    };

    const result = updateUserSchema.safeParse(partialUpdate);
    expect(result.success).toBe(true);
    expect(result.data.name).toBe("Updated Name");
  });

  it("validates multiple fields update", () => {
    const multiFieldUpdate = {
      name: "Updated Name",
      locale: "fr-FR",
      email: "newemail@example.com",
    };

    const result = updateUserSchema.safeParse(multiFieldUpdate);
    expect(result.success).toBe(true);
    expect(result.data.email).toBe("newemail@example.com");
    expect(result.data.locale).toBe("fr-FR");
  });

  it("validates email format in update", () => {
    const invalidUpdate = {
      email: "invalid-email",
    };

    const result = updateUserSchema.safeParse(invalidUpdate);
    expect(result.success).toBe(false);
  });

  it("validates username format in update", () => {
    const invalidUpdate = {
      username: "user@name",
    };

    const result = updateUserSchema.safeParse(invalidUpdate);
    expect(result.success).toBe(false);
  });

  it("allows null picture", () => {
    const updateWithNullPicture = {
      picture: null,
    };

    const result = updateUserSchema.safeParse(updateWithNullPicture);
    expect(result.success).toBe(true);
    expect(result.data.picture).toBeNull();
  });

  it("allows URL picture", () => {
    const updateWithUrlPicture = {
      picture: "https://example.com/new-avatar.jpg",
    };

    const result = updateUserSchema.safeParse(updateWithUrlPicture);
    expect(result.success).toBe(true);
    expect(result.data.picture).toBe("https://example.com/new-avatar.jpg");
  });
});
