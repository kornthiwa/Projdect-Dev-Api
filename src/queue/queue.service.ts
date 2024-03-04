import { Injectable } from '@nestjs/common';
import { CreateQueueDto } from './dto/create-queue.dto';
import { Queue } from './entities/queue.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from 'src/patient/entities/patient.entity';

@Injectable()
export class QueueService {
  constructor(
    @InjectModel(Queue.name) private queueModel: Model<Queue>,
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
  ) {}

  async create(createQueueDto: CreateQueueDto): Promise<Queue> {
    // หาคิวล่าสุดของหมอ
    const lastQueue = await this.queueModel
      .findOne({ doctor: createQueueDto.doctor })
      .sort({ queuedAt: -1 });

    // ตรวจสอบว่าเป็นวันใหม่หรือไม่
    const today = new Date().getDate();
    const lastQueueDay = lastQueue ? lastQueue.queuedAt.getDate() : null;

    // กำหนดค่าหมายเลขคิวเริ่มต้น
    let queueNumber = 1;

    if (lastQueueDay !== today) {
      // หากเป็นวันใหม่หรือไม่มีคิวล่าสุด กำหนดหมายเลขคิวเป็น 1
      queueNumber = 1;
    } else {
      // หากเป็นวันเดิม ให้เพิ่มหมายเลขคิวไป 1
      queueNumber = lastQueue.queueNumber + 1;
    }

    // สร้างคิวใหม่
    const newQueue = new this.queueModel({
      ...createQueueDto,
      queueNumber,
      queuedAt: new Date(),
    });

    // บันทึกคิวใหม่
    return await newQueue.save();
  }

  // async create(createQueueDto: CreateQueueDto): Promise<Queue> {
  //   // Find the last queue
  //   const lastQueue = await this.findLastQueue();
  //   // Check if it's a new day
  //   const today = new Date().getDate();
  //   const lastQueueDay = lastQueue ? lastQueue.queuedAt.getDate() : null;

  //   // Find patient and populate data
  //   const patient = await this.patientModel
  //     .findById(createQueueDto.patient)
  //     .populate('_id');
  //   console.log(patient);

  //   // Initialize the queue number
  //   let queueNumber = 1;

  //   if (lastQueueDay !== today) {
  //     // If it's a new day, reset the queue number
  //     queueNumber = 1;
  //   } else {
  //     // If it's the same day, increment the queue number
  //     queueNumber = lastQueue.queueNumber + 1;
  //   }

  //   // Create a new queue
  //   const newQueue = new this.queueModel({
  //     ...createQueueDto,
  //     queueNumber,
  //     queuedAt: new Date(),
  //   });

  //   // Save the new queue
  //   return await newQueue.save();
  // }

  async findLastQueue(doctorId: string): Promise<Queue | null> {
    return await this.queueModel
      .findOne({ doctor: doctorId })
      .sort({ queuedAt: -1 })
      .exec();
  }

  async findAll(): Promise<Queue[]> {
    const queues = await this.queueModel.find().populate('patient');
    return queues;
  }

  async getCurrentQueueNumber(doctorId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // เซ็ตเวลาให้อยู่ที่เริ่มของวันนี้

    const currentQueue = await this.queueModel
      .findOne({
        doctor: doctorId,
        queuedAt: { $gte: today },
        status: { $ne: 'Finished' },
      }) // แก้ไขเพื่อตรวจสอบว่าสถานะไม่ใช่ 'Finished'
      .sort({ queueNumber: 1 })
      .exec();

    console.log('Current Queue:', currentQueue); // แสดงคิวที่พบในวันนี้

    if (currentQueue) {
      return currentQueue.queueNumber;
    } else {
      return 0; // ถ้าไม่มีคิวใดๆ ที่เท่าไหร่แล้วในวันนี้ หรือคิวที่พบมีสถานะเป็น 'Finished'
    }
  }

  async callNextQueue(doctorId: string): Promise<Queue | null> {
    const currentQueueNumber = await this.getCurrentQueueNumber(doctorId);

    if (currentQueueNumber === 0) {
      return null; // ไม่มีคิวใดๆ ที่เท่าไหร่แล้วในวันนี้สำหรับหมอที่กำหนด
    }

    const nextQueue = await this.queueModel
      .findOne({
        doctor: doctorId,
        queueNumber: currentQueueNumber,
      })
      .populate('patient'); // Populate ข้อมูลคนไข้

    if (!nextQueue) {
      return null; // ไม่มีคิวถัดไปสำหรับหมอที่กำหนด
    }

    const currentQueue = await this.queueModel.findOne({
      doctor: doctorId,
      queueNumber: currentQueueNumber,
    });

    if (currentQueue) {
      currentQueue.status = 'Finished';
      await currentQueue.save(); // บันทึกการอัพเดทสถานะคิวปัจจุบัน
    }

    return nextQueue;
  }

  // async getCurrentQueueNumber(): Promise<number> {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0); // เซ็ตเวลาให้อยู่ที่เริ่มของวันนี้

  //   const currentQueue = await this.queueModel
  //     .findOne({ queuedAt: { $gte: today }, status: { $ne: 'Finished' } }) // แก้ไขเพื่อตรวจสอบว่าสถานะไม่ใช่ 'Finished'
  //     .sort({ queueNumber: 1 })
  //     .exec();

  //   console.log('Current Queue:', currentQueue); // แสดงคิวที่พบในวันนี้

  //   if (currentQueue) {
  //     return currentQueue.queueNumber;
  //   } else {
  //     return 0; // ถ้าไม่มีคิวใดๆ ที่เท่าไหร่แล้วในวันนี้ หรือคิวที่พบมีสถานะเป็น 'Finished'
  //   }
  // }

  // async callNextQueue(): Promise<Queue | null> {
  //   const currentQueueNumber = await this.getCurrentQueueNumber();

  //   if (currentQueueNumber === 0) {
  //     return null; // ไม่มีคิวใดๆ ที่เท่าไหร่แล้วในวันนี้
  //   }

  //   const nextQueue = await this.queueModel
  //     .findOne({
  //       queueNumber: currentQueueNumber,
  //     })
  //     .populate('patient'); // Populate ข้อมูลคนไข้

  //   if (!nextQueue) {
  //     return null; // ไม่มีคิวถัดไป
  //   }

  //   const currentQueue = await this.queueModel.findOne({
  //     queueNumber: currentQueueNumber,
  //   });

  //   if (currentQueue) {
  //     currentQueue.status = 'Finished';
  //     await currentQueue.save(); // บันทึกการอัพเดทสถานะคิวปัจจุบัน
  //   }

  //   return nextQueue;
  // }

  async reCallQueue(queueNumber: number): Promise<Queue | null> {
    const queue = await this.queueModel
      .findOne({ queueNumber })
      .populate('patient')
      .exec();
    console.log(queue);

    if (!queue) {
      return null; // ไม่พบคิวที่ต้องการเรียกซ้ำ
    }

    return queue;
  }
}
