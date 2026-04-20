import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "@modules/admin/system/user/dto/user-response.dto";

export class <%= classify(name) %>ResponseDto {

    @ApiProperty()
    id: number;
<% fields.forEach(function(field) { %>
    @ApiProperty()
    <%= camelize(field) %>: string;
<% }) %>
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