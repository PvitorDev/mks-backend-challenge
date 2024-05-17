import { Module } from '@nestjs/common';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MoviesModule } from './movies/movies.module';
import * as dotenv from 'dotenv';
import { I18nModule, HeaderResolver } from 'nestjs-i18n';
import { join } from 'path';
import { RedisOptions } from './redis';

dotenv.config();
@Module({
  imports: [
    UserModule,
    AuthModule,
    MoviesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: Boolean(process.env.DB_SYNCH),
    }),
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: true,
        },
        typesOutputPath: join(__dirname, '../src/generated/i18n.generated.ts'),
      }),
      resolvers: [new HeaderResolver(['x-custom-lang'])],
    }),
    CacheModule.registerAsync(RedisOptions),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
