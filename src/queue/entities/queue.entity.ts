import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';

export type QueueDocument = Document & Queue;

@Schema({ timestamps: true })
export class Queue {
  // ข้อมูลผู้ป่วย
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

  // คลินิค
  @Prop({ type: String, required: true }) // Adjust required status as needed
  clinic: string;

  // วิธีการเดินทางมาถึงคลินิค
  @Prop({ type: String, required: true }) // Adjust required status as needed
  walking: string;

  // สถานะคิว
  @Prop({ type: String, required: false })
  status: string;

  @Prop({ type: String, required: true })
  symptoms: string;

  // เวลาที่เข้าคิว
  @Prop({ type: Date, required: false })
  queuedAt: Date;

  // เวลาที่คาดว่าจะได้เข้ารับการรักษา
  @Prop({ type: Date, required: false })
  estimatedTreatmentTime: Date;

  // เวลาที่เข้ารับการรักษา
  @Prop({ type: Date, required: false })
  startedTreatmentAt: Date;

  // เวลาที่เสร็จสิ้นการรักษา
  @Prop({ type: Date, required: false })
  finishedTreatmentAt: Date;

  // หมายเลขคิว
  @Prop({ type: Number, required: false })
  queueNumber: number;
}

export const QueueSchema = SchemaFactory.createForClass(Queue);
