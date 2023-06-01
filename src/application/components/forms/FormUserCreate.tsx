import { Button, Form, FormInstance, Input, message } from "antd";
import SelectAsync from "../select/SelectAsync";
import {
  userCreate,
  userRoleOptionsGet,
} from "../../../domain/services/userService";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import { globalStateUpdate } from "../../redux/slices/globalState";

type Props = {
  title: string;
  formRef: FormInstance;
};

function FormUserCreate({ formRef, title }: Props) {
  const drawerForm = useSelector((state: any) => state.drawerForm);
  const dispatch = useDispatch();

  async function onFinish(e: any) {
    const response = await userCreate(e);

    if (response.errors) {
      return message.error("User creation failed");
    }

    message.success("User created successfully");
    formRef.resetFields();

    // Close the drawer
    dispatch(
      drawerFormUpdate({
        show: false,
      })
    );

    // This is a hack to force the table to refresh
    dispatch(
      globalStateUpdate({
        reset: Math.random() * 100000000000000000,
      })
    );
  }

  return (
    <Form name={title} onFinish={onFinish} layout="vertical" form={formRef}>
      <div className="flex flex-wrap [&>*]:px-2">
        <Form.Item name="userUuid" hidden />
        <Form.Item className="w-1/2" name="username" label="Username">
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          className="w-1/2"
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
          className="w-1/2"
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
          className="w-1/2"
          name="roles"
          label="Roles"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          {SelectAsync({
            placeholder: "Roles",
            getData: userRoleOptionsGet,
            mode: "multiple",
          })}
        </Form.Item>

        <Form.Item className="w-full">
          <Button
            loading={drawerForm.loading}
            htmlType="submit"
            className="bg-primary text-white block w-full"
          >
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default FormUserCreate;
