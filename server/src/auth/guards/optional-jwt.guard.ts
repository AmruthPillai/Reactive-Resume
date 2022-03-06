import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@/users/entities/user.entity';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = User>(err: Error, user: TUser): TUser {
    return user;
  }
}
