import { Module } from '@nestjs/common';
import { RoomTenantService } from './room-tenant.service';
import { RoomTenantController } from './room-tenant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomTenantEntity } from './entities/room-tenant.entity';
import { TenantStatusEntity } from './entities/tenant-status.entity';
import { RoomModule } from '@modules/admin/master-data/room/room.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TenantStatusEntity,
      RoomTenantEntity,
    ]),
    RoomModule,
  ],
  controllers: [RoomTenantController],
  providers: [RoomTenantService],
})
export class RoomTenantModule {}