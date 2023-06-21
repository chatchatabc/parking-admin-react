import { Form, FormInstance, Input, Select } from "antd";
import MyButton from "../common/MyButton";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import { jeepneyCreate } from "../../../domain/services/jeepneyService";
import SelectAsync from "../select/SelectAsync";
import { routeGetAllOptions } from "../../../domain/services/routeService";

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

function JeepneyCreateForm({ formRef, title, handleSubmit, loading }: Props) {
  return (
    <Form
      name={title}
      onFinish={(e) => {
        handleSubmit(jeepneyCreate, e, "User created successfully");
      }}
      layout="vertical"
      form={formRef}
    >
      <div className="flex flex-wrap [&>*]:px-2">
        {/* Route */}
        <Form.Item
          rules={[{ required: true, message: "Need some input" }]}
          className="w-full"
          name="routeUuid"
          label="Route"
        >
          {SelectAsync({
            placeholder: "Route Name",
            getData: routeGetAllOptions,
          })}
        </Form.Item>

        {/* Jeepney Uuid */}
        <Form.Item
          rules={[{ required: true, message: "Need some input" }]}
          className="w-1/2"
          name="jeepneyUuid"
          label="Jeepney Uuid"
        >
          <Input placeholder="Jeepney Uuid" />
        </Form.Item>

        {/* Name */}
        <Form.Item
          rules={[{ required: true, message: "Need some input" }]}
          className="w-1/2"
          name="name"
          label="Name"
        >
          <Input placeholder="Name" />
        </Form.Item>

        {/* Plate Number */}
        <Form.Item
          className="w-1/2"
          name="plateNumber"
          label="Plate Number"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
            () => ({
              validator(_, value) {
                if (
                  value.match(
                    /^[A-Z]{2}-\d{5}$|^[A-Z]{3}-\d{4}$|^\d{4}-\d{7}$|^[A-Z]{2}-\d{5}$/
                  )
                ) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("Invalid Plate Number Format"));
              },
            }),
          ]}
        >
          <Input placeholder="NBC-1234" />
        </Form.Item>

        {/* Drivers */}
        <Form.Item
          rules={[{ required: true, message: "Need some input" }]}
          className="w-1/2"
          name="drivers"
          label="Drivers"
        >
          <Input placeholder="Juan Dela Cruz, Juan Dela Cruz" />
        </Form.Item>

        {/* Capacity */}
        <Form.Item
          className="w-1/2"
          name="capacity"
          label="Capacity"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
            {
              pattern: new RegExp(/^[0-9\b]+$/),
              message: "Invalid capacity",
            },
          ]}
        >
          <Input placeholder="Capacity" />
        </Form.Item>

        {/* Status */}
        <Form.Item
          initialValue={1}
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
          <Select
            defaultValue={1}
            options={[
              {
                value: 1,
                label: "Active",
              },
              {
                value: -1,
                label: "Inactive",
              },
              {
                value: 0,
                label: "Draft",
              },
            ]}
          />
        </Form.Item>

        {/* Longitude */}
        <Form.Item
          className="w-1/2"
          name="longitude"
          label="Longitude"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
            {
              pattern: new RegExp(/^[0-9\b]+$/),
              message: "Invalid longitude",
            },
          ]}
        >
          <Input placeholder="Longitude" />
        </Form.Item>

        {/* Latitude */}
        <Form.Item
          className="w-1/2"
          name="latitude"
          label="Latitude"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
            {
              pattern: new RegExp(/^[0-9\b]+$/),
              message: "Invalid latitude",
            },
          ]}
        >
          <Input placeholder="Latitude" />
        </Form.Item>

        {/* Submit Button */}
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

export default JeepneyCreateForm;
