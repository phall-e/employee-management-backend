import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "@modules/admin/system/user/dto/user-response.dto";
import { BlockResponseDto } from "../../block/dto/block-response.dto";

export class BuildingResponseDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    code: string;

    @ApiProperty()
    nameEn: string;

    @ApiProperty()
    nameKh: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    blockId: number;

    @ApiProperty({ type: () => BlockResponseDto })
    block: BlockResponseDto;

    @ApiProperty()
    createdByUserId: number;

    @ApiProperty({ type: () => UserResponseDto })
    createdByUser: UserResponseDto;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ nullable: true })
    deletedAt: Date;
}