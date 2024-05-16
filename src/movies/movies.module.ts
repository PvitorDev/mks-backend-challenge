import { Module, forwardRef } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MoviesRepository } from './movies.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Movie } from './entities';

@Module({
  providers: [MoviesService, MoviesRepository],
  controllers: [MoviesController],
  imports: [TypeOrmModule.forFeature([Movie]), forwardRef(() => AuthModule)],
})
export class MoviesModule {}
