import { Select } from "antd";
import React from "react";

interface Props {
  placeholder?: string;
  className?: string;
  optionsGet: Function;
  mode?: "multiple";
  allowClear?: boolean;
}

function SelectGraphql({ className, optionsGet, ...props }: Props) {
  const { data, loading } = optionsGet();

  return (
    <Select
      className={`w-full ${className}`}
      loading={loading}
      disabled={loading}
      options={data ?? []}
      {...props}
    />
  );
}

export default SelectGraphql;
