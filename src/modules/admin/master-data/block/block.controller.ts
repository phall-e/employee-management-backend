import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockRequestDto } from './dto/create-block-request.dto';
import { UpdateBlockRequestDto } from './dto/update-block-request.dto';
import { BlockResponseDto } from './dto/block-response.dto';
import { CurrentUser } from '@modules/auth/decorators/current-user.decorator';
import { UserEntity } from '@modules/admin/system/user/entities/user.entity';
import { ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Permissions } from '@modules/auth/decorators/permissions.decorator';
import { ApiPaginatedResponse } from '@common/paginations/api-paginated-response.decorator';
import { Paginate, type PaginateQuery } from 'nestjs-paginate';
import { PaginatedResponse } from '@common/paginations/paginated-response.type';
import { BlockEntity } from './entities/block.entity';
import { SWAGGER_TOKEN_NAME } from 'src/swagger/config';

@ApiTags('Block')
@ApiBearerAuth(SWAGGER_TOKEN_NAME)
@Controller({
  path: 'admin/master-data/blocks',
  version: '1',
})
export class BlockController {

  constructor(
    private blockService: BlockService,
  ) {}

  @Post()
  @Permissions('block-create')
  @ApiResponse({
    status: 201,
    type: BlockResponseDto,
    description: 'Block created successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public create(
    @Body() dto: CreateBlockRequestDto,
    @CurrentUser() user: UserEntity
  ): Promise<BlockResponseDto> {
    return this.blockService.create({
      ...dto,
      createdByUserId: user.id,
    });
  }

  @Get()
  @Permissions('block-read')
  @ApiPaginatedResponse(BlockResponseDto)
  public findAll(@Paginate() query: PaginateQuery): Promise<PaginatedResponse<BlockEntity, BlockResponseDto>> {
    return this.blockService.list(query);
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
    return this.blockService.findAllForSelection();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: BlockResponseDto,
    description: 'Find one of Block',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BlockResponseDto> {
    return this.blockService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: BlockResponseDto,
    description: 'Block updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBlockRequestDto,
  ): Promise<BlockResponseDto> {
    return this.blockService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: BlockResponseDto,
    description: 'Block deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BlockResponseDto> {
    return this.blockService.remove(id);
  }
}