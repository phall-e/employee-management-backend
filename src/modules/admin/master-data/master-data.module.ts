import { Module } from '@nestjs/common';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [BranchModule]
})
export class MasterDataModule {}
