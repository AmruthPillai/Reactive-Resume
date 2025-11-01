import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import type { Request } from "express";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

type ValidateUser = {
  userId: string;
  accessToken: string;
  refreshToken: string | undefined;
};

@Injectable()
export class GoogleDriveStrategy extends PassportStrategy(Strategy, "google-drive") {
  constructor(
    readonly clientID: string,
    readonly clientSecret: string,
    readonly callbackURL: string,
  ) {
    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ["https://www.googleapis.com/auth/drive.file"],
      accessType: "offline",
      prompt: "consent",
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request & { user?: { id: string } },
    accessToken: string,
    refreshToken: string,
    _profile: unknown,
    done: VerifyCallback,
  ) {
    const userId = req.user?.id;
    if (!userId) return done(new Error("Unauthorized"));

    const result: ValidateUser = { userId, accessToken, refreshToken };
    return done(null, result);
  }
}

