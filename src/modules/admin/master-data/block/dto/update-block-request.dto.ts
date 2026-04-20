import { PartialType } from '@nestjs/swagger';
import { CreateBlockRequestDto } from './create-block-request.dto';

export class UpdateBlockRequestDto extends PartialType(CreateBlockRequestDto) {}
