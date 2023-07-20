import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exception/appException';

export class UserNotFoundException extends AppException {
  constructor() {
    super({
      message: 'User not found',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
