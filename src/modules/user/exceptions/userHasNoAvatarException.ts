import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exception/appException';

export class UserHasNoAvatarException extends AppException {
  constructor() {
    super({
      message: 'User has no avatar',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
