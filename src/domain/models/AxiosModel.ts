export type AxiosErrorsItem = {
  title: string;
  message: string;
};

export type AxiosResponse = {
  [key: string]: any;
  data: AxiosResponseData | AxiosResponseError;
};

export type AxiosResponseData = {
  [key: string]: any;
  errors?: null;
};

export type AxiosResponseError = {
  errors: AxiosErrorsItem[];
};
