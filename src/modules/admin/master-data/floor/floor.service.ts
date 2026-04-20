import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePaginationCrudService } from '@common/services/base-pagination-crud.service';
import { CreateFloorRequestDto } from './dto/create-floor-request.dto';
import { UpdateFloorRequestDto } from './dto/update-floor-request.dto';
import { FloorResponseDto } from './dto/floor-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FloorEntity } from './entities/floor.entity';
import { Repository } from 'typeorm';
import { FloorMapper } from './floor.mapper';
import { handleError } from '@utils/handle-error.util';

@Injectable()
export class FloorService extends BasePaginationCrudService<FloorEntity, FloorResponseDto> {
  protected SORTABLE_COLUMNS = ['id', 'code', 'nameEn', 'nameKh'];
  protected FILTER_COLUMNS = ['id', 'code', 'nameEn', 'nameKh'];
  protected SEARCHABLE_COLUMNS = ['code', 'nameEn', 'nameKh', 'description'];
  protected RELATIONSIP_FIELDS = ['createdByUser'];

  constructor(
    @InjectRepository(FloorEntity)
    private floorRepository: Repository<FloorEntity>,
  ) {
    super();
  }

  protected get repository(): Repository<FloorEntity> {
    return this.floorRepository;
  } 

  protected getMapperReponseEntityField(entities: FloorEntity): Promise<FloorResponseDto> {
    return FloorMapper.toDto(entities);
  }

  public async create(dto: CreateFloorRequestDto): Promise<FloorResponseDto> {
    try {

      let entity = FloorMapper.toCreateEntity(dto);
      entity = await this.floorRepository.save(entity);

      return await FloorMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async findAllForSelection(): Promise<{id: number; code: string; nameEn: string; nameKh: string;}[]> {
    try {
      const entity = await this.floorRepository.find({
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

  public async findOne(id: number): Promise<FloorResponseDto> {
    try {

      const entity = await this.floorRepository.findOne({
        where: { id },
      });

      if (!entity) throw new NotFoundException();

      return FloorMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async update(id: number, dto: UpdateFloorRequestDto): Promise<FloorResponseDto> {
    try {

      let entity = await this.floorRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      entity = FloorMapper.toUpdateEntity(entity, dto);

      entity = await this.floorRepository.save(entity);

      return FloorMapper.toDto(entity);
    } catch (error) {
      handleError(error);
    }
  }

  public async remove(id: number): Promise<FloorResponseDto> {
    try {

      const entity = await this.floorRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      await this.floorRepository.softDelete(id);

      return await FloorMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

}