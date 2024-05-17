import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/index';
import { User } from './entities';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}
  private readonly logger: Logger = new Logger(UserService.name);

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      const messageError = this.i18n.t('errors.USER_NOT_FOUND_WITH_ID', {
        lang: I18nContext.current().lang,
        args: { id },
      });
      this.logger.error(messageError);
      throw new NotFoundException(messageError);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      const messageError = this.i18n.t('errors.USER_NOT_FOUND_WITH_EMAIL', {
        lang: I18nContext.current().lang,
        args: { email },
      });
      this.logger.error(messageError);
      throw new NotFoundException(messageError);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await this.userRepository.findUserByEmail(
      createUserDto.email,
    );
    if (userExist) {
      const messageError = this.i18n.t('errors.USER_ALREADY_EXIST', {
        lang: I18nContext.current().lang,
        args: { email: createUserDto.email },
      });
      this.logger.error(messageError);
      throw new ConflictException(messageError);
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
      const messageError = this.i18n.t('errors.USER_NOT_FOUND_WITH_ID', {
        lang: I18nContext.current().lang,
        args: { id },
      });
      this.logger.error(messageError);
      throw new NotFoundException(messageError);
    }
    const userByEmail = await this.userRepository.findUserByEmail(
      updateUserDto.email,
    );
    if (userByEmail && userByEmail.id !== id) {
      const messageError = this.i18n.t('errors.USER_ALREADY_EXIST', {
        lang: I18nContext.current().lang,
        args: { email: updateUserDto.email },
      });
      this.logger.error(messageError);
      throw new ConflictException(messageError);
    }
    return this.userRepository.updateUser(id, updateUserDto);
  }

  async removeUser(id: number): Promise<void> {
    const user = await this.findUserById(id);
    if (!user) {
      const messageError = this.i18n.t('errors.USER_NOT_FOUND_WITH_ID', {
        lang: I18nContext.current().lang,
        args: { id },
      });
      this.logger.error(messageError);
      throw new NotFoundException(messageError);
    }
    await this.userRepository.removeUser(id);
  }

  async ownerMovieAdd(id: number, idMovie: number): Promise<boolean> {
    const user = await this.findUserById(id);
    if (!user) {
      const messageError = this.i18n.t('errors.USER_NOT_FOUND_WITH_ID', {
        lang: I18nContext.current().lang,
        args: { id },
      });
      this.logger.error(messageError);
      throw new NotFoundException(messageError);
    }
    return user.moviesAdded.some((movie) => movie.id === idMovie);
  }
}
