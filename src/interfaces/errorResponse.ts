import { IGenericErrorMessages } from './validationErrorMessage';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessages[];
};
