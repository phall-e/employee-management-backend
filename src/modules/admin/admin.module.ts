import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { MasterDataModule } from './master-data/master-data.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [SystemModule, MasterDataModule, TenantModule]
})
export class AdminModule {}
