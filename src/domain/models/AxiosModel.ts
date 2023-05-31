export type AxiosErrorsItem = {
  title: string;
  message: string;
};

export type AxiosResponse = {
  [key: string]: any;
  data: AxiosResponseData;
};

export type AxiosResponseData = {
  [key: string]: any;
  errors: AxiosErrorsItem[];
};
