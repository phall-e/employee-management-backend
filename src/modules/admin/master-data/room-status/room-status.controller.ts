import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { RoomStatusService } from './room-status.service';
import { CreateRoomStatusRequestDto } from './dto/create-room-status-request.dto';
import { UpdateRoomStatusRequestDto } from './dto/update-room-status-request.dto';
import { RoomStatusResponseDto } from './dto/room-status-response.dto';
import { CurrentUser } from '@modules/auth/decorators/current-user.decorator';
import { UserEntity } from '@modules/admin/system/user/entities/user.entity';
import { ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Permissions } from '@modules/auth/decorators/permissions.decorator';
import { ApiPaginatedResponse } from '@common/paginations/api-paginated-response.decorator';
import { Paginate, type PaginateQuery } from 'nestjs-paginate';
import { PaginatedResponse } from '@common/paginations/paginated-response.type';
import { RoomStatusEntity } from './entities/room-status.entity';
import { SWAGGER_TOKEN_NAME } from 'src/swagger/config';

@ApiTags('RoomStatus')
@ApiBearerAuth(SWAGGER_TOKEN_NAME)
@Controller({
  path: 'admin/room-status',
  version: '1',
})
export class RoomStatusController {

  constructor(
    private roomStatusService: RoomStatusService,
  ) {}

  @Post()
  @Permissions('room-status-create')
  @ApiResponse({
    status: 201,
    type: RoomStatusResponseDto,
    description: 'RoomStatus created successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public create(
    @Body() dto: CreateRoomStatusRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<RoomStatusResponseDto> {
    return this.roomStatusService.create({
      ...dto,
      createdByUserId: user.id,
    });
  }

  @Get()
  @Permissions('room-status-read')
  @ApiPaginatedResponse(RoomStatusResponseDto)
  public findAll(@Paginate() query: PaginateQuery): Promise<PaginatedResponse<RoomStatusEntity, RoomStatusResponseDto>> {
    return this.roomStatusService.list(query);
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
    return this.roomStatusService.findAllForSelection();
  }

  @Get(':id')
  @Permissions('room-status-read')
  @ApiResponse({
    status: 200,
    type: RoomStatusResponseDto,
    description: 'Find one of RoomStatus',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RoomStatusResponseDto> {
    return this.roomStatusService.findOne(id);
  }

  @Put(':id')
  @Permissions('room-status-edit')
  @ApiResponse({
    status: 200,
    type: RoomStatusResponseDto,
    description: 'RoomStatus updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoomStatusRequestDto,
  ): Promise<RoomStatusResponseDto> {
    return this.roomStatusService.update(id, dto);
  }

  @Delete(':id')
  @Permissions('room-status-delete')
  @ApiResponse({
    status: 200,
    type: RoomStatusResponseDto,
    description: 'RoomStatus deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RoomStatusResponseDto> {
    return this.roomStatusService.remove(id);
  }
}