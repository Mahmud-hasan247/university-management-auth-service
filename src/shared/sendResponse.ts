import { Response } from 'express';

type IApi_response<T> = {
  status_code: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

export const send_response = <T>(
  res: Response,
  data: IApi_response<T>
): void => {
  const responses: IApi_response<T> = {
    status_code: data?.status_code,
    success: data?.success,
    message: data?.message || null,
    meta: data?.meta,
    data: data?.data || null,
  };

  res.status(data?.status_code).json(responses);
};
