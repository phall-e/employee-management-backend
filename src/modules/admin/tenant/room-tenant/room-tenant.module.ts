import { Module } from '@nestjs/common';
import { RoomTenantService } from './room-tenant.service';
import { RoomTenantController } from './room-tenant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomTenantEntity } from './entities/room-tenant.entity';
import { TenantStatusEntity } from './entities/tenant-status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TenantStatusEntity,
      RoomTenantEntity,
    ]),
  ],
  controllers: [RoomTenantController],
  providers: [RoomTenantService],
})
export class RoomTenantModule {}