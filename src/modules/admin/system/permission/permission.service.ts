import { Injectable } from '@nestjs/common';
import { PermissionGroupResponseDto } from './dto/permission-group-response.dto';
import { BasePaginationCrudService } from '@common/services/base-pagination-crud.service';
import { PermissionGroupEntity } from './entities/permission-group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionGroupMapper } from './permission-group.mapper';
import { handleError } from '@utils/handle-error.util';

@Injectable()
export class PermissionService extends BasePaginationCrudService<PermissionGroupEntity, PermissionGroupResponseDto>{
  protected SORTABLE_COLUMNS = ['id', 'name'];
  protected FILTER_COLUMNS = ['name'];
  protected SEARCHABLE_COLUMNS = ['name'];
  constructor(
    @InjectRepository(PermissionGroupEntity)
    private permissionGroupRepository: Repository<PermissionGroupEntity>,
  ){
    super()
  }

  protected get repository(): Repository<PermissionGroupEntity> {
    return this.permissionGroupRepository;
  } 

  protected getMapperReponseEntityField(entities: PermissionGroupEntity): Promise<PermissionGroupResponseDto> {
    return PermissionGroupMapper.toDto(entities);
  }

  public async findAllForSelection(): Promise<PermissionGroupResponseDto[]> {
    try {
      const entities = await this.permissionGroupRepository.find({
        order: {
          id: 'ASC',
        },
        relations: {
          permissions: true,
        }
      });
      const itemMapped = Promise.all(entities.map((item) => PermissionGroupMapper.toDto(item)));
      return itemMapped;
    } catch (error) { 
      handleError(error);
    }
  }

}
