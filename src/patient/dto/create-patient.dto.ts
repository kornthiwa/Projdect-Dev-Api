import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsOptional()
  nametitle?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @IsOptional()
  @IsString()
  citizenid?: string;

  @IsOptional()
  @IsString()
  race?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  symptoms?: string;

  @IsOptional()
  @IsString()
  treatment?: string;

  @IsOptional()
  @IsString({ each: true })
  medicalHistory?: string[];

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString({ each: true })
  allergicMedicine?: string[];

  @IsOptional()
  @IsString()
  status?: string;
}
