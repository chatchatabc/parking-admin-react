import { Form, FormInstance, Input, Select } from "antd";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import {
  vehicleCreateType,
  vehicleGetAllTypeOptions,
} from "../../../domain/services/vehicleService";
import MyButton from "../common/MyButton";

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

function VehicleTypeCreateForm({
  formRef,
  title,
  handleSubmit,
  loading,
}: Props) {
  return (
    <Form
      name={title}
      onFinish={(e) => {
        handleSubmit(vehicleCreateType, e, "Vehicle Type created successfully");
      }}
      layout="vertical"
      form={formRef}
    >
      <div className="flex flex-wrap [&>*]:px-2">
        <Form.Item className="w-1/2" name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item className="w-1/2" name="status" label="Status">
          <Select
            placeholder="Status"
            defaultValue={0}
            options={vehicleGetAllTypeOptions()}
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

export default VehicleTypeCreateForm;
