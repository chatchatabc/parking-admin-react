import React from "react";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import { Table, message } from "antd";
import {
  CommonPageInfo,
  CommonVariables,
} from "../../../domain/models/CommonModel";
import { ColumnsType } from "antd/es/table";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

type Props = {
  title: string;
  columns: ColumnsType<Record<string, any>>;
  getData: (variables: CommonVariables) => Promise<
    | (AxiosResponseData & {
        data: { content: Record<string, any>[]; pageInfo: CommonPageInfo };
      })
    | AxiosResponseError
  >;
};

function DynamicTable({ title, getData, columns }: Props) {
  // React Router
  const [searchParams, setSearchParams] = useSearchParams();

  // Global States
  const globalState = useSelector((state: any) => state.globalState);
  const current = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "10";
  const keyword = searchParams.get("keyword") ?? undefined;

  // Local States
  const [data, setData] = React.useState<Record<string, any>[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({
    current: Number(current),
    pageSize: Number(pageSize),
    total: 0,
  });

  function handleNavigation(page: number, pageSize: number) {
    setPagination({ ...pagination, current: page });

    // Update URL
    setSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });

    // Reset loading state
    setLoading(true);
  }

  // Reset loading state when globalState.reset is changed
  React.useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
  }, [globalState.reset]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await getData({
        page: pagination.current - 1,
        size: pagination.pageSize,
        keyword: keyword,
      });

      if (response.errors) {
        message.error("Failed to fetch data.");
      } else {
        const processedData = response.data.content.map(
          (item: any, index: number) => ({
            ...item,
            key: `${title}-${index}`,
          })
        );

        setData(processedData);
        setPagination((prev) => ({
          ...prev,
          total: response.data.pageInfo.totalElements,
        }));
      }

      setLoading(false);
    }

    if (loading) {
      fetchData();
    }
  }, [loading]);
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ ...pagination, onChange: handleNavigation }}
    />
  );
}

export default DynamicTable;
