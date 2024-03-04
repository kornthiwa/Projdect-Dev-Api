import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Document & Patient;

@Schema({ timestamps: true })
export class Patient {
  //คำนำหน้า
  @Prop({ type: String, required: false })
  nametitle: string;
  //ชื่อของผู้ป่วย
  @Prop({ type: String, required: false })
  name: string;
  @Prop({ type: String, required: false })
  lastName: string;
  //อายุของผู้ป่วย
  @Prop({ type: Number, required: false })
  age: number;
  //เบอร์โทรศัพท์ของผู้ป่วย
  @Prop({ type: String, required: false })
  phoneNumber: string;
  //บุคคลที่ติดต่อได้ฉุกเฉิน
  @Prop({ type: String, required: false })
  emergencyContact: string;
  //เลขบัตร
  @Prop({ type: String, required: false })
  citizenid: string;
  //เชื้อชาติ
  @Prop({ type: String, required: false })
  race: string;
  //สัญชาติ
  @Prop({ type: String, required: false })
  nationality: string;
  //เพศ
  @Prop({ type: String, required: false })
  gender: string;
  //อาการที่ผู้ป่วยมี
  @Prop({ type: String, required: false })
  symptoms: string;
  //การรักษาที่ผู้ป่วยได้รับ
  @Prop({ type: String, required: false })
  treatment: string;
  //ประวัติการรักษาทางการแพทย์ของผู้ป่วย
  @Prop({ type: [String], required: false })
  medicalHistory: string[];
  //ที่อยู่ของผู้ป่วยallergicMedications
  @Prop({ type: String, required: false })
  address: string;
  //ยาที่แพ้
  @Prop({ type: String, required: false })
  allergicMedicine: string;
  //สถานะ
  @Prop({ type: String, required: false, default: 'pending' })
  status: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
