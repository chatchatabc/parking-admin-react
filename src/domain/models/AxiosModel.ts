export type AxiosResponse<T> = {
  [key: string]: any;
  data: AxiosResponseData<T> | AxiosResponseError;
};

export type AxiosResponseErrorItem = {
  title: string;
  message: string;
};

export type AxiosResponseData<Data> = {
  data: Data;
  errors?: null;
};

export type AxiosResponseError = {
  errors: AxiosResponseErrorItem[];
};
