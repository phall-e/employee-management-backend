import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { handleError } from '@utils/handle-error.util';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from './user.mapper';
import { PasswordHash } from '@utils/password-hash.util';
import { BasePaginationCrudService } from '@common/services/base-pagination-crud.service';

@Injectable()
export class UserService extends BasePaginationCrudService<UserEntity, UserResponseDto>{
  protected SORTABLE_COLUMNS = ['id', 'username', 'isAdmin', 'isActive'];
  protected FILTER_COLUMNS = ['username', 'isAdmin', 'isActive'];
  protected SEARCHABLE_COLUMNS = ['username', 'isAdmin', 'isActive'];

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ){
    super()
  }

  protected get repository(): Repository<UserEntity> {
    return this.userRepository;
  } 

  protected getMapperReponseEntityField(entities: UserEntity): Promise<UserResponseDto> {
    return UserMapper.toDto(entities);
  }

  public async create(dto: CreateUserRequestDto): Promise<UserResponseDto> {
    try {
      let entity = UserMapper.toCreateEntity({
        ...dto,
        password: await PasswordHash.hash(dto.password),
      });
      entity = await this.userRepository.save(entity);
      if (dto.roles?.length) {
        await this.userRepository
          .createQueryBuilder()
          .relation(UserEntity, 'roles')
          .of(entity.id) // or entity
          .add(dto.roles);
      }
      return UserMapper.toDto(entity);
    } catch (error) {
      handleError(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  public async findOneByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: [
        { username: username },
        { email: username },
      ],
      relations: {
        roles: {
          permissions: true,
        }
      }
    });
  }

  update(id: number, dto: UpdateUserRequestDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
