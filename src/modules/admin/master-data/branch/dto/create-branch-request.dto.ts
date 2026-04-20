import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBranchRequestDto {
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
    description?: string;

    @ApiProperty()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty()
    @IsNotEmpty()
    managerId: number;

    @ApiProperty()
    @IsOptional()
    address?: string;

    createdById: number;
}
