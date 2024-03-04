import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorDocument = Document & Doctor;

@Schema({ timestamps: true })
export class Doctor {
  // ชื่อของแพทย์
  @Prop({ type: String, required: true })
  name: string;

  // ตำแหน่งของแพทย์
  @Prop({ type: String, required: true })
  position: string;

  // วุฒิการศึกษาของแพทย์
  @Prop({ type: String, required: true })
  education: string;

  // ประสบการณ์ของแพทย์
  @Prop({ type: String, required: false })
  experience: string;

  // เบอร์โทรศัพท์ของแพทย์
  @Prop({ type: String, required: false })
  phoneNumber: string;

  // อีเมลของแพทย์
  @Prop({ type: String, required: false })
  email: string;

  // แผนกของแพทย์
  @Prop({ type: String, required: true })
  department: string;

  // เวลาทำการของแพทย์
  @Prop({ type: [String], required: false })
  workingHours: string[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
