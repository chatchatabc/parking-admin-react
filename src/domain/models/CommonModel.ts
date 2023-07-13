export type CommonPageInfo = {
  size: number;
  totalElements: number;
  first: Boolean;
  last: Boolean;
  empty: Boolean;
};

export type CommonContent<T> = {
  content: T[];
  pageInfo: CommonPageInfo;
};

export type CommonOptions = {
  label: any;
  value: any;
};

export type CommonVariables = {
  [key: string]: any;
  page?: number;
  size?: number;
};

export type CommonSeries = { name: string; data: number[] };

export type CommonPaginationSort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

export type CommonPaginationPageable = {
  sort: CommonPaginationSort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};

export type CommonPagination<Data = any> = {
  content: Data[];
  sort: CommonPaginationSort;
  pageable: CommonPaginationPageable;

  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;

  first: boolean;
  last: boolean;
  empty: boolean;
};
