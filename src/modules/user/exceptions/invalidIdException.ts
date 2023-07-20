import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exception/appException';

export class InvalidIdException extends AppException {
  constructor() {
    super({
      message: 'invalid id',
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
