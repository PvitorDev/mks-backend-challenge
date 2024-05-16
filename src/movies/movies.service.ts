import { Injectable, NotFoundException } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { Movie } from './entities';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async findAll(page: number = 1): Promise<any> {
    Number.isNaN(page) ? (page = 1) : page;

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
    return this.moviesRepository.createMovie(createMovieDto);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return this.moviesRepository.updateMovie(id, updateMovieDto);
  }

  async remove(id: number): Promise<void> {
    const movie = await this.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return this.moviesRepository.removeMovie(id);
  }
}
