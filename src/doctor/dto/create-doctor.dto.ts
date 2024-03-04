import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDoctorDto {
  // ชื่อของแพทย์
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  // ตำแหน่งของแพทย์
  @IsString()
  @IsNotEmpty()
  readonly position: string;

  // วุฒิการศึกษาของแพทย์
  @IsString()
  @IsNotEmpty()
  readonly education: string;

  // ประสบการณ์ของแพทย์
  @IsString()
  @IsOptional()
  readonly experience?: string;

  // เบอร์โทรศัพท์ของแพทย์
  @IsString()
  @IsOptional()
  readonly phoneNumber?: string;

  // อีเมลของแพทย์
  @IsString()
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  // แผนกของแพทย์
  @IsString()
  @IsNotEmpty()
  readonly department: string;

  // เวลาทำการของแพทย์
  @IsString({ each: true })
  @IsOptional()
  readonly workingHours?: string[];
}
