import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest();
    // const token = this.extractTokenFromHeader(request);

    // // หากไม่มี token ใน header หรือ token ไม่ถูกต้อง จะสร้าง UnauthorizedException พร้อมข้อความแจ้งเตือน
    // if (!token) {
    //   throw new UnauthorizedException({
    //     message: 'ไม่มี Token',
    //   });
    // }

    // try {
    //   // ยืนยันความถูกต้องของ token และกำหนดค่า payload ไว้ใน request object
    //   const payload = await this.jwtService.verifyAsync(token, {
    //     secret: jwtConstants.secret,
    //   });
    //   request['user'] = payload; // กำหนด payload ให้กับ request object
    // } catch (error) {
    //   // หากไม่สามารถยืนยัน token ได้ จะสร้าง UnauthorizedException พร้อมข้อความแจ้งเตือน
    //   if (error.name === 'TokenExpiredError') {
    //     throw new UnauthorizedException({
    //       message: 'Session หมดอายุ',
    //     });
    //   } else {
    //     throw new UnauthorizedException({
    //       message: 'Token ไม่ถูกต้อง',
    //     });
    //   }
    // }

    return true;
  }

  // ฟังก์ชั่นสำหรับการดึง token ออกมาจาก header ของคำขอ
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
