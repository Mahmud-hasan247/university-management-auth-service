import mongoose from 'mongoose';
import { IGeneric_error_response } from '../interfaces/common';
import { IGeneric_error_messages } from '../interfaces/validationErrorMessage';

const validation_error_handler = (err: mongoose.Error.ValidationError) => {
  const error_messages: IGeneric_error_messages[] = Object.values(
    err.errors
  ).map(el => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });

  const error_response: IGeneric_error_response = {
    status_code: 400,
    message: 'Validation Error',
    error_messages,
  };

  return error_response;
};

export default validation_error_handler;
