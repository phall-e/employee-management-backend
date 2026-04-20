import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { BuildingService } from './building.service';
import { CreateBuildingRequestDto } from './dto/create-building-request.dto';
import { UpdateBuildingRequestDto } from './dto/update-building-request.dto';
import { BuildingResponseDto } from './dto/building-response.dto';
import { CurrentUser } from '@modules/auth/decorators/current-user.decorator';
import { UserEntity } from '@modules/admin/system/user/entities/user.entity';
import { ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Permissions } from '@modules/auth/decorators/permissions.decorator';
import { ApiPaginatedResponse } from '@common/paginations/api-paginated-response.decorator';
import { Paginate, type PaginateQuery } from 'nestjs-paginate';
import { PaginatedResponse } from '@common/paginations/paginated-response.type';
import { BuildingEntity } from './entities/building.entity';
import { SWAGGER_TOKEN_NAME } from 'src/swagger/config';

@ApiTags('Building')
@ApiBearerAuth(SWAGGER_TOKEN_NAME)
@Controller({
  path: 'admin/master-data/buildings',
  version: '1',
})
export class BuildingController {

  constructor(
    private buildingService: BuildingService,
  ) {}

  @Post()
  @Permissions('building-create')
  @ApiResponse({
    status: 201,
    type: BuildingResponseDto,
    description: 'Building created successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public create(
    @Body() dto: CreateBuildingRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<BuildingResponseDto> {
    return this.buildingService.create({
      ...dto,
      createdByUserId: user.id,
    });
  }

  @Get()
  @Permissions('building-read')
  @ApiPaginatedResponse(BuildingResponseDto)
  public findAll(@Paginate() query: PaginateQuery): Promise<PaginatedResponse<BuildingEntity, BuildingResponseDto>> {
    return this.buildingService.list(query);
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
    return this.buildingService.findAllForSelection();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: BuildingResponseDto,
    description: 'Find one of Building',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildingResponseDto> {
    return this.buildingService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: BuildingResponseDto,
    description: 'Building updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBuildingRequestDto,
  ): Promise<BuildingResponseDto> {
    return this.buildingService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: BuildingResponseDto,
    description: 'Building deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildingResponseDto> {
    return this.buildingService.remove(id);
  }
}