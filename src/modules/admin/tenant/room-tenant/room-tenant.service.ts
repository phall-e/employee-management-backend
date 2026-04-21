import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePaginationCrudService } from '@common/services/base-pagination-crud.service';
import { CreateRoomTenantRequestDto } from './dto/create-room-tenant-request.dto';
import { UpdateRoomTenantRequestDto } from './dto/update-room-tenant-request.dto';
import { RoomTenantResponseDto } from './dto/room-tenant-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomTenantEntity } from './entities/room-tenant.entity';
import { Repository } from 'typeorm';
import { RoomTenantMapper } from './room-tenant.mapper';
import { handleError } from '@utils/handle-error.util';
import { TenantStatusEntity } from './entities/tenant-status.entity';

@Injectable()
export class RoomTenantService extends BasePaginationCrudService<RoomTenantEntity, RoomTenantResponseDto> {
  protected SORTABLE_COLUMNS = [
    'id', 
    'roomId',
    'tenantName',
    'phoneNumber',
    'idCardNumber',
    'startDate',
    'depositAmount',
    'statusId',
  ];
  protected FILTER_COLUMNS = [
    'roomId',
    'tenantName',
    'phoneNumber',
    'idCardNumber',
    'startDate',
    'depositAmount',    
    'statusId',
  ];
  protected SEARCHABLE_COLUMNS = [
    'room.nameEn',
    'room.nameKh',
    'room.building.nameKh',
    'room.building.nameEn',
    'room.floor.nameKh',
    'room.floor.nameEn',
    'room.building.block.nameKh',
    'room.building.block.nameEn',
    'room.building.block.branch.nameKh',
    'room.building.block.branch.nameEn',
    'tenantName',
    'phoneNumber',
    'idCardNumber',
    'startDate',
    'depositAmount',
    'statusId',
    'createdByUser.username',
  ];
  protected RELATIONSIP_FIELDS = [
    'createdByUser', 
    'room.floor', 
    'room.roomType', 
    'room.status', 
    'room.building.block.branch',
  ];

  constructor(
    @InjectRepository(RoomTenantEntity)
    private roomTenantRepository: Repository<RoomTenantEntity>,
    @InjectRepository(TenantStatusEntity)
    private tenantStatusRepository: Repository<TenantStatusEntity>,
  ) {
    super();
  }

  protected get repository(): Repository<RoomTenantEntity> {
    return this.roomTenantRepository;
  } 

  protected getMapperReponseEntityField(entities: RoomTenantEntity): Promise<RoomTenantResponseDto> {
    return RoomTenantMapper.toDto(entities);
  }

  public async create(dto: CreateRoomTenantRequestDto): Promise<RoomTenantResponseDto> {
    try {

      let entity = RoomTenantMapper.toCreateEntity(dto);
      entity = await this.roomTenantRepository.save(entity);

      return await RoomTenantMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async findAllForSelection(): Promise<{id: number; nameEn: string; nameKh: string;}[]> {
    try {
      const entity = await this.tenantStatusRepository.find({
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

  public async findOne(id: number): Promise<RoomTenantResponseDto> {
    try {

      const entity = await this.roomTenantRepository.findOne({
        where: { id },
        relations: {
          createdByUser: true,
        },
      });

      if (!entity) throw new NotFoundException();

      return RoomTenantMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async update(id: number, dto: UpdateRoomTenantRequestDto): Promise<RoomTenantResponseDto> {
    try {

      let entity = await this.roomTenantRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      entity = RoomTenantMapper.toUpdateEntity(entity, dto);

      entity = await this.roomTenantRepository.save(entity);

      return RoomTenantMapper.toDto(entity);
    } catch (error) {
      handleError(error);
    }
  }

  public async remove(id: number): Promise<RoomTenantResponseDto> {
    try {

      const entity = await this.roomTenantRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      await this.roomTenantRepository.softDelete(id);

      return await RoomTenantMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

}