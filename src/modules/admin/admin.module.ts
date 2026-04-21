import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { MasterDataModule } from './master-data/master-data.module';
import { TenantModule } from './tenant/tenant.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [SystemModule, MasterDataModule, TenantModule, PaymentModule]
})
export class AdminModule {}
