import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePaginationCrudService } from '@common/services/base-pagination-crud.service';
import { CreateRoomStatusRequestDto } from './dto/create-room-status-request.dto';
import { UpdateRoomStatusRequestDto } from './dto/update-room-status-request.dto';
import { RoomStatusResponseDto } from './dto/room-status-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomStatusEntity } from './entities/room-status.entity';
import { Repository } from 'typeorm';
import { RoomStatusMapper } from './room-status.mapper';
import { handleError } from '@utils/handle-error.util';

@Injectable()
export class RoomStatusService extends BasePaginationCrudService<RoomStatusEntity, RoomStatusResponseDto> {
  protected SORTABLE_COLUMNS = [
    'id', 
    'nameEn',
    'nameKh',
  ];
  protected FILTER_COLUMNS = [
    'nameEn',
    'nameKh',
  ];
  protected SEARCHABLE_COLUMNS = [
    'nameEn',
    'nameKh',
    'createdByUser.username',
  ];
  protected RELATIONSIP_FIELDS = ['createdByUser'];

  constructor(
    @InjectRepository(RoomStatusEntity)
    private roomStatusRepository: Repository<RoomStatusEntity>,
  ) {
    super();
  }

  protected get repository(): Repository<RoomStatusEntity> {
    return this.roomStatusRepository;
  } 

  protected getMapperReponseEntityField(entities: RoomStatusEntity): Promise<RoomStatusResponseDto> {
    return RoomStatusMapper.toDto(entities);
  }

  public async create(dto: CreateRoomStatusRequestDto): Promise<RoomStatusResponseDto> {
    try {

      let entity = RoomStatusMapper.toCreateEntity(dto);
      entity = await this.roomStatusRepository.save(entity);

      return await RoomStatusMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async findAllForSelection(): Promise<{id: number; nameEn: string; nameKh: string;}[]> {
    try {
      const entity = await this.roomStatusRepository.find({
        select: {
          id: true,
          nameEn: true,
          nameKh: true,
        }
      });
      return entity;
    } catch (error) {
      handleError(error);
    }
  }

  public async findOne(id: number): Promise<RoomStatusResponseDto> {
    try {

      const entity = await this.roomStatusRepository.findOne({
        where: { id },
        relations: {
          createdByUser: true,
        },
      });

      if (!entity) throw new NotFoundException();

      return RoomStatusMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async update(id: number, dto: UpdateRoomStatusRequestDto): Promise<RoomStatusResponseDto> {
    try {

      let entity = await this.roomStatusRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      entity = RoomStatusMapper.toUpdateEntity(entity, dto);

      entity = await this.roomStatusRepository.save(entity);

      return RoomStatusMapper.toDto(entity);
    } catch (error) {
      handleError(error);
    }
  }

  public async remove(id: number): Promise<RoomStatusResponseDto> {
    try {

      const entity = await this.roomStatusRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      await this.roomStatusRepository.softDelete(id);

      return await RoomStatusMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

}