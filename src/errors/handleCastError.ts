import mongoose from 'mongoose';
import { IGeneric_error_response } from '../interfaces/common';
import { IGeneric_error_messages } from '../interfaces/validationErrorMessage';

const handle_cast_error = (error: mongoose.Error.CastError) => {
  const error_messages: IGeneric_error_messages[] = [
    {
      path: error?.path,
      message: 'Invalid Id',
    },
  ];

  const error_response: IGeneric_error_response = {
    status_code: 400,
    message: 'Invalid Id',
    error_messages,
  };

  return error_response;
};

export default handle_cast_error;
