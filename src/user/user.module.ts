import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { User } from './entities/';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  providers: [UserService, UserRepository, AuthService, JwtService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  exports: [UserService],
})
export class UserModule {}
