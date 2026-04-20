import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchRequestDto } from './dto/create-branch-request.dto';
import { UpdateBranchRequestDto } from './dto/update-branch-request.dto';
import { BasePaginationCrudService } from '@common/services/base-pagination-crud.service';
import { BranchEntity } from './entities/branch.entity';
import { BranchResponseDto } from './dto/branch-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchMapper } from './branch.mapper';
import { handleError } from '@utils/handle-error.util';

@Injectable()
export class BranchService extends BasePaginationCrudService<BranchEntity, BranchResponseDto>{
  protected SORTABLE_COLUMNS = ['id', 'code', 'nameEn', 'nameKh'];
  protected FILTER_COLUMNS = ['id', 'code', 'nameEn', 'nameKh'];
  protected SEARCHABLE_COLUMNS = ['code', 'nameEn', 'nameKh', 'phoneNumber', 'description', 'address'];
  protected RELATIONSIP_FIELDS = ['manager', 'createdBy'];

  constructor(
    @InjectRepository(BranchEntity)
    private branchRepository: Repository<BranchEntity>,
  ){
    super()
  }

  protected get repository(): Repository<BranchEntity> {
    return this.branchRepository;
  } 

  protected getMapperReponseEntityField(entities: BranchEntity): Promise<BranchResponseDto> {
    return BranchMapper.toDto(entities);
  }
  
  public async create(dto: CreateBranchRequestDto): Promise<BranchResponseDto> {
    try {
      let entity = BranchMapper.toCreateEntity(dto);
      entity = await this.branchRepository.save(entity);
      return BranchMapper.toDto(entity);
    } catch (error) {
      handleError(error);
    }
  }

  public async findAllForSelection(): Promise<{id: number; code: string; nameEn: string; nameKh: string;}[]> {
    try {
      const entity = await this.branchRepository.find({
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

  public async findOne(id: number): Promise<BranchResponseDto> {
    try {
      const entity = await this.branchRepository.findOne({
        where: { id },
        relations: {
          manager: true,
          createdBy: true,
        },
      });
      if (!entity) throw new NotFoundException();
      return BranchMapper.toDto(entity);
    } catch (error) {
      handleError(error);
    }
  }

  public async update(id: number, dto: UpdateBranchRequestDto): Promise<BranchResponseDto> {
    try {
      let entity = await this.branchRepository.findOneBy({ id });
      if (!entity) throw new NotFoundException();
      entity = BranchMapper.toUpdateEntity(entity, dto);
      entity = await this.branchRepository.save(entity);
      return BranchMapper.toDto(entity);
    } catch (error) {
      handleError(error);
    }
  }

  public async remove(id: number): Promise<BranchResponseDto> {
    try {
      const entity = await this.branchRepository.findOneBy({ id });
      if (!entity) throw new NotFoundException();
      await this.branchRepository.softDelete(id);
      return BranchMapper.toDto(entity);
    } catch (error) {
      handleError(error);
    }
  }
}
