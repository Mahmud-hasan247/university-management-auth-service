import { ZodError, ZodIssue } from 'zod';
import { IGeneric_error_response } from '../interfaces/common';
import { IGeneric_error_messages } from '../interfaces/validationErrorMessage';

const zod_error_handler = (err: ZodError): IGeneric_error_response => {
  const error_messages: IGeneric_error_messages[] = err.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue?.path[issue?.path?.length - 1],
        message: issue?.message,
      };
    }
  );

  const error_response = {
    status_code: 400,
    message: 'Validation Error',
    error_messages,
  };

  return error_response;
};

export default zod_error_handler;
