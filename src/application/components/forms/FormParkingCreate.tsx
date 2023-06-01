import { Button, Form, FormInstance, Input } from "antd";
import { userAllOptionsGet } from "../../../domain/services/userService";
import { useSelector } from "react-redux";
import SelectAsyncSearch from "../select/SelectAsyncSearch";

type Props = {
  title: string;
  formRef: FormInstance;
};

function FormParkingCreate({ title, formRef }: Props) {
  const drawerForm = useSelector((state: any) => state.drawerForm);

  async function onFinish(e: any) {
    console.log(e);
  }

  return (
    <Form name={title} onFinish={onFinish} layout="vertical" form={formRef}>
      <div className="flex flex-wrap [&>*]:px-2 [&>*]:w-1/3">
        <Form.Item name="userUuid" hidden />
        <Form.Item name="username" label="Username">
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
            {
              pattern: new RegExp(/^[0-9\b]+$/),
              message: "Invalid phone number",
            },
          ]}
        >
          <Input placeholder="09123456789" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "Invalid email",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="roles"
          label="Roles"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
          shouldUpdate
        >
          {SelectAsyncSearch({
            placeholder: "Roles",
            getData: userAllOptionsGet,
            mode: "multiple",
          })}
        </Form.Item>

        <Form.Item hidden className="w-full">
          <Button
            loading={drawerForm.loading}
            htmlType="submit"
            className="bg-primary text-white"
          >
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default FormParkingCreate;
