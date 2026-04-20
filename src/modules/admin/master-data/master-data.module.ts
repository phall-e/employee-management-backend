import { Module } from '@nestjs/common';
import { BranchModule } from './branch/branch.module';
import { FloorModule } from './floor/floor.module';

@Module({
  imports: [
    FloorModule,
    BranchModule,
  ]
})
export class MasterDataModule {}
