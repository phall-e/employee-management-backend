import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { RoomPaymentService } from './room-payment.service';
import { CreateRoomPaymentRequestDto } from './dto/create-room-payment-request.dto';
import { UpdateRoomPaymentRequestDto } from './dto/update-room-payment-request.dto';
import { RoomPaymentResponseDto } from './dto/room-payment-response.dto';
import { CurrentUser } from '@modules/auth/decorators/current-user.decorator';
import { UserEntity } from '@modules/admin/system/user/entities/user.entity';
import { ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Permissions } from '@modules/auth/decorators/permissions.decorator';
import { ApiPaginatedResponse } from '@common/paginations/api-paginated-response.decorator';
import { Paginate, type PaginateQuery } from 'nestjs-paginate';
import { PaginatedResponse } from '@common/paginations/paginated-response.type';
import { RoomPaymentEntity } from './entities/room-payment.entity';
import { SWAGGER_TOKEN_NAME } from 'src/swagger/config';

@ApiTags('RoomPayment')
@ApiBearerAuth(SWAGGER_TOKEN_NAME)
@Controller({
  path: 'admin/payment/room-payments',
  version: '1',
})
export class RoomPaymentController {

  constructor(
    private roomPaymentService: RoomPaymentService,
  ) {}

  @Post()
  @Permissions('room-payment-create')
  @ApiResponse({
    status: 201,
    type: RoomPaymentResponseDto,
    description: 'RoomPayment created successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public create(
    @Body() dto: CreateRoomPaymentRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<RoomPaymentResponseDto> {
    return this.roomPaymentService.create({
      ...dto,
      createdByUserId: user.id,
    });
  }

  @Get()
  @Permissions('room-payment-read')
  @ApiPaginatedResponse(RoomPaymentResponseDto)
  public findAll(@Paginate() query: PaginateQuery): Promise<PaginatedResponse<RoomPaymentEntity, RoomPaymentResponseDto>> {
    return this.roomPaymentService.list(query);
  }

  @Get('payment-status-select-options')
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
    return this.roomPaymentService.findAllForSelection();
  }

  @Get(':id')
  @Permissions('room-payment-read')
  @ApiResponse({
    status: 200,
    type: RoomPaymentResponseDto,
    description: 'Find one of RoomPayment',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RoomPaymentResponseDto> {
    return this.roomPaymentService.findOne(id);
  }

  @Put(':id')
  @Permissions('room-payment-edit')
  @ApiResponse({
    status: 200,
    type: RoomPaymentResponseDto,
    description: 'RoomPayment updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoomPaymentRequestDto,
  ): Promise<RoomPaymentResponseDto> {
    return this.roomPaymentService.update(id, dto);
  }

  @Delete(':id')
  @Permissions('room-payment-delete')
  @ApiResponse({
    status: 200,
    type: RoomPaymentResponseDto,
    description: 'RoomPayment deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RoomPaymentResponseDto> {
    return this.roomPaymentService.remove(id);
  }
}