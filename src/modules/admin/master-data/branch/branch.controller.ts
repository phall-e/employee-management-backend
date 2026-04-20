import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchRequestDto } from './dto/create-branch-request.dto';
import { UpdateBranchRequestDto } from './dto/update-branch-request.dto';
import { CurrentUser } from '@modules/auth/decorators/current-user.decorator';
import { UserEntity } from '@modules/admin/system/user/entities/user.entity';
import { ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BranchResponseDto } from './dto/branch-response.dto';
import { Permissions } from '@modules/auth/decorators/permissions.decorator';
import { ApiPaginatedResponse } from '@common/paginations/api-paginated-response.decorator';
import { Paginate, type PaginateQuery } from 'nestjs-paginate';
import { PaginatedResponse } from '@common/paginations/paginated-response.type';
import { BranchEntity } from './entities/branch.entity';
import { SWAGGER_TOKEN_NAME } from 'src/swagger/config';

@ApiTags('Branch')
@ApiBearerAuth(SWAGGER_TOKEN_NAME)
@Controller({
  path: 'admin/master-data/branches',
  version: '1',
})
export class BranchController {
  constructor(private branchService: BranchService) {}

  @Post()
  @Permissions('branch-create')
  @ApiResponse({ status: 201, description: 'Create branch', type: BranchResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public create(@Body() dto: CreateBranchRequestDto, @CurrentUser() user: UserEntity): Promise<BranchResponseDto> {
    return this.branchService.create({
      ...dto,
      createdById: user.id,
    });
  }

  @Get()
  @Permissions('branch-read')
  @ApiPaginatedResponse(BranchResponseDto)
  public findAll(@Paginate() query: PaginateQuery): Promise<PaginatedResponse<BranchEntity, BranchResponseDto>> {
    return this.branchService.list(query);
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
  public findAllForSelection(): Promise<{id: number; nameEn: string; nameKh: string}[]> {
    return this.branchService.findAllForSelection();
  }

  @Get(':id')
  @Permissions('branch-read')
  @ApiResponse({ status: 200, description: 'Find one branch', type: BranchResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<BranchResponseDto> {
    return this.branchService.findOne(id);
  }

  @Put(':id')
  @Permissions('branch-update')
  @ApiResponse({ status: 200, description: 'Update branch', type: BranchResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden' })
  public update(@Param('id') id: number, @Body() dto: UpdateBranchRequestDto) {
    return this.branchService.update(id, dto);
  }

  @Delete(':id')
  @Permissions('branch-delete')
  @ApiResponse({ status: 200, description: 'Delete branch', type: BranchResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiForbiddenResponse({ description: 'Forbidden' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<BranchResponseDto> {
    return this.branchService.remove(+id);
  }
}
