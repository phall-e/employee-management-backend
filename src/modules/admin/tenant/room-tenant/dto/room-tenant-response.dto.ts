import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "@modules/admin/system/user/dto/user-response.dto";
import { RoomResponseDto } from "@modules/admin/master-data/room/dto/room-response.dto";
import { TenantStatusResponseDto } from "./tenant-status-response.dto";
import { AttachmentDto } from "@common/dtos/attachments.dto";

export class RoomTenantResponseDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    roomId: number;

    @ApiProperty()
    room: RoomResponseDto;

    @ApiProperty()
    tenantName: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    idCardNumber: string;

    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    depositAmount: number;

    @ApiProperty()
    profile: string;

    @ApiProperty({ type: () => [AttachmentDto]})
    attachments: AttachmentDto[];

    @ApiProperty()
    statusId: number;

    @ApiProperty()
    status: TenantStatusResponseDto;

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