import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import { AuthRequest } from '../user/interfaces';
import { IsPublic } from './decorators';
import { ApiLoginUser } from 'src/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiLoginUser()
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
