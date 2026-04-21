import { Module } from '@nestjs/common';
import { RoomPaymentModule } from './room-payment/room-payment.module';

@Module({
    imports: [
        RoomPaymentModule,
    ],
})
export class PaymentModule {}
