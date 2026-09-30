import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service.js';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '../enum/config.enum.js';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getUsers(): any {
    const db = this.configService.get('db');
    console.log(db);

    return {
      code: 200,
      data: [],
      msg: 'success',
    };
  }
}
