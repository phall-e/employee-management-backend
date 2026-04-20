import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Create<%= classify(name) %>RequestDto } from './dto/create-<%= dasherize(name) %>-request.dto';
import { Update<%= classify(name) %>RequestDto } from './dto/update-<%= dasherize(name) %>-request.dto';
import { <%= classify(name) %>ResponseDto } from './dto/<%= dasherize(name) %>-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { <%= classify(name) %>Entity } from './entities/<%= dasherize(name) %>.entity';
import { Repository } from 'typeorm';
import { <%= classify(name) %>Mapper } from './<%= dasherize(name) %>.mapper';

@Injectable()
export class <%= classify(name) %>Service {

  constructor(
    @InjectRepository(<%= classify(name) %>Entity)
    private <%= camelize(name) %>Repository: Repository<<%= classify(name) %>Entity>,
  ) {}

  public async create(dto: Create<%= classify(name) %>RequestDto): Promise<<%= classify(name) %>ResponseDto> {
    try {

      let entity = <%= classify(name) %>Mapper.toCreateEntity(dto);
      entity = await this.<%= camelize(name) %>Repository.save(entity);

      return await <%= classify(name) %>Mapper.toDto(entity);

    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  public async findAll(): Promise<<%= classify(name) %>ResponseDto[]> {
    try {

      const entities = await this.<%= camelize(name) %>Repository.find();

      const items = await Promise.all(
        entities.map((item) => <%= classify(name) %>Mapper.toDto(item))
      );

      return items;

    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  public async findOne(id: number): Promise<<%= classify(name) %>ResponseDto> {
    try {

      const entity = await this.<%= camelize(name) %>Repository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      return await <%= classify(name) %>Mapper.toDto(entity);

    } catch (error) {

      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error?.message);
    }
  }

  public async update(id: number, dto: Update<%= classify(name) %>RequestDto): Promise<<%= classify(name) %>ResponseDto> {
    try {

      let entity = await this.<%= camelize(name) %>Repository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      entity = <%= classify(name) %>Mapper.toUpdateEntity(entity, dto);

      entity = await this.<%= camelize(name) %>Repository.save(entity);

      return await <%= classify(name) %>Mapper.toDto(entity);

    } catch (error) {

      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error?.message);
    }
  }

  public async remove(id: number): Promise<<%= classify(name) %>ResponseDto> {
    try {

      const entity = await this.<%= camelize(name) %>Repository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      await this.<%= camelize(name) %>Repository.softDelete(id);

      return await <%= classify(name) %>Mapper.toDto(entity);

    } catch (error) {

      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error?.message);
    }
  }

}