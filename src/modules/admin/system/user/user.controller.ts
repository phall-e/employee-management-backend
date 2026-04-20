import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@common/paginations/api-paginated-response.decorator';
import { UserResponseDto } from './dto/user-response.dto';
import { PaginatedResponse } from '@common/paginations/paginated-response.type';
import { UserEntity } from './entities/user.entity';
import { Paginate, type PaginateQuery } from 'nestjs-paginate';
import { SWAGGER_TOKEN_NAME } from 'src/swagger/config';
import { Permissions } from '@modules/auth/decorators/permissions.decorator';

@ApiTags('User')
@ApiBearerAuth(SWAGGER_TOKEN_NAME)
@Controller({
  path: 'admin/system/user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserRequestDto) {
    return this.userService.create(dto);
  }

  @Get()
  @Permissions('user-read')
  @ApiPaginatedResponse(UserResponseDto)
  public findAll(@Paginate() queery: PaginateQuery): Promise<PaginatedResponse<UserEntity, UserResponseDto>> {
    return this.userService.list(queery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserRequestDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
