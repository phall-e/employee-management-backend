import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class CreateRoomStatusRequestDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameEn: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameKh: string;

  createdByUserId: number;

}