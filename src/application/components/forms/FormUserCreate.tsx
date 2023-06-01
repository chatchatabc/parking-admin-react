import { Button, Form, FormInstance, Input, message } from "antd";
import SelectAsync from "../select/SelectAsync";
import {
  userCreate,
  userRoleOptionsGet,
} from "../../../domain/services/userService";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";

type Props = {
  title: string;
  formRef: FormInstance;
};

function FormUserCreate({ formRef, title }: Props) {
  const drawerForm = useSelector((state: any) => state.drawerForm);
  const dispatch = useDispatch();

  async function onFinish(e: any) {
    console.log(e);
    const response = await userCreate(e);

    if (response.errors) {
      return message.error("User creation failed");
    }

    message.success("User created successfully");

    formRef.resetFields();

    dispatch(
      drawerFormUpdate({
        show: false,
      })
    );
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
          {SelectAsync({
            placeholder: "Roles",
            getData: userRoleOptionsGet,
            mode: "multiple",
          })}
        </Form.Item>

        {/* <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            message: "Need some input",
            required: true,
          },
        ]}
      >
        <Input.Password placeholder="password" />
      </Form.Item> */}

        {/* <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            message: "Need some input",
            required: true,
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item> */}

        {/* <Form.Item
        name="first_name"
        label="First Name"
        rules={[
          {
            message: "Need some input",
            required: true,
          },
        ]}
      >
        <Input placeholder="First Name" />
      </Form.Item> */}

        {/* <Form.Item
        name="last_name"
        label="Last Name"
        rules={[
          {
            message: "Need some input",
            required: true,
          },
        ]}
      >
        <Input placeholder="Last Name" />
      </Form.Item> */}

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

export default FormUserCreate;
