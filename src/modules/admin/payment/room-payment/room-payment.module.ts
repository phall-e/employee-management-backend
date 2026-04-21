import { Module } from '@nestjs/common';
import { RoomPaymentService } from './room-payment.service';
import { RoomPaymentController } from './room-payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomPaymentEntity } from './entities/room-payment.entity';
import { PaymentStatusEntity } from './entities/payment-status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentStatusEntity,
      RoomPaymentEntity,
    ]),
  ],
  controllers: [RoomPaymentController],
  providers: [RoomPaymentService],
})
export class RoomPaymentModule {}