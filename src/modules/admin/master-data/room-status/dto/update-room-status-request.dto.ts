import { PartialType } from '@nestjs/swagger';
import { CreateRoomStatusRequestDto } from './create-room-status-request.dto';

export class UpdateRoomStatusRequestDto extends PartialType(CreateRoomStatusRequestDto) {}
