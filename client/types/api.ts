export type ApiListResponse<T> = {
  data: T[];
  page: number;
  totalCount: number;
  totalPages: number;
};

export type ApiPagination = {
  page: number;
  perPage: number;
};
