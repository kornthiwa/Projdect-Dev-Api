import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';

export type MedicalRecordDocument = Document & MedicalRecord;

@Schema({ timestamps: true })
export class MedicalRecord {
  // ผู้ป่วยที่เกี่ยวข้องกับประวัติการรักษา
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  })
  patient: Patient;

  // หมอที่รับผิดชอบการรักษา
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  })
  doctor: Doctor;

  // รายละเอียดของการรักษา
  @Prop({ type: String, required: true })
  treatmentDetails: string;

  // ผลการตรวจวินิจฉัย
  @Prop({ type: String, required: true })
  diagnosis: string;

  // อุณหภูมิร่างกาย
  @Prop({ type: Number })
  bodyTemperature?: number;

  // สถานะการรักษา
  @Prop({ type: String, required: false })
  status: string;

  // น้ำหนัก
  @Prop({ type: Number })
  weight?: number;

  // ส่วนสูง
  @Prop({ type: Number })
  height?: number;

  // ความดันโลหิต
  @Prop({ type: String })
  bloodPressure?: string;
}

export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
