import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // LoginController
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: { username: string; password: string }) {
    // ระบุชนิดของ signInDto
    const { access_token, user } = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    ); // เรียกใช้ฟังก์ชัน signIn และรอผลลัพธ์

    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    return { access_token, user: userWithoutPassword };
  }
}
