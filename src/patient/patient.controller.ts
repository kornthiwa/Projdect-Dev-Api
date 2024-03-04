import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    try {
      return await this.patientService.create(createPatientDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'มีข้อมูลในระบบแล้ว' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.patientService.findAll();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to retrieve all patients' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.patientService.findOne(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to retrieve patient' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    try {
      return await this.patientService.update(id, updatePatientDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to update patient' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.patientService.remove(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to remove patient' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
