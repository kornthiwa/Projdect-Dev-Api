import {
  IsNotEmpty,
  IsString,
  Length,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Department, UserRole } from '../entities/login.entity';

export class CreateLoginDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lname: string;

  @IsEnum(UserRole)
  readonly role: UserRole;

  @IsEnum(Department)
  readonly department: Department;

  @IsOptional()
  @IsBoolean()
  readonly rememberMe?: boolean;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
