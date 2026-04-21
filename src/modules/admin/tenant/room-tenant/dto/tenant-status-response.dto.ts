import { ApiProperty } from "@nestjs/swagger";

export class TenantStatusResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nameEn: string;

    @ApiProperty()
    nameKh: string;
}