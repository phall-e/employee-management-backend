import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';
import { Create<%= classify(name) %>RequestDto } from './dto/create-<%= dasherize(name) %>-request.dto';
import { Update<%= classify(name) %>RequestDto } from './dto/update-<%= dasherize(name) %>-request.dto';
import { <%= classify(name) %>ResponseDto } from './dto/<%= dasherize(name) %>-response.dto';
import { CurrentUser } from '@modules/auth/decorators/current-user.decorator';
import { UserEntity } from '@modules/admin/system/user/entities/user.entity';
import { ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Permissions } from '@modules/auth/decorators/permissions.decorator';
import { ApiPaginatedResponse } from '@common/paginations/api-paginated-response.decorator';
import { Paginate, type PaginateQuery } from 'nestjs-paginate';
import { PaginatedResponse } from '@common/paginations/paginated-response.type';
import { <%= classify(name) %>Entity } from './entities/<%= dasherize(name) %>.entity';
import { SWAGGER_TOKEN_NAME } from 'src/swagger/config';

@ApiTags('<%= classify(name) %>')
@ApiBearerAuth(SWAGGER_TOKEN_NAME)
@Controller({
  path: 'admin/<%= dasherize(name) %>',
  version: '1',
})
export class <%= classify(name) %>Controller {

  constructor(
    private <%= camelize(name)%>Service: <%= classify(name) %>Service,
  ) {}

  @Post()
  @Permissions('<%= dasherize(name) %>-create')
  @ApiResponse({
    status: 201,
    type: <%= classify(name) %>ResponseDto,
    description: '<%= classify(name) %> created successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public create(
    @Body() dto: Create<%= classify(name) %>RequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<<%= classify(name) %>ResponseDto> {
    return this.<%= camelize(name) %>Service.create({
      ...dto,
      createdByUserId: user.id,
    });
  }

  @Get()
  @Permissions('<%= dasherize(name) %>-read')
  @ApiPaginatedResponse(<%= classify(name) %>ResponseDto)
  public findAll(@Paginate() query: PaginateQuery): Promise<PaginatedResponse<<%= classify(name) %>Entity, <%= classify(name) %>ResponseDto>> {
    return this.<%= camelize(name) %>Service.list(query);
  }

  @Get('select-options')
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              nameEn: { type: 'string' },
              nameKh: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  public findAllForSelection(): Promise<{id: number; nameEn: string; nameKh: string}[]> {
    return this.<%= camelize(name) %>Service.findAllForSelection();
  }

  @Get(':id')
  @Permissions('<%= dasherize(name) %>-read')
  @ApiResponse({
    status: 200,
    type: <%= classify(name) %>ResponseDto,
    description: 'Find one of <%= classify(name) %>',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<<%= classify(name) %>ResponseDto> {
    return this.<%= camelize(name) %>Service.findOne(id);
  }

  @Put(':id')
  @Permissions('<%= dasherize(name) %>-edit')
  @ApiResponse({
    status: 200,
    type: <%= classify(name) %>ResponseDto,
    description: '<%= classify(name) %> updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Update<%= classify(name) %>RequestDto,
  ): Promise<<%= classify(name) %>ResponseDto> {
    return this.<%= camelize(name) %>Service.update(id, dto);
  }

  @Delete(':id')
  @Permissions('<%= dasherize(name) %>-delete')
  @ApiResponse({
    status: 200,
    type: <%= classify(name) %>ResponseDto,
    description: '<%= classify(name) %> deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<<%= classify(name) %>ResponseDto> {
    return this.<%= camelize(name) %>Service.remove(id);
  }
}