// import { UserEntity } from 'src/modules/admin/system/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { users } from './user.seed';
import { PasswordHash } from 'src/utils/password-hash.util';
import { UserEntity } from '@modules/admin/system/user/entities/user.entity';
import { PermissionGroupEntity } from '@modules/admin/system/permission/entities/permission-group.entity';
import { permissions } from './permission.seed';
import { RoleEntity } from '@modules/admin/system/role/entities/role.entity';
import { roles } from './role.seed';
import { BranchEntity } from '@modules/admin/master-data/branch/entities/branch.entity';
import { branches } from './branch.seed';
import { FloorEntity } from '@modules/admin/master-data/floor/entities/floor.entity';
import { floors } from './floor.seed';
import { BlockEntity } from '@modules/admin/master-data/block/entities/block.entity';
import { blocks } from './block.seed';

export default class MainSeeder implements Seeder {
    
    public async run(database: DataSource): Promise<void> {

        await database.manager.save(PermissionGroupEntity, permissions);

        const userHashed: Partial<UserEntity>[] = await Promise.all(
            users.map( async(item) => ({
                ...item,
                password: await PasswordHash.hash(item.password),
            })),
        );

        await database.manager.save(UserEntity, userHashed);

        await database.manager.save(RoleEntity, roles);

        await database.manager.createQueryBuilder()
            .insert()
            .into('admin.role_permissions')
            .values(permissions.map((_, index)=> ({
                role_id: 1,
                permission_id: index + 1,
            })))
            .execute();

        await database.manager.createQueryBuilder()
            .insert()
            .into('admin.user_roles')
            .values(userHashed.map((_, index) => ({
                user_id: index + 1,
                role_id: 1,
            })))
            .execute();

        await database.manager.save(BranchEntity, branches);
        await database.manager.save(FloorEntity, floors);
        await database.manager.save(BlockEntity, blocks);
        
    } 

}