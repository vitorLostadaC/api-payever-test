import { registerDecorator, ValidationOptions, isEmpty } from 'class-validator';
import { exceptionMessages } from '../data/exceptionMessages';

export function IsNotEmptyCustom(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: string) {
          return !isEmpty(value);
        },

        defaultMessage() {
          return exceptionMessages.IsNotEmpty;
        },
      },
    });
  };
}
