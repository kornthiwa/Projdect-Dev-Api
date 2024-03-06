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
      status: 'pending',
      queuedAt: new Date(),
    });

    // บันทึกคิวใหม่
    return await newQueue.save();
  }
  async findQueue(doctorId: string): Promise<Queue[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // ตั้งเวลาให้เป็นเริ่มต้นของวันนี้

    return await this.queueModel
      .find({
        doctor: doctorId,
        queuedAt: { $gte: today },
        status: 'pending',
      }) // ค้นหาคิวของวันนี้และสถานะเป็น 'pending'
      // .sort({ queuedAt: -1 }) // เรียงตามเวลาที่คิวถูกจัดเก็บ
      .exec();
  }

  async findAll(): Promise<Queue[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // ตั้งเวลาให้เป็นเริ่มต้นของวันนี้
    const queues = await this.queueModel.find({
      queuedAt: { $gte: today },
      status: 'pending',
    });
    return queues;
  }

  async getCurrentQueueNumber(doctorId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // เซ็ตเวลาให้อยู่ที่เริ่มของวันนี้

    const currentQueue = await this.queueModel
      .findOne({
        doctor: doctorId,
        queuedAt: { $gte: today },
        status: { $ne: 'finished' },
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
    console.log(currentQueueNumber);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // ตั้งเวลาให้เป็นเริ่มต้นของวันนี้
    if (currentQueueNumber === 0) {
      const nextQueue = await this.queueModel
        .findOne({
          doctor: doctorId,
          status: 'finished',
          queuedAt: { $gte: today },
        })
        .sort({ queueNumber: -1 }) // เรียงลำดับ queueNumber ให้มากไปน้อย
        .limit(1); // เลือกเฉพาะคิวแรกที่พบ
      return nextQueue;
    }

    const nextQueue = await this.queueModel.findOne({
      doctor: doctorId,
      queueNumber: currentQueueNumber,
      queuedAt: { $gte: today },
    });
    const nextDataQueue = await this.queueModel.findOne({
      doctor: doctorId,
      queueNumber: currentQueueNumber + 1,
      queuedAt: { $gte: today },
    });
    // .populate('patient'); // Populate ข้อมูลคนไข้

    const currentQueue = await this.queueModel.findOne({
      doctor: doctorId,
      queueNumber: currentQueueNumber,
      queuedAt: { $gte: today },
    });

    if (currentQueue) {
      currentQueue.status = 'finished';
      await currentQueue.save(); // บันทึกการอัพเดทสถานะคิวปัจจุบัน
    }

    if (!nextDataQueue) {
      return nextQueue;
    }
    return nextDataQueue;
  }

  async reCallQueue(doctorId: string): Promise<Queue | null> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // ตั้งเวลาให้เป็นเริ่มต้นของวันนี้
    const queue = await this.queueModel
      .findOne({
        doctor: doctorId,
        queuedAt: { $gte: today },
        status: 'pending',
      }) // Exclude queues with 'finished' status
      .exec();

    if (!queue) {
      const nextQueue = await this.queueModel
        .findOne({
          doctor: doctorId,
          status: 'finished',
        })
        .sort({ queueNumber: -1 }) // เรียงลำดับ queueNumber ให้มากไปน้อย
        .limit(1); // เลือกเฉพาะคิวแรกที่พบ
      return nextQueue;
    }

    return queue;
  }

  async setAllQueuesToPending(): Promise<Queue[]> {
    try {
      // ค้นหาทุกคิวและอัปเดตสถานะเป็น 'pending'
      const queues = await this.queueModel.find({}); // ค้นหาทุกคิว
      for (const queue of queues) {
        queue.status = 'pending'; // เปลี่ยนสถานะเป็น 'pending'
        await queue.save(); // บันทึกการเปลี่ยนแปลง
      }
      return queues;
    } catch (error) {
      // หากเกิดข้อผิดพลาดในการดำเนินการกับฐานข้อมูล
      console.error(
        'Error occurred while setting all queues to pending:',
        error,
      );
      throw error;
    }
  }
}
