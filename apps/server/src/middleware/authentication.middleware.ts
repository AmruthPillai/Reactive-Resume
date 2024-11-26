/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log(req);
    const isAdminRequest = req.path.startsWith("/admin"); // Identify if it's an admin request

    // Access appropriate cookies
    const authCookie = req.cookies["Authentication"];
    const refreshCookie = req.cookies["Refresh"];

    if (!authCookie || !refreshCookie) {
      throw new UnauthorizedException("Authentication cookie is missing");
    }

    // Attach the token and admin flag to the request object for later use
    // req.token = authCookie;
    // req.isAdminRequest = isAdminRequest;

    next();
  }
}
