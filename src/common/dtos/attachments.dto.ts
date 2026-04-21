import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

class FileDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    size: number;
}

export class AttachmentDto {
    @ApiProperty({
        type: () => FileDto,
    })
    @IsObject()
    file: FileDto;

    @ApiProperty()
    @IsString()
    @IsOptional()
    url: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isImage: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    code: string;
}