import { PartialType } from '@nestjs/swagger';
import { CreateFloorRequestDto } from './create-floor-request.dto';

export class UpdateFloorRequestDto extends PartialType(CreateFloorRequestDto) {}
