import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "@modules/admin/system/user/dto/user-response.dto";
import { RoomStatusResponseDto } from "../../room-status/dto/room-status-response.dto";
import { RoomTypeResponseDto } from "../../room-type/dto/room-type-response.dto";
import { BuildingResponseDto } from "../../building/dto/building-response.dto";
import { FloorResponseDto } from "../../floor/dto/floor-response.dto";

export class RoomResponseDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    roomNumber: string;

    @ApiProperty()
    buildingId: number;

    @ApiProperty()
    building: BuildingResponseDto;

    @ApiProperty()
    floorId: number;

    @ApiProperty()
    floor: FloorResponseDto;

    @ApiProperty()
    roomTypeId: number;

    @ApiProperty()
    roomType: RoomTypeResponseDto;

    @ApiProperty()
    price: number;

    @ApiProperty()
    statusId: number;

    @ApiProperty()
    status: RoomStatusResponseDto;

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