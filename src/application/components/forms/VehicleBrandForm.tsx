import { Form, FormInstance, Input, Select } from "antd";
import MyButton from "../common/MyButton";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import {
  vehicleCreateBrand,
  vehicleGetAllBrandOptions,
  vehicleUpdateBrand,
} from "../../../domain/services/vehicleService";

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

function VehicleBrandForm({ formRef, title, handleSubmit, loading }: Props) {
  return (
    <Form
      name={title}
      onFinish={(e) => {
        if (e.brandUuid) {
          handleSubmit(
            vehicleUpdateBrand,
            e,
            "Vehicle Brand updated successfully"
          );
        } else {
          handleSubmit(
            vehicleCreateBrand,
            e,
            "Vehicle Brand created successfully"
          );
        }
      }}
      layout="vertical"
      form={formRef}
    >
      <div className="flex flex-wrap [&>*]:px-2">
        <Form.Item name="brandUuid" hidden />

        <Form.Item
          className="w-1/2"
          name="name"
          label="Name"
          rules={[
            {
              message: "Need some input!",
              required: true,
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          className="w-1/2"
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
            placeholder="Status"
            defaultValue={0}
            options={vehicleGetAllBrandOptions()}
          ></Select>
        </Form.Item>

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

export default VehicleBrandForm;
