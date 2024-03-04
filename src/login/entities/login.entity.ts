import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  NURSE = 'nurse',
  DOCTOR = 'doctor',
}

export enum Department {
  CARDIOLOGY = 'CARDIOLOGY', // อายุรกรรมโรคหัวใจ
  ONCOLOGY = 'ONCOLOGY', // อายุรกรรมโรคมะเร็ง
  HR = 'HR', // ทรัพยากรบุคคล
  IT = 'IT', // เทคโนโลยีสารสนเทศ
  ADMINISTRATION = 'ADMINISTRATION', // แผนกธุรการ
  EXAMINATION_ROOM = 'EXAMINATION_ROOM', // ห้องตรวจ
  REFERRAL = 'REFERRAL', // แผนกส่งตัว
}

export type LoginDocument = Document & Login;

@Schema({ timestamps: true })
export class Login {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  lname: string;

  @Prop({ type: Boolean, required: false, default: true })
  rememberMe?: boolean;

  @Prop({ type: String, required: true, enum: UserRole })
  role: UserRole;

  @Prop({ type: String, required: true, enum: Department })
  department: Department;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
