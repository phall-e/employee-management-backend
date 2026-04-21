import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { FloorModule } from '../floor/floor.module';
import { BuildingModule } from '../building/building.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoomEntity,
    ]),
    FloorModule,
    BuildingModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}