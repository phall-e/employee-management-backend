import { Create<%= classify(name) %>RequestDto } from "./dto/create-<%= dasherize(name) %>-request.dto";
import { Update<%= classify(name) %>RequestDto } from "./dto/update-<%= dasherize(name) %>-request.dto";
import { <%= classify(name) %>ResponseDto } from "./dto/<%= dasherize(name) %>-response.dto";
import { <%= classify(name) %>Entity } from "./entities/<%= dasherize(name) %>.entity";
import { UserMapper } from "@modules/admin/system/user/user.mapper";

export class <%= classify(name) %>Mapper {

    public static async toDto(entity: <%= classify(name) %>Entity): Promise<<%= classify(name) %>ResponseDto> {
        const dto = new <%= classify(name) %>ResponseDto();

        dto.id = entity.id;
        dto.createdByUserId = entity.createdByUserId;
        <% fields.forEach(function(field) { %>
        dto.<%= camelize(field) %> = entity.<%= camelize(field) %>;
        <% }) %>
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.deletedAt = entity.deletedAt;

        if (entity.createdByUser) {
            dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
        }

        return dto;
    }

    public static toCreateEntity(dto: Create<%= classify(name) %>RequestDto): <%= classify(name) %>Entity {
        const entity = new <%= classify(name) %>Entity();
        <% fields.forEach(function(field) { %>
        entity.<%= camelize(field) %> = dto.<%= camelize(field) %>;
        <% }) %>
        entity.createdByUserId = dto.createdByUserId;

        return entity;
    }

    public static toUpdateEntity(entity: <%= classify(name) %>Entity, dto: Update<%= classify(name) %>RequestDto): <%= classify(name) %>Entity {
        <% fields.forEach(function(field) { %>
        entity.<%= camelize(field) %> = dto.<%= camelize(field) %>;
        <% }) %>
        return entity;
    }

}