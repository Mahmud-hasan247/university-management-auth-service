import { ErrorRequestHandler } from 'express';
import config from '../../config';
import Api_Error from '../../errors/ApiError';
import validation_error_handler from '../../errors/validationErrorHandler';
import { IGeneric_error_response } from '../../interfaces/common';
import { IGeneric_error_messages } from '../../interfaces/validationErrorMessage';
import { error_logger } from '../../shared/logger';
import { ZodError } from 'zod';
import zod_error_handler from '../../errors/zodErrorHandler';
import handle_cast_error from '../../errors/handleCastError';

const global_error_handler: ErrorRequestHandler = (err, req, res, next) => {
  //  ________ logger ___________
  config.env === 'development'
    ? console.log('ERROR', err)
    : error_logger.error('An error occurred', err);

  //  _________ error response initialization __________
  let status_code = 500;
  let message = 'Something went wrong!';
  let error_messages: IGeneric_error_messages[] = [];

  if (err?.name === 'ValidationError') {
    // ________Validation Error _______________
    const simplified_errors: IGeneric_error_response =
      validation_error_handler(err);
    status_code = simplified_errors?.status_code;
    message = simplified_errors?.message;
    error_messages = simplified_errors?.error_messages;
    //
    // _________________________________________
  } else if (err?.name === 'CastError') {
    // ________ Cast Error _______________
    const simplified_errors: IGeneric_error_response = handle_cast_error(err);
    status_code = simplified_errors?.status_code;
    message = simplified_errors?.message;
    error_messages = simplified_errors?.error_messages;

    //
    // _________________________________________
  } else if (err instanceof ZodError) {
    //  __________ Zod Error _______________
    const simplified_errors: IGeneric_error_response = zod_error_handler(err);
    status_code = simplified_errors?.status_code;
    message = simplified_errors?.message;
    error_messages = simplified_errors?.error_messages;
    //
    // ____________________________________________
  } else if (err instanceof Api_Error) {
    //  ___________ Custom Error ____________
    message = err?.message;
    status_code = err?.status_code;
    error_messages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    //  __________ built in error _____________
    message = err?.message;
    error_messages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }
  res.status(status_code).json({
    status: false,
    message,
    error_messages,
    stack: config.env === 'development' ? err.stack : undefined,
  });

  next();
};

export default global_error_handler;
