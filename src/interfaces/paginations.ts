import { SortOrder } from 'mongoose';

export type I_pagination_options = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};
