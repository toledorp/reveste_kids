import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  healthCheck() {
    return {
      module: 'users',
      status: 'ok',
      message: 'Users module is running',
    };
  }
}
