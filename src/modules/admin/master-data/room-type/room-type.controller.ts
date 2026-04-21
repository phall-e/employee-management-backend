import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { RoomTypeService } from './room-type.service';
import { CreateRoomTypeRequestDto } from './dto/create-room-type-request.dto';
import { UpdateRoomTypeRequestDto } from './dto/update-room-type-request.dto';
import { RoomTypeResponseDto } from './dto/room-type-response.dto';
import { CurrentUser } from '@modules/auth/decorators/current-user.decorator';
import { UserEntity } from '@modules/admin/system/user/entities/user.entity';
import { ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Permissions } from '@modules/auth/decorators/permissions.decorator';
import { ApiPaginatedResponse } from '@common/paginations/api-paginated-response.decorator';
import { Paginate, type PaginateQuery } from 'nestjs-paginate';
import { PaginatedResponse } from '@common/paginations/paginated-response.type';
import { RoomTypeEntity } from './entities/room-type.entity';
import { SWAGGER_TOKEN_NAME } from 'src/swagger/config';

@ApiTags('RoomType')
@ApiBearerAuth(SWAGGER_TOKEN_NAME)
@Controller({
  path: 'admin/master-data/room-type',
  version: '1',
})
export class RoomTypeController {

  constructor(
    private roomTypeService: RoomTypeService,
  ) {}

  @Post()
  @Permissions('room-type-create')
  @ApiResponse({
    status: 201,
    type: RoomTypeResponseDto,
    description: 'RoomType created successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public create(
    @Body() dto: CreateRoomTypeRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<RoomTypeResponseDto> {
    return this.roomTypeService.create({
      ...dto,
      createdByUserId: user.id,
    });
  }

  @Get()
  @Permissions('room-type-read')
  @ApiPaginatedResponse(RoomTypeResponseDto)
  public findAll(@Paginate() query: PaginateQuery): Promise<PaginatedResponse<RoomTypeEntity, RoomTypeResponseDto>> {
    return this.roomTypeService.list(query);
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
    return this.roomTypeService.findAllForSelection();
  }

  @Get(':id')
  @Permissions('room-type-read')
  @ApiResponse({
    status: 200,
    type: RoomTypeResponseDto,
    description: 'Find one of RoomType',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RoomTypeResponseDto> {
    return this.roomTypeService.findOne(id);
  }

  @Put(':id')
   @Permissions('room-type-update')
  @ApiResponse({
    status: 200,
    type: RoomTypeResponseDto,
    description: 'RoomType updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoomTypeRequestDto,
  ): Promise<RoomTypeResponseDto> {
    return this.roomTypeService.update(id, dto);
  }

  @Delete(':id')
  @Permissions('room-type-delete')
  @ApiResponse({
    status: 200,
    type: RoomTypeResponseDto,
    description: 'RoomType deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RoomTypeResponseDto> {
    return this.roomTypeService.remove(id);
  }
}