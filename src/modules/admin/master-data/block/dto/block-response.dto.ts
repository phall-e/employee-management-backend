import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "@modules/admin/system/user/dto/user-response.dto";
import { BranchResponseDto } from "../../branch/dto/branch-response.dto";

export class BlockResponseDto {

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
    branchId: number;

    @ApiProperty({ type: () => BranchResponseDto })
    branch: BranchResponseDto;

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