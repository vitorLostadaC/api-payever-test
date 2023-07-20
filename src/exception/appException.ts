import { HttpException, HttpStatus } from '@nestjs/common';

interface AppExceptionProps {
  message: string;
  status: HttpStatus;
  fields?: { [key: string]: string };
}

class AppException extends HttpException {
  constructor({ message, status, fields }: AppExceptionProps) {
    super(
      {
        message,
        fields,
      },
      status,
    );
  }
}

export { AppException, AppExceptionProps };
