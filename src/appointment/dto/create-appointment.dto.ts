import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  patient: string;

  @IsNotEmpty()
  doctor: string;

  @IsDateString()
  @IsNotEmpty()
  appointmentDate: Date;

  @IsOptional()
  status: string;
}
