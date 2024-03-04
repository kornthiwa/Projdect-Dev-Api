import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';
import { MongodbModule } from './mongodb/mongodb.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { QueueModule } from './queue/queue.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentModule } from './appointment/appointment.module';
import { MedicalModule } from './medical/medical.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongodbModule,
    LoginModule,
    PatientModule,
    DoctorModule,
    QueueModule,
    AuthModule,
    AppointmentModule,
    MedicalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
