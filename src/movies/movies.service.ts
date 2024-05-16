import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { Movie } from './entities';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}
  private readonly logger: Logger = new Logger(MoviesService.name);

  async findAll(page: number = 1): Promise<any> {
    if (isNaN(page) || page < 1) {
      throw new BadRequestException('Invalid page number');
    }

    const perPage = 10;
    const skip = (page - 1) * perPage;
    const movies = await this.moviesRepository.find({
      take: perPage,
      skip,
      relations: ['addedByUser'],
    });
    return movies.map((movie) => {
      return {
        ...movie,
        addedByUser: {
          ...movie.addedByUser,
          email: null,
          createdAt: null,
          updatedAt: null,
          password: null,
        },
      };
    });
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findMovieById(id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      return await this.moviesRepository.createMovie(createMovieDto);
    } catch (error) {
      this.logger.error(`Failed to create movie: ${error.message}`);
      throw new BadRequestException('Failed to create movie');
    }
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    try {
      return await this.moviesRepository.updateMovie(id, updateMovieDto);
    } catch (error) {
      this.logger.error(
        `Failed to update movie with ID ${id}: ${error.message}`,
      );
      throw new BadRequestException('Failed to update movie');
    }
  }

  async remove(id: number): Promise<void> {
    const movie = await this.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    try {
      await this.moviesRepository.removeMovie(id);
    } catch (error) {
      this.logger.error(
        `Failed to remove movie with ID ${id}: ${error.message}`,
      );
      throw new BadRequestException('Failed to remove movie');
    }
  }
}
