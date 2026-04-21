import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateRoomRequestDto {

  @ApiProperty()
  @IsOptional()
  roomNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  itemLength: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  startNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  buildingId: number;

  @ApiProperty()
  @IsNotEmpty()
  floorId: number;

  @ApiProperty()
  @IsNotEmpty()
  roomTypeId: number;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  statusId: number;

  createdByUserId: number;

}