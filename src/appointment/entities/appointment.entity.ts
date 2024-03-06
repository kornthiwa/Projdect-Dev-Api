import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';

export type AppointmentDocument = Document & Appointment;

@Schema({ timestamps: true })
export class Appointment {
  // ผู้ป่วยที่ทำการนัดหมาย
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  })
  patient: Patient;

  // หมอที่จะรับผิดชอบการนัดหมาย
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  })
  doctor: Doctor;

  // วันและเวลาที่นัดหมาย
  @Prop({ type: Date, required: false })
  appointmentDate: Date;

  // สถานะของการนัดหมาย (ยืนยัน, ยกเลิก, การแจ้งเตือนเพิ่มเติม)
  @Prop({ type: String, required: false, default: 'pending' })
  status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
