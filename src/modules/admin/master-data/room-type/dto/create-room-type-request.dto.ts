import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsOptional } from "class-validator";

export class CreateRoomTypeRequestDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameEn: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameKh: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  createdByUserId: number;

}