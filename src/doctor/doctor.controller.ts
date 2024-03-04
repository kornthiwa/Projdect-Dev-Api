import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorDocument } from './entities/doctor.entity';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    try {
      return await this.doctorService.create(createDoctorDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to create doctor' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<DoctorDocument[]> {
    try {
      return await this.doctorService.findAll();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to retrieve all doctors' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/search')
  async searchDoctorsByName(
    @Query('name') name?: string,
  ): Promise<DoctorDocument[]> {
    try {
      if (name) {
        return await this.doctorService.findOneByName(name);
      } else {
        return await this.doctorService.findAll();
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to search doctors by name' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.doctorService.findOne(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to retrieve doctor' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    try {
      return await this.doctorService.update(id, updateDoctorDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to update doctor' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.doctorService.remove(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to remove doctor' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
