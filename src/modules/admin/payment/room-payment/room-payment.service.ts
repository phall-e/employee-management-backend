import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePaginationCrudService } from '@common/services/base-pagination-crud.service';
import { CreateRoomPaymentRequestDto } from './dto/create-room-payment-request.dto';
import { UpdateRoomPaymentRequestDto } from './dto/update-room-payment-request.dto';
import { RoomPaymentResponseDto } from './dto/room-payment-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomPaymentEntity } from './entities/room-payment.entity';
import { Repository } from 'typeorm';
import { RoomPaymentMapper } from './room-payment.mapper';
import { handleError } from '@utils/handle-error.util';
import { PaymentStatusEntity } from './entities/payment-status.entity';

@Injectable()
export class RoomPaymentService extends BasePaginationCrudService<RoomPaymentEntity, RoomPaymentResponseDto> {
  protected SORTABLE_COLUMNS = [
    'id', 
    'roomTenantId',
    'amount',
    'month',
    'paymentDate',
    'note',  
    'statusId',
  ];
  protected FILTER_COLUMNS = [
    'roomTenantId',
    'amount',
    'month',
    'paymentDate',
    'note',
    'statusId',
  ];
  protected SEARCHABLE_COLUMNS = [
    'amount',
    'note',
    'status.nameEn',
    'status.nameKh',
    'createdByUser.username',
  ];
  protected RELATIONSIP_FIELDS = ['createdByUser', 'status', 'roomTenant'];

  constructor(
    @InjectRepository(RoomPaymentEntity)
    private roomPaymentRepository: Repository<RoomPaymentEntity>,
    @InjectRepository(PaymentStatusEntity)
    private paymentStatusRepository: Repository<PaymentStatusEntity>,
  ) {
    super();
  }

  protected get repository(): Repository<RoomPaymentEntity> {
    return this.roomPaymentRepository;
  } 

  protected getMapperReponseEntityField(entities: RoomPaymentEntity): Promise<RoomPaymentResponseDto> {
    return RoomPaymentMapper.toDto(entities);
  }

  public async create(dto: CreateRoomPaymentRequestDto): Promise<RoomPaymentResponseDto> {
    try {

      let entity = RoomPaymentMapper.toCreateEntity(dto);
      entity = await this.roomPaymentRepository.save(entity);

      return await RoomPaymentMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async findAllForSelection(): Promise<{id: number; nameEn: string; nameKh: string;}[]> {
    try {
      const entity = await this.paymentStatusRepository.find({
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

  public async findOne(id: number): Promise<RoomPaymentResponseDto> {
    try {

      const entity = await this.roomPaymentRepository.findOne({
        where: { id },
        relations: {
          createdByUser: true,
          status: true,
          roomTenant: {
            room: {
              building: {
                block: {
                  branch: true,
                }
              },
              floor: true,
            },
          },
        },
      });

      if (!entity) throw new NotFoundException();

      return RoomPaymentMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

  public async update(id: number, dto: UpdateRoomPaymentRequestDto): Promise<RoomPaymentResponseDto> {
    try {

      let entity = await this.roomPaymentRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      entity = RoomPaymentMapper.toUpdateEntity(entity, dto);

      entity = await this.roomPaymentRepository.save(entity);

      return RoomPaymentMapper.toDto(entity);
    } catch (error) {
      handleError(error);
    }
  }

  public async remove(id: number): Promise<RoomPaymentResponseDto> {
    try {

      const entity = await this.roomPaymentRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      await this.roomPaymentRepository.softDelete(id);

      return await RoomPaymentMapper.toDto(entity);

    } catch (error) {
      handleError(error);
    }
  }

}