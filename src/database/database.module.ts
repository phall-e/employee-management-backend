import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
                type: 'postgres',
                extra: {
                    options: '-c timezone=Asia/Phnom_Penh',
                },
                host: configService.get<string>('TYPEORM_HOST'),
                port: configService.get<number>('TYPEORM_PORT'),
                username: configService.get<string>('TYPEORM_USERNAME'),
                password: configService.get<string>('TYPEORM_PASSWORD'),
                database: configService.get<string>('TYPEORM_DATABASE'),
                autoLoadEntities: true,
                synchronize: false,
                logging: true,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
