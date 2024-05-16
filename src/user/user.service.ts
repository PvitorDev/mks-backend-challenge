import { Injectable, NotFoundException } from '@nestjs/common';
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
      throw new NotFoundException();
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.userRepository.updateUser(id, updateUserDto);
  }

  async removeUser(id: number): Promise<void> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    await this.userRepository.removeUser(id);
  }
}
