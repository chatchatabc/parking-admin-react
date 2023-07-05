import { Form, FormInstance, Input, Select } from "antd";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import { vehicleVerify } from "../../../domain/services/vehicleService";
import MyButton from "../common/MyButton";
import React from "react";

type Props = {
  title: string;
  formRef: FormInstance;
  handleSubmit: (
    sendData: (
      values: Record<string, any>
    ) => Promise<AxiosResponseData<any> | AxiosResponseError>,
    values: Record<string, any>,
    successMessage: string
  ) => Promise<AxiosResponseData<any> | AxiosResponseError>;
  loading: boolean;
};

function VehicleVerifyForm({ formRef, title, handleSubmit, loading }: Props) {
  const [status, setStatus] = React.useState(3);

  React.useEffect(() => {
    const values = formRef?.getFieldsValue();
    setStatus(values.status);
  }, []);

  return (
    <Form
      name={title}
      onFinish={(e) => {
        handleSubmit(vehicleVerify, e, "Vehicle verified successfully");
      }}
      layout="vertical"
      form={formRef}
    >
      <div className="flex flex-wrap [&>*]:px-2">
        <Form.Item name="vehicleUuid" hidden />

        <Form.Item
          className="w-full"
          name="status"
          label="Status"
          rules={[
            {
              message: "Need some input!",
              required: true,
            },
          ]}
        >
          <Select
            onChange={(value) => setStatus(value)}
            placeholder="Status"
            options={[
              {
                label: "Draft",
                value: 0,
              },
              {
                label: "Pending",
                value: 1,
              },
              {
                label: "Verify",
                value: 3,
              },
              {
                label: "Reject",
                value: 2,
              },
            ]}
          />
        </Form.Item>

        {status === 2 && (
          <Form.Item className="w-full" name="rejectionReason" label="Reason">
            <Input.TextArea placeholder="Reason" />
          </Form.Item>
        )}

        <Form.Item className="w-full">
          <MyButton
            loading={loading}
            htmlType="submit"
            className="block w-full"
          >
            Submit
          </MyButton>
        </Form.Item>
      </div>
    </Form>
  );
}

export default VehicleVerifyForm;
