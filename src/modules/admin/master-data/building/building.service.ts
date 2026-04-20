import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePaginationCrudService } from '@common/services/base-pagination-crud.service';
import { CreateBuildingRequestDto } from './dto/create-building-request.dto';
import { UpdateBuildingRequestDto } from './dto/update-building-request.dto';
import { BuildingResponseDto } from './dto/building-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingEntity } from './entities/building.entity';
import { Repository } from 'typeorm';
import { BuildingMapper } from './building.mapper';
import { handleError } from '@utils/handle-error.util';

@Injectable()
export class BuildingService extends BasePaginationCrudService<BuildingEntity, BuildingResponseDto> {
  protected SORTABLE_COLUMNS = [
    'id', 
    'code',
    'nameEn',
    'nameKh',
    'description',
    'blockId',
    
  ];
  protected FILTER_COLUMNS = [
    'code',
    'nameEn',
    'nameKh',
    'description',
    'blockId',
  ];
  protected SEARCHABLE_COLUMNS = [
    'code',
    'nameEn',
    'nameKh',
    'description',
    'block.nameEn',
    'block.nameKh',
    'createdByUser.username',
  ];
  protected RELATIONSIP_FIELDS = ['createdByUser', 'block.branch'];

  constructor(
    @InjectRepository(BuildingEntity)
    private buildingRepository: Repository<BuildingEntity>,
  ) {
    super();
  }

  protected get repository(): Repository<BuildingEntity> {
    return this.buildingRepository;
  } 

  protected getMapperReponseEntityField(entities: BuildingEntity): Promise<BuildingResponseDto> {
    return BuildingMapper.toDto(entities);
  }

  public async create(dto: CreateBuildingRequestDto): Promise<BuildingResponseDto> {
    try {

      let entity = BuildingMapper.toCreateEntity(dto);
      entity = await this.buildingRepository.save(entity);

      return await BuildingMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async findAllForSelection(): Promise<{id: number; code: string; nameEn: string; nameKh: string;}[]> {
    try {
      const entity = await this.buildingRepository.find({
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

  public async findOne(id: number): Promise<BuildingResponseDto> {
    try {

      const entity = await this.buildingRepository.findOne({
        where: { id },
      });

      if (!entity) throw new NotFoundException();

      return BuildingMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async update(id: number, dto: UpdateBuildingRequestDto): Promise<BuildingResponseDto> {
    try {

      let entity = await this.buildingRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      entity = BuildingMapper.toUpdateEntity(entity, dto);

      entity = await this.buildingRepository.save(entity);

      return BuildingMapper.toDto(entity);
    } catch (error) {
      handleError(error);
    }
  }

  public async remove(id: number): Promise<BuildingResponseDto> {
    try {

      const entity = await this.buildingRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      await this.buildingRepository.softDelete(id);

      return await BuildingMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

}