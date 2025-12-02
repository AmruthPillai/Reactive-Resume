import { Injectable } from "@nestjs/common";
import { LoginDto, UserWithSecrets } from "@reactive-resume/dto";
import { ErrorMessage } from "@reactive-resume/utils";
import * as bcryptjs from "bcryptjs";

import { UserService } from "../../user/user.service";

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}

  async authenticate(loginDto: LoginDto): Promise<UserWithSecrets> {
    const { identifier, password } = loginDto;

    const user = await this.userService.findOneByIdentifier(identifier);

    if (!user) {
      throw new Error(ErrorMessage.InvalidCredentials);
    }

    // Check if user has password (OAuth users don't)
    if (!user.secrets?.password) {
      throw new Error(ErrorMessage.OAuthUser);
    }

    await this.validatePassword(password, user.secrets.password);

    return user;
  }

  private async validatePassword(password: string, hashedPassword: string): Promise<void> {
    const isValid = await bcryptjs.compare(password, hashedPassword);

    if (!isValid) {
      throw new Error(ErrorMessage.InvalidCredentials);
    }
  }
}
