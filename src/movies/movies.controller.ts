import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { Movie } from './entities';
import { JwtAuthGuard } from '../auth/guards';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';

import {
  ApiCreateMovie,
  ApiGetMovieById,
  ApiUpdateMovie,
  ApiDeleteMovie,
  ApiGetMovieAll,
} from '../decorators';
@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiGetMovieAll()
  async findAll(@Query('page') page: number = 1): Promise<any> {
    return this.moviesService.findAll(page);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiGetMovieById()
  async findOne(@Param('id') id: number): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiCreateMovie()
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @Req() req,
  ): Promise<Movie> {
    createMovieDto.addedByUser = req.user.id;
    return this.moviesService.create(createMovieDto);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiUpdateMovie()
  async update(
    @Param('id') id: number,
    @Req() req,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    const isOwner = await this.userService.ownerMovieAdd(req.user.id, id);
    if (!isOwner) {
      throw new UnauthorizedException();
    }
    return await this.moviesService.update(id, updateMovieDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiDeleteMovie()
  async remove(@Param('id') id: number, @Req() req): Promise<void> {
    const isOwner = await this.userService.ownerMovieAdd(req.user.id, id);
    if (!isOwner) {
      throw new UnauthorizedException();
    }
    return this.moviesService.remove(id);
  }
}
