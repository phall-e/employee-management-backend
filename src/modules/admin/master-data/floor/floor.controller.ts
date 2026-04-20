import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { FloorService } from './floor.service';
import { CreateFloorRequestDto } from './dto/create-floor-request.dto';
import { UpdateFloorRequestDto } from './dto/update-floor-request.dto';
import { FloorResponseDto } from './dto/floor-response.dto';
import { CurrentUser } from '@modules/auth/decorators/current-user.decorator';
import { UserEntity } from '@modules/admin/system/user/entities/user.entity';
import { ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Permissions } from '@modules/auth/decorators/permissions.decorator';
import { ApiPaginatedResponse } from '@common/paginations/api-paginated-response.decorator';
import { Paginate, type PaginateQuery } from 'nestjs-paginate';
import { PaginatedResponse } from '@common/paginations/paginated-response.type';
import { FloorEntity } from './entities/floor.entity';
import { SWAGGER_TOKEN_NAME } from 'src/swagger/config';

@ApiTags('Floor')
@ApiBearerAuth(SWAGGER_TOKEN_NAME)
@Controller({
  path: 'admin/master-data/floors',
  version: '1',
})
export class FloorController {

  constructor(
    private floorService: FloorService,
  ) {}

  @Post()
  @Permissions('floor-create')
  @ApiResponse({
    status: 201,
    type: FloorResponseDto,
    description: 'Floor created successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public create(
    @Body() dto: CreateFloorRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<FloorResponseDto> {
    return this.floorService.create({
      ...dto,
      createdByUserId: user.id,
    });
  }

  @Get()
  @Permissions('floor-read')
  @ApiPaginatedResponse(FloorResponseDto)
  public findAll(@Paginate() query: PaginateQuery): Promise<PaginatedResponse<FloorEntity, FloorResponseDto>> {
    return this.floorService.list(query);
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
    return this.floorService.findAllForSelection();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: FloorResponseDto,
    description: 'Find one of Floor',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FloorResponseDto> {
    return this.floorService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: FloorResponseDto,
    description: 'Floor updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFloorRequestDto,
  ): Promise<FloorResponseDto> {
    return this.floorService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: FloorResponseDto,
    description: 'Floor deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FloorResponseDto> {
    return this.floorService.remove(id);
  }
}