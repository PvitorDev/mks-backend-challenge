import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { Movie } from './entities';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly i18n: I18nService<I18nTranslations>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  private readonly logger: Logger = new Logger(MoviesService.name);

  async findAll(page: number = 1): Promise<any> {
    if (isNaN(page) || page < 1) {
      const messageError = this.i18n.t('errors.INVALID_PAGE_NUMBER', {
        lang: I18nContext.current().lang,
      });
      this.logger.error(messageError);
      throw new BadRequestException(messageError);
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
    const cachedMovie = await this.cacheManager.get<Movie>(
      `/api/v1/movies/${id}`,
    );
    if (cachedMovie) {
      return cachedMovie;
    }
    if (!movie) {
      const messageError = this.i18n.t('errors.MOVIE_NOT_FOUND_WITH_ID', {
        lang: I18nContext.current().lang,
        args: { id },
      });
      this.logger.error(messageError);
      throw new NotFoundException(messageError);
    }
    return movie;
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      await this.cacheManager.del('movies/all');
      return await this.moviesRepository.createMovie(createMovieDto);
    } catch (error) {
      const messageError = this.i18n.t('errors.MOVIE_FAILED_TO_CREATE', {
        lang: I18nContext.current().lang,
      });
      this.logger.error(messageError);
      this.logger.error(error.message);
      throw new BadRequestException(messageError);
    }
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    if (!movie) {
      const messageError = this.i18n.t('errors.MOVIE_NOT_FOUND_WITH_ID', {
        lang: I18nContext.current().lang,
        args: { id },
      });
      this.logger.error(messageError);
      throw new NotFoundException(messageError);
    }
    try {
      const cachedMovie = await this.cacheManager.get(`/api/v1/movies/${id}`);
      if (cachedMovie) {
        await this.cacheManager.del(`/api/v1/movies/${id}`);
      }
      await this.cacheManager.del('movies/all');
      return await this.moviesRepository.updateMovie(id, updateMovieDto);
    } catch (error) {
      const messageError = this.i18n.t('errors.MOVIE_FAILED_TO_UPDATE', {
        lang: I18nContext.current().lang,
        args: { id },
      });
      this.logger.error(messageError);
      this.logger.error(error.message);
      throw new BadRequestException(messageError);
    }
  }

  async remove(id: number): Promise<void> {
    const movie = await this.findOne(id);
    if (!movie) {
      const messageError = this.i18n.t('errors.MOVIE_NOT_FOUND_WITH_ID', {
        lang: I18nContext.current().lang,
        args: { id },
      });
      this.logger.error(messageError);
      throw new NotFoundException(messageError);
    }
    try {
      const cachedMovie = await this.cacheManager.get(`/api/v1/movies/${id}`);
      if (cachedMovie) {
        await this.cacheManager.del(`/api/v1/movies/${id}`);
      }
      await this.cacheManager.del('movies/all');
      await this.moviesRepository.removeMovie(id);
    } catch (error) {
      const messageError = this.i18n.t('errors.MOVIE_FAILED_TO_REMOVE', {
        lang: I18nContext.current().lang,
        args: { id },
      });
      this.logger.error(messageError);
      throw new BadRequestException(messageError);
    }
  }
}
