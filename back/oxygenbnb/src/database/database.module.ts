import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow("PG_HOST"),
        port: configService.getOrThrow("PG_PORT"),
        database: configService.getOrThrow("PG_DB"),
        username: configService.getOrThrow("PG_USER"),
        password: configService.getOrThrow("PG_PASSWORD"),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow("NODE_ENV") === "production" ? false : true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

// ConfigModule.forRoot(),
//     TypeOrmModule.forRoot({
//       type: process.env.DB_TYPE as any,
//       host: process.env.PG_HOST,
//       port: parseInt(process.env.PG_PORT),
//       username: process.env.PG_USER,
//       password: process.env.PG_PASSWORD,
//       database: process.env.PG_DB,
//       entities: [__dirname + "/**/*.entity{.ts,.js}"],
//       synchronize: process.env.NODE_ENV === "production" ? false : true,
//     }),