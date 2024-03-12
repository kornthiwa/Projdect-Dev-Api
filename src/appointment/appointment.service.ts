import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import {
  Appointment,
  AppointmentDocument,
} from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const createdAppointment = new this.appointmentModel(createAppointmentDto);
    return createdAppointment.save();
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel
      .find()
      .populate('patient')
      .populate('doctor')
      .exec();
  }

  async findOne(id: string): Promise<Appointment> {
    return this.appointmentModel.findById(id).exec();
  }

  async update(
    id: string,
    updateAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentModel
      .findByIdAndUpdate(id, updateAppointmentDto, { new: true })
      .exec();
  }
}
