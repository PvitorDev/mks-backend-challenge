import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards';
import { User } from './entities';
import { IsPublic } from 'src/auth/decorators';
import { ApiTags } from '@nestjs/swagger';

import {
  ApiGetUserById,
  ApiGetMyProfile,
  ApiCreateUser,
  ApiUpdateUser,
  ApiDeleteUser,
} from '../decorators';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiGetUserById()
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(id);
  }
  @ApiGetMyProfile()
  @Get()
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@Req() req): Promise<User> {
    return this.userService.findUserById(req.user.id);
  }

  @ApiCreateUser()
  @IsPublic()
  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
  @ApiUpdateUser()
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiDeleteUser()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.removeUser(id);
  }
}
