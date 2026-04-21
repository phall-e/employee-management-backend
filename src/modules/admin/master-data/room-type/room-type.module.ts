import { Module } from '@nestjs/common';
import { RoomTypeService } from './room-type.service';
import { RoomTypeController } from './room-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomTypeEntity } from './entities/room-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoomTypeEntity,
    ]),
  ],
  controllers: [RoomTypeController],
  providers: [RoomTypeService],
})
export class RoomTypeModule {}