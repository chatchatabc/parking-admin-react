import { Select, message } from "antd";
import React from "react";

type Props = {
  className?: string;
  getData: Function;
  placeholder?: string;
  mode?: "multiple" | "tags";
};

function SelectAsyncSearch({ className, getData, placeholder, mode }: Props) {
  const [keyword, setKeyword] = React.useState("");
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      console.log(keyword);
      const response = await getData({ keyword });

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
  }, [loading]);

  React.useEffect(() => {
    let timer = setTimeout(() => {
      setLoading(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [keyword]);

  return (
    <Select
      className={`w-full ${className}`}
      placeholder={placeholder}
      loading={loading && data.length === 0 && keyword === ""}
      disabled={loading && data.length === 0 && keyword === ""}
      showSearch
      onSearch={(value) => {
        setKeyword(value);
      }}
      filterOption={false}
      options={data}
      mode={mode}
      onSelect={() => {
        setKeyword("");
        setLoading(true);
      }}
    />
  );
}

export default SelectAsyncSearch;
