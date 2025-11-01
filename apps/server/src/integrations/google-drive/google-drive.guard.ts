import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleDriveGuard extends AuthGuard("google-drive") {}

