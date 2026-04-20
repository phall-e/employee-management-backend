import { Module } from '@nestjs/common';
import { BranchModule } from './branch/branch.module';
import { FloorModule } from './floor/floor.module';
import { BlockModule } from './block/block.module';
import { BuildingModule } from './building/building.module';

@Module({
  imports: [
    FloorModule,
    BranchModule,
    BlockModule,
    BuildingModule,
  ]
})
export class MasterDataModule {}
