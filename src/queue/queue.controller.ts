import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { Queue } from './entities/queue.entity';
import { PatientService } from 'src/patient/patient.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('queue')
export class QueueController {
  constructor(
    private readonly queueService: QueueService,
    private readonly patientService: PatientService,
  ) {}

  @Get('find')
  async findallQueue(): Promise<Queue[]> {
    return await this.queueService.findAll();
  }

  @Get('reset')
  async resetQueues(): Promise<Queue[]> {
    try {
      const queues = await this.queueService.setAllQueuesToPending();
      return queues;
    } catch (error) {
      console.error('Error occurred while resetting queues:', error);
      throw new HttpException(
        'เกิดข้อผิดพลาดในการตั้งค่าคิวใหม่',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('next/:doctorId')
  async callNextQueue(
    @Param('doctorId') doctorId: string,
  ): Promise<Queue | null> {
    return await this.queueService.callNextQueue(doctorId);
  }

  @Get(':doctorId')
  async recallQueue(
    @Param('doctorId') doctorId: string,
  ): Promise<Queue | null> {
    return await this.queueService.reCallQueue(doctorId);
  }

  @Get('find/:doctorId')
  async findQueue(@Param('doctorId') doctorId: string): Promise<Queue[]> {
    return await this.queueService.findQueue(doctorId);
  }

  @Get()
  async allQueues(): Promise<Queue[]> {
    try {
      const queues = await this.queueService.findAll();
      return queues;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'เกิดข้อผิดพลาดในการดึงข้อมูลคิว',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @UseGuards(AuthGuard)
  @Post()
  async enqueue(@Body() createQueueDto: CreateQueueDto): Promise<Queue> {
    try {
      const queue = await this.queueService.create({
        ...createQueueDto,
      });

      return queue;
    } catch (error) {
      console.error('Error enqueuing queue:', error);
      throw new HttpException(
        { message: 'Failed to retrieve queue' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
