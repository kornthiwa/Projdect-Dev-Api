import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor, DoctorDocument } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor.name) private doctorModel: Model<Doctor>) {}

  async create(createDoctorDto: CreateDoctorDto) {
    // Create a new doctor document
    const doctor = new this.doctorModel(createDoctorDto);
    return await doctor.save();
  }

  async findAll() {
    // Find all doctors
    return await this.doctorModel.find();
  }

  async findOne(id: string) {
    // Find a doctor by ID
    return await this.doctorModel.findById(id);
  }

  async findOneByName(name: string): Promise<DoctorDocument[]> {
    // Find doctors by name (use regex for flexibility)
    return await this.doctorModel.find({
      name: { $regex: new RegExp(`${name}.*`, 'i') },
    });
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    // Update a doctor
    return await this.doctorModel.findByIdAndUpdate(id, updateDoctorDto, {
      new: true,
    });
  }

  async remove(id: string) {
    // Delete a doctor
    return await this.doctorModel.findByIdAndDelete(id);
  }
}
