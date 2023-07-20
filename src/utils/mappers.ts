import { ValidationError } from 'class-validator';

/**
 * Convert default error that classValidator to App Error
 */
export const mapperClassValidateErrorToAppError = (
  errors: ValidationError[],
) => {
  const errorList = {} as { [key: string]: string };

  const firstError = 0;

  errors.forEach((item) => {
    console.log(item);
    errorList[item.property] = Object.values(item.constraints ?? {})[
      firstError
    ];
  });

  return errorList;
};
