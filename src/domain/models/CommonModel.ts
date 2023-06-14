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

export type CommonVariables = {
  [key: string]: any;
  page: number;
  size: number;
};

export type CommonSeries = { name: string; data: number[] };
