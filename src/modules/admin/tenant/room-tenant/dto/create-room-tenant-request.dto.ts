import { AttachmentDto } from "@common/dtos/attachments.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsDateString, IsArray } from "class-validator";

export class CreateRoomTenantRequestDto {

  @ApiProperty()
  @IsNotEmpty()
  roomId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tenantName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idCardNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiProperty()
  @IsNotEmpty()
  depositAmount?: number;

  @ApiProperty()
  @IsOptional()
  profile?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  attachments?: AttachmentDto[];

  @ApiProperty()
  @IsNotEmpty()
  statusId: number;

  createdByUserId: number;

}