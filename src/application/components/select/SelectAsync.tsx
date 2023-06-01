import { Select, message } from "antd";
import React from "react";

type Props = {
  className?: string;
  getData: Function;
  placeholder?: string;
  mode?: "multiple" | "tags";
}

function SelectAsync({ className, getData, placeholder, mode }: Props) {
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const response = await getData();

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
      placeholder={placeholder}
      mode={mode}
    />
  );
}

export default SelectAsync;
