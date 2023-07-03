import { Select, SelectProps, message } from "antd";
import React from "react";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import {
  CommonOptions,
  CommonVariables,
} from "../../../domain/models/CommonModel";

type Props = SelectProps & {
  getData: (
    variables: CommonVariables
  ) => Promise<AxiosResponseData<CommonOptions[]> | AxiosResponseError>;
};

function SelectAsync({ getData, className, ...props }: Props) {
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const response = await getData({
        page: 0,
        size: 100000,
      });

      if (response.errors) {
        message.error("Failed to fetch data.");
      } else {
        setData(response.data);
      }

      setLoading(false);
    }

    if (loading) {
      fetchData();
    }
  }, []);

  return (
    <Select
      className={`w-full ${className}`}
      loading={loading}
      disabled={loading}
      options={data}
      {...props}
    />
  );
}

export default SelectAsync;
