import { Form, FormInstance, Input, Select } from "antd";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import {
  vehicleCreateModel,
  vehicleOptionsBrandUuid,
  vehicleOptionsModelStatus,
  vehicleOptionsTypeUuid,
  vehicleUpdateModel,
} from "../../../domain/services/vehicleService";
import MyButton from "../common/MyButton";
import SelectAsync from "../select/SelectAsync";

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

function VehicleModelForm({ formRef, title, handleSubmit, loading }: Props) {
  return (
    <Form
      name={title}
      onFinish={(e) => {
        if (e.modelUuid) {
          handleSubmit(
            vehicleUpdateModel,
            e,
            "Vehicle model updated successfully"
          );
        } else {
          handleSubmit(
            vehicleCreateModel,
            e,
            "Vehicle model created successfully"
          );
        }
      }}
      layout="vertical"
      form={formRef}
    >
      <div className="flex flex-wrap [&>*]:px-2">
        <Form.Item name="modelUuid" hidden></Form.Item>

        <Form.Item
          className="w-1/2"
          name="name"
          label="Name"
          rules={[
            {
              message: "Need some input",
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
              message: "Need some input",
              required: true,
            },
          ]}
        >
          <Select placeholder="Status" options={vehicleOptionsModelStatus()} />
        </Form.Item>

        <Form.Item
          className="w-1/2"
          name="brandUuid"
          label="Brand"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          {SelectAsync({
            placeholder: "Brands",
            getData: vehicleOptionsBrandUuid,
          })}
        </Form.Item>

        <Form.Item
          className="w-1/2"
          name="typeUuid"
          label="Type"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          {SelectAsync({
            placeholder: "Types",
            getData: vehicleOptionsTypeUuid,
          })}
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

export default VehicleModelForm;
