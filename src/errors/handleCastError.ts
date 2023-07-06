import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessages } from '../interfaces/validationErrorMessage';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errorMessages: IGenericErrorMessages[] = [
    {
      path: error?.path,
      message: 'Invalid Id',
    },
  ];

  const errorResponse: IGenericErrorResponse = {
    statusCode: 400,
    message: 'Invalid Id',
    errorMessages,
  };

  return errorResponse;
};

export default handleCastError;
