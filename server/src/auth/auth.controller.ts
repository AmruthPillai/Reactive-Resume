import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Patch, Post, UseGuards } from '@nestjs/common';

import { User } from '@/decorators/user.decorator';
import { User as UserEntity } from '@/users/entities/user.entity';

import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@User() user: UserEntity) {
    return user;
  }

  @Post('google')
  async loginWithGoogle(@Body('credential') credential: string) {
    try {
      const user = await this.authService.authenticateWithGoogle(credential);
      const accessToken = this.authService.getAccessToken(user.id);

      return { user, accessToken };
    } catch (error) {
      throw new BadRequestException('User with this email might already exist.');
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    const accessToken = this.authService.getAccessToken(user.id);

    return { user, accessToken };
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserEntity) {
    const accessToken = this.authService.getAccessToken(user.id);

    return { user, accessToken };
  }

  @HttpCode(200)
  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @HttpCode(200)
  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Patch('update-profile')
  updateProfile(@User('id') userId: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.authService.updateProfile(userId, updateProfileDto);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@User('id') id: number) {
    await this.authService.removeUser(id);
  }
}
