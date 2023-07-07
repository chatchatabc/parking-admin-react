import { ColorPicker, Form, FormInstance, Input, Select } from "antd";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import {
  routeCreateWithNodes,
  routeGetStatusOptions,
  routeUpdateWithNodes,
} from "../../../domain/services/routeService";
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

function RouteCreateForm({ title, formRef, handleSubmit, loading }: Props) {
  return (
    <Form
      name={title}
      onFinish={(e) => {
        if (typeof e.color === "object") {
          e.color = e.color.toHexString();
        }
        if (e.routeUuid) {
          handleSubmit(routeUpdateWithNodes, e, "Route updated successfully");
        } else {
          handleSubmit(routeCreateWithNodes, e, "Route created successfully");
        }
      }}
      layout="vertical"
      form={formRef}
    >
      <div className="flex flex-wrap [&>*]:px-2">
        <Form.Item name="routeUuid" hidden></Form.Item>
        <Form.Item name="routeId" hidden></Form.Item>
        <Form.Item
          className="w-5/6"
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
          className="w-1/6"
          name="color"
          label="Color"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
          initialValue={"#ffffff"}
        >
          <ColorPicker className="w-full" />
        </Form.Item>

        <Form.Item
          className="w-1/2"
          name="slug"
          label="Slug"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          <Input placeholder="Slug" />
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
          <Select options={routeGetStatusOptions()} placeholder="Status" />
        </Form.Item>

        <Form.Item
          className="w-full"
          name="description"
          label="Description"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          <Input.TextArea placeholder="Description" />
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

export default RouteCreateForm;
