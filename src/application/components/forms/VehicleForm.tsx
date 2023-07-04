import { Form, FormInstance, Input } from "antd";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import {
  vehicleCreate,
  vehicleOptionsModelUuid,
  vehicleUpdate,
} from "../../../domain/services/vehicleService";
import MyButton from "../common/MyButton";
import SelectAsync from "../select/SelectAsync";
import { userOptionsUuid } from "../../../domain/services/userService";

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

function VehicleForm({ formRef, title, handleSubmit, loading }: Props) {
  return (
    <Form
      name={title}
      onFinish={(e) => {
        if (e.vehicleUuid) {
          handleSubmit(vehicleUpdate, e, "Vehicle updated successfully");
        } else {
          handleSubmit(vehicleCreate, e, "Vehicle created successfully");
        }
      }}
      layout="vertical"
      form={formRef}
    >
      <div className="flex flex-wrap [&>*]:px-2">
        <Form.Item name="vehicleUuid" hidden></Form.Item>

        <Form.Item
          className="w-full"
          name="userUuid"
          label="User"
          rules={[
            {
              message: "Need some input",
              required: !formRef.getFieldValue("updating"),
            },
          ]}
          hidden={formRef.getFieldValue("updating")}
        >
          {SelectAsync({
            placeholder: "User",
            getData: userOptionsUuid,
          })}
        </Form.Item>

        <Form.Item
          className="w-full"
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
          name="plateNumber"
          label="Plate Number"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          <Input placeholder="Plate Number" />
        </Form.Item>

        <Form.Item
          className="w-1/2"
          name="modelUuid"
          label="Model"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          {SelectAsync({
            placeholder: "Model",
            getData: vehicleOptionsModelUuid,
          })}
        </Form.Item>

        <Form.Item
          className="w-1/2"
          name="year"
          label="Year"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
            {
              message: "Invalid year",
              pattern: new RegExp(/^[0-9]{4}$/),
            },
          ]}
        >
          <Input placeholder="Year" />
        </Form.Item>

        <Form.Item
          className="w-1/2"
          name="color"
          label="Color"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          <Input placeholder="Color" />
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

export default VehicleForm;
