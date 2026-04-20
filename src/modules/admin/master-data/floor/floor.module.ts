import { Module } from '@nestjs/common';
import { FloorService } from './floor.service';
import { FloorController } from './floor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloorEntity } from './entities/floor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FloorEntity,
    ]),
  ],
  controllers: [FloorController],
  providers: [FloorService],
})
export class FloorModule {}