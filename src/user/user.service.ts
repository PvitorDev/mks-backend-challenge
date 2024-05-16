import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/index';
import { User } from './entities';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await this.userRepository.findUserByEmail(
      createUserDto.email,
    );
    if (userExist) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists.`,
      );
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    const userByEmail = await this.userRepository.findUserByEmail(
      updateUserDto.email,
    );
    if (userByEmail && userByEmail.id !== id) {
      throw new ConflictException(
        `User with email ${updateUserDto.email} already exists.`,
      );
    }
    return this.userRepository.updateUser(id, updateUserDto);
  }

  async removeUser(id: number): Promise<void> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    await this.userRepository.removeUser(id);
  }

  async ownerMovieAdd(id: number, idMovie: number): Promise<boolean> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user.moviesAdded.some((movie) => movie.id === idMovie);
  }
}
