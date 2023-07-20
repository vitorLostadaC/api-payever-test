import { HttpStatus } from '@nestjs/common';
import { AppException } from './appException';

export class IncorrectValuesException extends AppException {
  constructor(fields: { [key: string]: string }) {
    super({
      message: 'Invalid data',
      status: HttpStatus.BAD_REQUEST,
      fields,
    });
  }
}
