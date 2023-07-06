import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessages } from '../interfaces/validationErrorMessage';

const zodErrorHandler = (err: ZodError): IGenericErrorResponse => {
  const errorMessages: IGenericErrorMessages[] = err.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue?.path[issue?.path?.length - 1],
        message: issue?.message,
      };
    }
  );

  const errorResponse = {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages,
  };

  return errorResponse;
};

export default zodErrorHandler;
