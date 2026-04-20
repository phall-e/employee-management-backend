import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePaginationCrudService } from '@common/services/base-pagination-crud.service';
import { Create<%= classify(name) %>RequestDto } from './dto/create-<%= dasherize(name) %>-request.dto';
import { Update<%= classify(name) %>RequestDto } from './dto/update-<%= dasherize(name) %>-request.dto';
import { <%= classify(name) %>ResponseDto } from './dto/<%= dasherize(name) %>-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { <%= classify(name) %>Entity } from './entities/<%= dasherize(name) %>.entity';
import { Repository } from 'typeorm';
import { <%= classify(name) %>Mapper } from './<%= dasherize(name) %>.mapper';
import { handleError } from '@utils/handle-error.util';

@Injectable()
export class <%= classify(name) %>Service extends BasePaginationCrudService<<%= classify(name) %>Entity, <%= classify(name) %>ResponseDto> {
  protected SORTABLE_COLUMNS = [
    'id', 
    <% for (const field of fields) { %>
      '<%= camelize(field) %>',
    <% } %>
  ];
  protected FILTER_COLUMNS = [
    <% for (const field of fields) { %>
      '<%= camelize(field) %>',
    <% } %>
  ];
  protected SEARCHABLE_COLUMNS = [
    <% for (const field of fields) { %>
      '<%= camelize(field) %>',
    <% } %>
    'createdByUser.username',
  ];
  protected RELATIONSIP_FIELDS = ['createdByUser'];

  constructor(
    @InjectRepository(<%= classify(name) %>Entity)
    private <%= camelize(name) %>Repository: Repository<<%= classify(name) %>Entity>,
  ) {
    super();
  }

  protected get repository(): Repository<<%= classify(name) %>Entity> {
    return this.<%= camelize(name)%>Repository;
  } 

  protected getMapperReponseEntityField(entities: <%= classify(name) %>Entity): Promise<<%= classify(name) %>ResponseDto> {
    return <%= classify(name) %>Mapper.toDto(entities);
  }

  public async create(dto: Create<%= classify(name) %>RequestDto): Promise<<%= classify(name) %>ResponseDto> {
    try {

      let entity = <%= classify(name) %>Mapper.toCreateEntity(dto);
      entity = await this.<%= camelize(name) %>Repository.save(entity);

      return await <%= classify(name) %>Mapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async findAllForSelection(): Promise<{id: number; code: string; nameEn: string; nameKh: string;}[]> {
    try {
      const entity = await this.<%= camelize(name) %>Repository.find({
        select: {
          id: true,
          code: true,
          nameEn: true,
          nameKh: true,
        }
      });
      return entity;
    } catch (error) {
      handleError(error);
    }
  }

  public async findOne(id: number): Promise<<%= classify(name) %>ResponseDto> {
    try {

      const entity = await this.<%= camelize(name) %>Repository.findOne({
        where: { id },
      });

      if (!entity) throw new NotFoundException();

      return <%= classify(name) %>Mapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async update(id: number, dto: Update<%= classify(name) %>RequestDto): Promise<<%= classify(name) %>ResponseDto> {
    try {

      let entity = await this.<%= camelize(name) %>Repository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      entity = <%= classify(name) %>Mapper.toUpdateEntity(entity, dto);

      entity = await this.<%= camelize(name) %>Repository.save(entity);

      return <%= classify(name) %>Mapper.toDto(entity);
    } catch (error) {
      handleError(error);
    }
  }

  public async remove(id: number): Promise<<%= classify(name) %>ResponseDto> {
    try {

      const entity = await this.<%= camelize(name) %>Repository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      await this.<%= camelize(name) %>Repository.softDelete(id);

      return await <%= classify(name) %>Mapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

}