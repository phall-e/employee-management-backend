import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePaginationCrudService } from '@common/services/base-pagination-crud.service';
import { CreateBlockRequestDto } from './dto/create-block-request.dto';
import { UpdateBlockRequestDto } from './dto/update-block-request.dto';
import { BlockResponseDto } from './dto/block-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockEntity } from './entities/block.entity';
import { Repository } from 'typeorm';
import { BlockMapper } from './block.mapper';
import { handleError } from '@utils/handle-error.util';

@Injectable()
export class BlockService extends BasePaginationCrudService<BlockEntity, BlockResponseDto> {
  protected SORTABLE_COLUMNS = [
    'id', 
    'code',
    'nameEn',
    'nameKh',
    'description',
  ];
  protected FILTER_COLUMNS = [
    'code',
    'nameEn',
    'nameKh',
    'description',
    'branch.nameEn',
    'branch.nameKh',
  ];
  protected SEARCHABLE_COLUMNS = [
    'code',
    'nameEn',
    'nameKh',
    'description',
    'createdByUser.username',
    'branch.nameEn',
    'branch.nameKh',
  ];
  protected RELATIONSIP_FIELDS = ['createdByUser', 'branch'];

  constructor(
    @InjectRepository(BlockEntity)
    private blockRepository: Repository<BlockEntity>,
  ) {
    super();
  }

  protected get repository(): Repository<BlockEntity> {
    return this.blockRepository;
  } 

  protected getMapperReponseEntityField(entities: BlockEntity): Promise<BlockResponseDto> {
    return BlockMapper.toDto(entities);
  }

  public async create(dto: CreateBlockRequestDto): Promise<BlockResponseDto> {
    try {

      let entity = BlockMapper.toCreateEntity(dto);
      entity = await this.blockRepository.save(entity);

      return await BlockMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async findAllForSelection(): Promise<{id: number; code: string; nameEn: string; nameKh: string;}[]> {
    try {
      const entity = await this.blockRepository.find({
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

  public async findOne(id: number): Promise<BlockResponseDto> {
    try {

      const entity = await this.blockRepository.findOne({
        where: { id },
        relations: {
          createdByUser: true,
        }
      });

      if (!entity) throw new NotFoundException();

      return BlockMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async update(id: number, dto: UpdateBlockRequestDto): Promise<BlockResponseDto> {
    try {

      let entity = await this.blockRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      entity = BlockMapper.toUpdateEntity(entity, dto);

      entity = await this.blockRepository.save(entity);

      return BlockMapper.toDto(entity);
    } catch (error) {
      handleError(error);
    }
  }

  public async remove(id: number): Promise<BlockResponseDto> {
    try {

      const entity = await this.blockRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      await this.blockRepository.softDelete(id);

      return await BlockMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

}