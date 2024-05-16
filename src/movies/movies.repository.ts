import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { Movie } from './entities';

@Injectable()
export class MovieRepository extends Repository<Movie> {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {
    super(
      movieRepository.target,
      movieRepository.manager,
      movieRepository.queryRunner,
    );
  }

  async findMovieById(id: number): Promise<Movie | undefined> {
    return this.movieRepository.findOne({
      where: { id },
    });
  }

  async findMovieByTitle(title: string): Promise<Movie | undefined> {
    return this.movieRepository.findOne({
      where: { title },
    });
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movie);
  }

  async updateMovie(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie | undefined> {
    await this.movieRepository.update(id, updateMovieDto);
    return this.movieRepository.findOne({
      where: { id },
    });
  }

  async removeMovie(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
