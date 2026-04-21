import { AttachmentDto } from "@common/dtos/attachments.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsDateString, IsArray } from "class-validator";

export class CreateRoomPaymentRequestDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  roomTenantId: number;

  @ApiProperty()
  @IsOptional()
  amount?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  month: Date;

  @ApiProperty()
  @IsOptional()
  paidDate?: Date;

  @ApiProperty()
  @IsOptional()
  note?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  attachments?: AttachmentDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  statusId: number;

  createdByUserId: number;

}