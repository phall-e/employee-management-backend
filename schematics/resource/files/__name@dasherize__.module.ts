import { Module } from '@nestjs/common';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';
import { <%= classify(name) %>Controller } from './<%= dasherize(name) %>.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { <%= classify(name) %>Entity } from './entities/<%= dasherize(name) %>.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      <%= classify(name) %>Entity,
    ]),
  ],
  controllers: [<%= classify(name) %>Controller],
  providers: [<%= classify(name) %>Service],
})
export class <%= classify(name) %>Module {}