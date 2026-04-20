import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Paginate, type PaginateQuery } from 'nestjs-paginate';
import { ApiPaginatedResponse } from '@common/paginations/api-paginated-response.decorator';
import { PermissionGroupResponseDto } from './dto/permission-group-response.dto';
import { PermissionGroupEntity } from './entities/permission-group.entity';
import { PaginatedResponse } from '@common/paginations/paginated-response.type';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Permission')
@Controller({
  path: 'admin/system/permission',
  version: '1',
})
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  @ApiPaginatedResponse(PermissionGroupResponseDto)
  public findAll(@Paginate() queery: PaginateQuery): Promise<PaginatedResponse<PermissionGroupEntity, PermissionGroupResponseDto>> {
    return this.permissionService.list(queery);
  }

  @Get('select-options')
  @ApiResponse({ description: 'Find all for select options', type: [PermissionGroupResponseDto] })
  public findAllForSelection(): Promise<PermissionGroupResponseDto[]> {
    return this.permissionService.findAllForSelection();
  }

}
