import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class Create<%= classify(name) %>RequestDto {
<% for (const field of fields) { %>
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  <%= camelize(field) %>: string;

<% } %>
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  createdByUserId: number;

}