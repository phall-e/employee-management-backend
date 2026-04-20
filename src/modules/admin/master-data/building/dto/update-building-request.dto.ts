import { PartialType } from '@nestjs/swagger';
import { CreateBuildingRequestDto } from './create-building-request.dto';

export class UpdateBuildingRequestDto extends PartialType(CreateBuildingRequestDto) {}
