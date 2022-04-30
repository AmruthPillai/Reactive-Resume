import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SchedulerRegistry } from '@nestjs/schedule';
import bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { OAuth2Client } from 'google-auth-library';

import { PostgresErrorCode } from '@/database/errorCodes.enum';
import { CreateGoogleUserDto } from '@/users/dto/create-google-user.dto';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';

import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, randomInt(8, 12));

    try {
      const createdUser = await this.usersService.create({
        ...registerDto,
        password: hashedPassword,
        provider: 'email',
      });

      return createdUser;
    } catch (error: any) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('A user with that username and/or email already exists.', HttpStatus.UNAUTHORIZED);
      }

      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUser(identifier: string, password: string) {
    try {
      const user = await this.usersService.findByIdentifier(identifier);

      await this.verifyPassword(password, user.password);

      return user;
    } catch (error) {
      throw new HttpException(
        'The username/email and password combination provided was incorrect.',
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatching) {
      throw new HttpException(
        'The username/email and password combination provided was incorrect.',
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  forgotPassword(email: string) {
    return this.usersService.generateResetToken(email);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersService.findByResetToken(resetPasswordDto.resetToken);
    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, randomInt(8, 12));

    await this.usersService.update(user.id, {
      password: hashedPassword,
      resetToken: null,
    });

    try {
      this.schedulerRegistry.deleteTimeout(`clear-resetToken-${user.id}`);
    } catch {
      // pass through
    }
  }

  removeUser(id: number) {
    return this.usersService.remove(id);
  }

  getAccessToken(id: number) {
    const expiresIn = this.configService.get<number>('auth.jwtExpiryTime');

    return this.jwtService.sign({ id }, { expiresIn });
  }

  getUserFromAccessToken(accessToken: string) {
    const payload: User = this.jwtService.verify(accessToken, {
      secret: this.configService.get<string>('auth.jwtSecret'),
    });

    return this.usersService.findById(payload.id);
  }

  async authenticateWithGoogle(credential: string) {
    const clientID = this.configService.get<string>('google.clientID');
    const clientSecret = this.configService.get<string>('google.clientSecret');

    const OAuthClient = new OAuth2Client(clientID, clientSecret);
    const client = await OAuthClient.verifyIdToken({ idToken: credential });
    const userPayload = client.getPayload();

    try {
      const user = await this.usersService.findByEmail(userPayload.email);

      return user;
    } catch (error: any) {
      if (error.status !== HttpStatus.NOT_FOUND) {
        throw new HttpException(error, HttpStatus.BAD_GATEWAY);
      }

      const username = userPayload.email.split('@')[0];

      const createUserDto: CreateGoogleUserDto = {
        name: `${userPayload.given_name} ${userPayload.family_name}`,
        username,
        email: userPayload.email,
        provider: 'google',
      };

      return this.usersService.create(createUserDto);
    }
  }
}
