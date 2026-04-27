import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BasePaginationCrudService } from '@common/services/base-pagination-crud.service';
import { CreateRoomRequestDto } from './dto/create-room-request.dto';
import { UpdateRoomRequestDto } from './dto/update-room-request.dto';
import { RoomResponseDto } from './dto/room-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { DataSource, Repository } from 'typeorm';
import { RoomMapper } from './room.mapper';
import { handleError } from '@utils/handle-error.util';
import { BuildingService } from '../building/building.service';
import { FloorService } from '../floor/floor.service';

@Injectable()
export class RoomService extends BasePaginationCrudService<RoomEntity, RoomResponseDto> {
  protected SORTABLE_COLUMNS = [
    'id', 
    'roomNumber',
    'buildingId',
    'floorId',
    'roomTypeId',
    'price',
    'statusId',
  ];
  protected FILTER_COLUMNS = [
    'roomNumber',
    'buildingId',
    'floorId',
    'roomTypeId',
    'price',
    'statusId',
  ];
  protected SEARCHABLE_COLUMNS = [
    'roomNumber',
    'building.nameEn',
    'building.nameKh',
    'floor.nameEn',
    'floor.nameKh',
    'roomType.nameEn',
    'roomType.nameKh',
    'price',
    'status.nameEn',
    'status.nameKh',
    'createdByUser.username',
  ];
  protected RELATIONSIP_FIELDS = [
    'createdByUser', 
    'building.branch', 
    'floor', 
    'roomType'
  ];

  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
    private buildingService: BuildingService,
    private floorService: FloorService,
    private dataSource: DataSource,
  ) {
    super();
  }

  protected get repository(): Repository<RoomEntity> {
    return this.roomRepository;
  } 

  protected getMapperReponseEntityField(entities: RoomEntity): Promise<RoomResponseDto> {
    return RoomMapper.toDto(entities);
  }

  public async create(dto: CreateRoomRequestDto): Promise<RoomResponseDto[]> {
    const queryRunner = this.dataSource.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const building = await this.buildingService.findOne(dto.buildingId);
      if (!building) throw new NotFoundException('Building not found');
      const floor = await this.floorService.findOne(dto.floorId);
      if (!floor) throw new NotFoundException('Floor not found');
      if (dto.itemLength < 1) throw new BadRequestException('The item length must bigger than 0');

      const branchCode = building.branch.code.split('-')[0] ?? null;
      const buildingCode = building.code;
      const floorCode = floor.code.split('-')[1] ?? null;
      let itemEntities = [];

      for (let i = 0; i < dto.itemLength; i++) {
        let entity = RoomMapper.toCreateEntity({
          ...dto,
          roomNumber: `${branchCode}${buildingCode}${floorCode}-${dto.startNumber}`,
        });
        dto.startNumber += 1;
        itemEntities.push(entity);
      }

      itemEntities = await this.roomRepository.save(itemEntities);
      itemEntities = await Promise.all(
        itemEntities.map(item => RoomMapper.toDto(item))
      );
      await queryRunner.commitTransaction();

      return itemEntities;

    } catch (error) {
      await queryRunner.rollbackTransaction();

      handleError(error);
    } finally {
      await queryRunner.release();
    }
  }

  public async findAllForSelection(): Promise<{id: number; roomNumber: string; buildingId: number; floorId: number}[]> {
    try {
      const entity = await this.roomRepository.find({
        select: {
          id: true,
          roomNumber: true,
          buildingId: true,
          floorId: true,
        }
      });
      return entity;
    } catch (error) {
      handleError(error);
    }
  }

  public async findOne(id: number): Promise<RoomResponseDto> {
    try {

      const entity = await this.roomRepository.findOne({
        where: { id },
        relations: {
          createdByUser: true,
        },
      });

      if (!entity) throw new NotFoundException();

      return RoomMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async update(id: number, dto: UpdateRoomRequestDto): Promise<RoomResponseDto> {
    try {

      let entity = await this.roomRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      entity = RoomMapper.toUpdateEntity(entity, dto);

      entity = await this.roomRepository.save(entity);

      return RoomMapper.toDto(entity);
    } catch (error) {
      handleError(error);
    }
  }

  public async remove(id: number): Promise<RoomResponseDto> {
    try {

      const entity = await this.roomRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      await this.roomRepository.softDelete(id);

      return await RoomMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

}