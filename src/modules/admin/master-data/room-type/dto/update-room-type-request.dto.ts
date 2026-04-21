import { PartialType } from '@nestjs/swagger';
import { CreateRoomTypeRequestDto } from './create-room-type-request.dto';

export class UpdateRoomTypeRequestDto extends PartialType(CreateRoomTypeRequestDto) {}
