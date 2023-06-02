export type CommonPageInfo = {
  size: number;
  totalElements: number;
  first: Boolean;
  last: Boolean;
  empty: Boolean;
};

export type CommonVariables = {
  page: number;
  size: number;
  keyword?: string;
};

export type CommonSeries = { name: string; data: number[] };
