import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateQueueDto {
  // ข้อมูลผู้ป่วย
  @IsNotEmpty()
  @ValidateNested()
  readonly patient: string;

  // หมอที่รับผิดชอบการรักษา
  @IsNotEmpty()
  @ValidateNested()
  readonly doctor: string;

  // คลินิค
  @IsString()
  @IsNotEmpty()
  readonly clinic: string;

  @IsString()
  @IsNotEmpty()
  readonly symptoms: string;

  // วิธีการเดินทางมาถึงคลินิค
  @IsString()
  @IsNotEmpty()
  readonly walking: string;

  // สถานะคิว
  @IsString()
  @IsOptional()
  readonly status?: string;

  // เวลาที่เข้าคิว
  @IsOptional()
  readonly queuedAt?: Date;

  // เวลาที่คาดว่าจะได้เข้ารับการรักษา
  @IsOptional()
  readonly estimatedTreatmentTime?: Date;

  // หมายเลขคิว
  @IsNumber()
  @IsNotEmpty()
  readonly queueNumber: number;
}
