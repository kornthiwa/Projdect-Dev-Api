import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    console.log(createAppointmentDto);

    return this.appointmentService.create(createAppointmentDto);
  }
  @Get()
  all(@Body() createAppointmentDto: CreateAppointmentDto) {
    console.log(createAppointmentDto);

    return this.appointmentService.findAll();
  }
}
