/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const isAdminRequest = req.path.startsWith("/admin"); // Identify if it's an admin request

    // Access appropriate cookies
    const authCookie = req.cookies["Authentication"];
    const refreshCookie = req.cookies["Refresh"];

    if (!authCookie || !refreshCookie) {
      throw new UnauthorizedException("Authentication cookie is missing");
    }

    // Attach the token and admin flag to the request object for later use
    req.token = authCookie;
    req.isAdminRequest = isAdminRequest;

    next();
  }
}
