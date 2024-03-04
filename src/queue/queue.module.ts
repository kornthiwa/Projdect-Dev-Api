import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Queue, QueueSchema } from './entities/queue.entity';
import { PatientModule } from 'src/patient/patient.module';
import { Patient, PatientSchema } from 'src/patient/entities/patient.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Queue.name, schema: QueueSchema },
      { name: Patient.name, schema: PatientSchema },
    ]),
    PatientModule,
  ],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
