import { PartialType } from '@nestjs/swagger';
import { CreateRoomPaymentRequestDto } from './create-room-payment-request.dto';

export class UpdateRoomPaymentRequestDto extends PartialType(CreateRoomPaymentRequestDto) {}
