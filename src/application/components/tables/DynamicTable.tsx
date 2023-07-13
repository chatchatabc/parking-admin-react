import React from "react";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import { Table, message } from "antd";
import {
  CommonPagination,
  CommonVariables,
} from "../../../domain/models/CommonModel";
import { TableProps } from "antd/es/table";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

type Props = TableProps<any> & {
  showPagination?: boolean;
  localPagination?: boolean;
  getData?: (
    variables: CommonVariables
  ) => Promise<AxiosResponseData<CommonPagination<any>> | AxiosResponseError>;
};

function DynamicTable({
  dataSource,
  getData,
  localPagination = true,
  showPagination = true,
  ...props
}: Props) {
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
    total: dataSource?.length ?? 0,
  });

  function handleNavigation(page: number, pageSize: number) {
    setPagination({ ...pagination, current: page });

    if (!localPagination) {
      // Update URL
      setSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });
    }

    // Reset loading state
    setLoading(true);
  }

  // Reset loading state when globalState.reset is changed
  React.useEffect(() => {
    if (!loading) {
      setPagination((prev) => ({ ...prev, current: 1 }));
      setLoading(true);
    }
  }, [globalState.reset]);

  React.useEffect(() => {
    if (loading) {
      (async () => {
        if (getData) {
          const response = await getData({
            page: pagination.current - 1,
            size: pagination.pageSize,
            keyword,
          });

          if (response.errors) {
            message.error("Failed to fetch table data.");
          } else {
            const processedData = response.data.content.map(
              (item: any, index: number) => ({
                ...item,
                key: `${props.caption}-${index}`,
              })
            );

            setData(processedData);
            setPagination((prev) => ({
              ...prev,
              total: response.data.totalElements,
            }));
          }
        }

        setLoading(false);
      })();
    }
  }, [loading]);

  return (
    <Table
      loading={loading}
      dataSource={dataSource ?? data}
      pagination={
        showPagination ? { ...pagination, onChange: handleNavigation } : false
      }
      className="myTable"
      rowClassName={"myTableRow"}
      {...props}
    />
  );
}

export default DynamicTable;
