import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePaginationCrudService } from '@common/services/base-pagination-crud.service';
import { CreateRoomTypeRequestDto } from './dto/create-room-type-request.dto';
import { UpdateRoomTypeRequestDto } from './dto/update-room-type-request.dto';
import { RoomTypeResponseDto } from './dto/room-type-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomTypeEntity } from './entities/room-type.entity';
import { Repository } from 'typeorm';
import { RoomTypeMapper } from './room-type.mapper';
import { handleError } from '@utils/handle-error.util';

@Injectable()
export class RoomTypeService extends BasePaginationCrudService<RoomTypeEntity, RoomTypeResponseDto> {
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
  ];
  protected SEARCHABLE_COLUMNS = [
    'code',
    'nameEn',
    'nameKh',
    'description',
    'createdByUser.username',
  ];
  protected RELATIONSIP_FIELDS = ['createdByUser'];

  constructor(
    @InjectRepository(RoomTypeEntity)
    private roomTypeRepository: Repository<RoomTypeEntity>,
  ) {
    super();
  }

  protected get repository(): Repository<RoomTypeEntity> {
    return this.roomTypeRepository;
  } 

  protected getMapperReponseEntityField(entities: RoomTypeEntity): Promise<RoomTypeResponseDto> {
    return RoomTypeMapper.toDto(entities);
  }

  public async create(dto: CreateRoomTypeRequestDto): Promise<RoomTypeResponseDto> {
    try {

      let entity = RoomTypeMapper.toCreateEntity(dto);
      entity = await this.roomTypeRepository.save(entity);

      return await RoomTypeMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async findAllForSelection(): Promise<{id: number; code: string; nameEn: string; nameKh: string;}[]> {
    try {
      const entity = await this.roomTypeRepository.find({
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

  public async findOne(id: number): Promise<RoomTypeResponseDto> {
    try {

      const entity = await this.roomTypeRepository.findOne({
        where: { id },
      });

      if (!entity) throw new NotFoundException();

      return RoomTypeMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async update(id: number, dto: UpdateRoomTypeRequestDto): Promise<RoomTypeResponseDto> {
    try {

      let entity = await this.roomTypeRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      entity = RoomTypeMapper.toUpdateEntity(entity, dto);

      entity = await this.roomTypeRepository.save(entity);

      return RoomTypeMapper.toDto(entity);
    } catch (error) {
      handleError(error);
    }
  }

  public async remove(id: number): Promise<RoomTypeResponseDto> {
    try {

      const entity = await this.roomTypeRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      await this.roomTypeRepository.softDelete(id);

      return await RoomTypeMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

}