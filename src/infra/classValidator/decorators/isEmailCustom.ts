import { registerDecorator, ValidationOptions, isEmail } from 'class-validator';
import { exceptionMessages } from '../data/exceptionMessages';

export function IsEmailCustom(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(email: string) {
          return isEmail(email);
        },

        defaultMessage() {
          return exceptionMessages.IsEmail;
        },
      },
    });
  };
}
