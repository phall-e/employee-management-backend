import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { RoomTenantService } from './room-tenant.service';
import { CreateRoomTenantRequestDto } from './dto/create-room-tenant-request.dto';
import { UpdateRoomTenantRequestDto } from './dto/update-room-tenant-request.dto';
import { RoomTenantResponseDto } from './dto/room-tenant-response.dto';
import { CurrentUser } from '@modules/auth/decorators/current-user.decorator';
import { UserEntity } from '@modules/admin/system/user/entities/user.entity';
import { ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Permissions } from '@modules/auth/decorators/permissions.decorator';
import { ApiPaginatedResponse } from '@common/paginations/api-paginated-response.decorator';
import { Paginate, type PaginateQuery } from 'nestjs-paginate';
import { PaginatedResponse } from '@common/paginations/paginated-response.type';
import { RoomTenantEntity } from './entities/room-tenant.entity';
import { SWAGGER_TOKEN_NAME } from 'src/swagger/config';

@ApiTags('RoomTenant')
@ApiBearerAuth(SWAGGER_TOKEN_NAME)
@Controller({
  path: 'admin/tenant/room-tenants',
  version: '1',
})
export class RoomTenantController {

  constructor(
    private roomTenantService: RoomTenantService,
  ) {}

  @Post()
  @Permissions('room-tenant-create')
  @ApiResponse({
    status: 201,
    type: RoomTenantResponseDto,
    description: 'RoomTenant created successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public create(
    @Body() dto: CreateRoomTenantRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<RoomTenantResponseDto> {
    return this.roomTenantService.create({
      ...dto,
      createdByUserId: user.id,
    });
  }

  @Get()
  @Permissions('room-tenant-read')
  @ApiPaginatedResponse(RoomTenantResponseDto)
  public findAll(@Paginate() query: PaginateQuery): Promise<PaginatedResponse<RoomTenantEntity, RoomTenantResponseDto>> {
    return this.roomTenantService.list(query);
  }

  @Get('tenant-status-select-options')
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
    return this.roomTenantService.findAllForSelection();
  }

  @Get(':id')
  @Permissions('room-tenant-read')
  @ApiResponse({
    status: 200,
    type: RoomTenantResponseDto,
    description: 'Find one of RoomTenant',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RoomTenantResponseDto> {
    return this.roomTenantService.findOne(id);
  }

  @Put(':id')
  @Permissions('room-tenant-edit')
  @ApiResponse({
    status: 200,
    type: RoomTenantResponseDto,
    description: 'RoomTenant updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoomTenantRequestDto,
  ): Promise<RoomTenantResponseDto> {
    return this.roomTenantService.update(id, dto);
  }

  @Delete(':id')
  @Permissions('room-tenant-delete')
  @ApiResponse({
    status: 200,
    type: RoomTenantResponseDto,
    description: 'RoomTenant deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RoomTenantResponseDto> {
    return this.roomTenantService.remove(id);
  }
}