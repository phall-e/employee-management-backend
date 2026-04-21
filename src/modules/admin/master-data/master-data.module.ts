import { Module } from '@nestjs/common';
import { BranchModule } from './branch/branch.module';
import { FloorModule } from './floor/floor.module';
import { BlockModule } from './block/block.module';
import { BuildingModule } from './building/building.module';
import { RoomTypeModule } from './room-type/room-type.module';

@Module({
  imports: [
    FloorModule,
    BranchModule,
    BlockModule,
    BuildingModule,
    RoomTypeModule,
  ]
})
export class MasterDataModule {}
