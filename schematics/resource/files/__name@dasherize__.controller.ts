import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';
import { Create<%= classify(name) %>RequestDto } from './dto/create-<%= dasherize(name) %>-request.dto';
import { Update<%= classify(name) %>RequestDto } from './dto/update-<%= dasherize(name) %>-request.dto';
import { <%= classify(name) %>ResponseDto } from './dto/<%= dasherize(name) %>-response.dto';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller({
  path: 'admin/<%= dasherize(name) %>',
  version: '1',
})
export class <%= classify(name) %>Controller {

  constructor(
    private <%= camelize(name)%>Service: <%= classify(name) %>Service,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    type: <%= classify(name) %>ResponseDto,
    description: '<%= classify(name) %> created successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  public create(
    @Body() dto: Create<%= classify(name) %>RequestDto,
  ): Promise<<%= classify(name) %>ResponseDto> {
    return this.<%= camelize(name) %>Service.create(dto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [<%= classify(name) %>ResponseDto],
    description: '<%= classify(name) %> list',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  public findAll(): Promise<<%= classify(name) %>ResponseDto[]> {
    return this.<%= camelize(name) %>Service.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: <%= classify(name) %>ResponseDto,
    description: 'Find one of <%= classify(name) %>',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<<%= classify(name) %>ResponseDto> {
    return this.<%= camelize(name) %>Service.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: <%= classify(name) %>ResponseDto,
    description: '<%= classify(name) %> updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Update<%= classify(name) %>RequestDto,
  ): Promise<<%= classify(name) %>ResponseDto> {
    return this.<%= camelize(name) %>Service.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: <%= classify(name) %>ResponseDto,
    description: '<%= classify(name) %> deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<<%= classify(name) %>ResponseDto> {
    return this.<%= camelize(name) %>Service.remove(id);
  }
}