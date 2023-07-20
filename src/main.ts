import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { IncorrectValuesException } from './exception/incorrectValuesException';
import { mapperClassValidateErrorToAppError } from './utils/mappers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
        throw new IncorrectValuesException(
          mapperClassValidateErrorToAppError(errors),
        );
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
