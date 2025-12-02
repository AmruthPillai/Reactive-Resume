import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ErrorMessage } from "@reactive-resume/utils";

import { Config } from "../../config/schema";
import { Payload } from "../utils/payload";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
  ) {}

  generateAccessToken(payload: Payload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow("ACCESS_TOKEN_SECRET"),
      expiresIn: "15m",
    });
  }

  generateRefreshToken(payload: Payload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow("REFRESH_TOKEN_SECRET"),
      expiresIn: "2d",
    });
  }

  generateResetToken(): string {
    return require("crypto").randomBytes(32).toString("hex");
  }

  generateVerificationToken(): string {
    return require("crypto").randomBytes(32).toString("hex");
  }

  generateRandomToken(): string {
    return require("crypto").randomBytes(32).toString("hex");
  }

  verifyAccessToken(token: string): Payload {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.getOrThrow("ACCESS_TOKEN_SECRET"),
      });
    } catch {
      throw new Error("Invalid access token");
    }
  }

  verifyRefreshToken(token: string): Payload {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.getOrThrow("REFRESH_TOKEN_SECRET"),
      });
    } catch {
      throw new Error(ErrorMessage.InvalidRefreshToken);
    }
  }
}
