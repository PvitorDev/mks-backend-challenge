import { CreateUserDto, UpdateUserDto } from './dto/index';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'email'],
      relations: ['moviesAdded'],
    });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({
      email,
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({
      id,
    });
  }

  async removeUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
