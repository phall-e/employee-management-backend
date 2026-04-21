import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "@modules/admin/system/user/dto/user-response.dto";
import { RoomTenantResponseDto } from "@modules/admin/tenant/room-tenant/dto/room-tenant-response.dto";
import { AttachmentDto } from "@common/dtos/attachments.dto";
import { PaymentStatusResponseDto } from "./payment-status-response.dto";

export class RoomPaymentResponseDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    roomTenantId: number;

    @ApiProperty()
    roomTenant: RoomTenantResponseDto;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    month: Date;

    @ApiProperty()
    paidDate: Date;

    @ApiProperty()
    note: string;

    @ApiProperty()
    attachments: AttachmentDto[];

    @ApiProperty()
    statusId: number;

    @ApiProperty()
    status: PaymentStatusResponseDto;

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