import { ErrorRequestHandler } from 'express'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import validationErrorHandler from '../../errors/validationErrorHandler'
import { IGenericErrorResponse } from '../../interfaces/errorResponse'
import { IGenericErrorMessages } from '../../interfaces/validationErrorMessage'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMessages: IGenericErrorMessages[] = []

  if (err?.name === 'ValidationError') {
    // ________Validation Error _______________
    const simplifiedErrors: IGenericErrorResponse = validationErrorHandler(err)
    statusCode = simplifiedErrors?.statusCode
    message = simplifiedErrors?.message
    errorMessages = simplifiedErrors?.errorMessages
  } else if (err instanceof ApiError) {
    //  ___________ Custom Error ____________
    message = err?.message
    statusCode = err?.statusCode
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    //  __________ built in error _____________
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    status: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? err.stack : undefined,
  })

  next()
}

export default globalErrorHandler
