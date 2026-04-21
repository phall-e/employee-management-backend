import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingEntity } from './entities/building.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuildingEntity,
    ]),
  ],
  controllers: [BuildingController],
  providers: [BuildingService],
  exports: [BuildingService],
})
export class BuildingModule {}