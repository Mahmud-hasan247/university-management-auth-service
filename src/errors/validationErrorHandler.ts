import mongoose from 'mongoose';
import { IGenericErrorMessages } from '../interfaces/validationErrorMessage';
import { IGenericErrorResponse } from '../interfaces/common';

const validationErrorHandler = (err: mongoose.Error.ValidationError) => {
  const errorMessages: IGenericErrorMessages[] = Object.values(err.errors).map(
    el => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  const errorResponse: IGenericErrorResponse = {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages,
  };

  return errorResponse;
};

export default validationErrorHandler;
