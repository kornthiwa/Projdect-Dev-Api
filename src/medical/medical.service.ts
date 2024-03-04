import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMedicalDto } from './dto/create-medical.dto';
import {
  MedicalRecord,
  MedicalRecordDocument,
} from './entities/medical.entity';

@Injectable()
export class MedicalService {
  constructor(
    @InjectModel(MedicalRecord.name)
    private readonly medicalRecordModel: Model<MedicalRecordDocument>,
  ) {}

  async create(
    createMedicalDto: CreateMedicalDto,
  ): Promise<MedicalRecordDocument> {
    const newMedicalRecord = new this.medicalRecordModel(createMedicalDto);
    return await newMedicalRecord.save();
  }

  async findAll(): Promise<MedicalRecordDocument[]> {
    const medicalRecords = await this.medicalRecordModel
      .find()
      .populate('patient')
      .populate('doctor');
    return medicalRecords;
  }

  async findOne(
    patientID: string,
    doctorID: string,
  ): Promise<MedicalRecordDocument | null> {
    if (doctorID) {
      return await this.medicalRecordModel.findOne({ doctorID }).exec();
    }
    return await this.medicalRecordModel.findOne({ patientID }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.medicalRecordModel.findByIdAndDelete(id);
  }
}
