import { IGeneric_error_messages } from './validationErrorMessage';

export type IGeneric_error_response = {
  status_code: number;
  message: string;
  error_messages: IGeneric_error_messages[];
};

export type IGeneric_response<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
