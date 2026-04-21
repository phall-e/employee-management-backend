import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomRequestDto } from './dto/create-room-request.dto';
import { UpdateRoomRequestDto } from './dto/update-room-request.dto';
import { RoomResponseDto } from './dto/room-response.dto';
import { CurrentUser } from '@modules/auth/decorators/current-user.decorator';
import { UserEntity } from '@modules/admin/system/user/entities/user.entity';
import { ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Permissions } from '@modules/auth/decorators/permissions.decorator';
import { ApiPaginatedResponse } from '@common/paginations/api-paginated-response.decorator';
import { Paginate, type PaginateQuery } from 'nestjs-paginate';
import { PaginatedResponse } from '@common/paginations/paginated-response.type';
import { RoomEntity } from './entities/room.entity';
import { SWAGGER_TOKEN_NAME } from 'src/swagger/config';

@ApiTags('Room')
@ApiBearerAuth(SWAGGER_TOKEN_NAME)
@Controller({
  path: 'admin/master-data/rooms',
  version: '1',
})
export class RoomController {

  constructor(
    private roomService: RoomService,
  ) {}

  @Post()
  @Permissions('room-create')
  @ApiResponse({
    status: 201,
    type: [RoomResponseDto],
    description: 'Room created successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public create(
    @Body() dto: CreateRoomRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<RoomResponseDto[]> {
    return this.roomService.create({
      ...dto,
      createdByUserId: user.id,
    });
  }

  @Get()
  @Permissions('room-read')
  @ApiPaginatedResponse(RoomResponseDto)
  public findAll(@Paginate() query: PaginateQuery): Promise<PaginatedResponse<RoomEntity, RoomResponseDto>> {
    return this.roomService.list(query);
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
              roomNumber: { type: 'string' },
              buildingId: { type: 'number' },
              floorId: { type: 'number' },
            },
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  public findAllForSelection(): Promise<{id: number; roomNumber: string; buildingId: number; floorId: number}[]> {
    return this.roomService.findAllForSelection();
  }

  @Get(':id')
  @Permissions('room-read')
  @ApiResponse({
    status: 200,
    type: RoomResponseDto,
    description: 'Find one of Room',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RoomResponseDto> {
    return this.roomService.findOne(id);
  }

  @Put(':id')
  @Permissions('room-edit')
  @ApiResponse({
    status: 200,
    type: RoomResponseDto,
    description: 'Room updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoomRequestDto,
  ): Promise<RoomResponseDto> {
    return this.roomService.update(id, dto);
  }

  @Delete(':id')
  @Permissions('room-delete')
  @ApiResponse({
    status: 200,
    type: RoomResponseDto,
    description: 'Room deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RoomResponseDto> {
    return this.roomService.remove(id);
  }
}