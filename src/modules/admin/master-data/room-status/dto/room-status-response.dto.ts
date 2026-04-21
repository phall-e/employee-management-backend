import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "@modules/admin/system/user/dto/user-response.dto";

export class RoomStatusResponseDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    nameEn: string;

    @ApiProperty()
    nameKh: string;

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