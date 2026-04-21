import { PartialType } from '@nestjs/swagger';
import { CreateRoomTenantRequestDto } from './create-room-tenant-request.dto';

export class UpdateRoomTenantRequestDto extends PartialType(CreateRoomTenantRequestDto) {}
