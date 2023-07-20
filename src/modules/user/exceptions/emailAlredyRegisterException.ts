import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exception/appException';

export class EmailAlredyRegisterException extends AppException {
  constructor() {
    super({
      message: 'E-mail alredy registered',
      status: HttpStatus.CONFLICT,
    });
  }
}
