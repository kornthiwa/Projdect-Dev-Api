import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateMedicalDto {
  // ข้อมูลผู้ป่วย
  @IsOptional()
  @ValidateNested()
  readonly patient: string;

  // ข้อมูลหมอ
  @IsOptional()
  @ValidateNested()
  readonly doctor: string;

  // รายละเอียดของการรักษา
  @IsNotEmpty()
  @IsString()
  treatmentDetails: string;

  // ผลการตรวจวินิจฉัย
  @IsNotEmpty()
  @IsString()
  diagnosis: string;

  // อุณหภูมิร่างกาย
  @IsOptional()
  @IsNumber()
  bodyTemperature?: number;

  // สถานะการรักษา
  @IsOptional()
  @IsString()
  status?: string;

  // น้ำหนัก
  @IsOptional()
  @IsNumber()
  weight?: number;

  // ส่วนสูง
  @IsOptional()
  @IsNumber()
  height?: number;

  // ความดันโลหิต
  @IsOptional()
  @IsString()
  bloodPressure?: string;
}
