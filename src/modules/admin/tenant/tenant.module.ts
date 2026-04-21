import { Module } from '@nestjs/common';
import { RoomTenantModule } from './room-tenant/room-tenant.module';

@Module({
    imports: [
        RoomTenantModule,
    ],
})
export class TenantModule {}
