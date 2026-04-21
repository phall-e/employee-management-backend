import { Module } from '@nestjs/common';
import { RoomStatusService } from './room-status.service';
import { RoomStatusController } from './room-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomStatusEntity } from './entities/room-status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoomStatusEntity,
    ]),
  ],
  controllers: [RoomStatusController],
  providers: [RoomStatusService],
})
export class RoomStatusModule {}