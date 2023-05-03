import { Button, Form, FormInstance, Input, message } from "antd";
import FormContainer from "./FormContainer";
import React from "react";
import { useDispatch } from "react-redux";
import {
  userCreateProfile,
  userRoleList,
} from "../../../domain/service/userService";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import SelectGraphql from "../select/SelectGraphql";

interface Props {
  form: FormInstance<any>;
}

function FormUser({ form }: Props) {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  async function onFinish(values: any) {
    setLoading(true);

    const response = await userCreateProfile(values);
    if (response.error) {
      message.error(response.message ?? "Something went wrong");
    } else {
      message.success("User created successfully");
      dispatch(drawerFormUpdate({ show: false }));
    }

    setLoading(true);
  }

  return (
    <FormContainer form={form} onFinish={onFinish}>
      <div className="flex flex-wrap [&>*]:px-2 [&>*]:w-1/3">
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
        >
          <SelectGraphql
            placeholder="Roles"
            optionsGet={userRoleList}
            mode="multiple"
          />
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
            loading={loading}
            htmlType="submit"
            className="bg-primary text-white"
          >
            Submit
          </Button>
        </Form.Item>
      </div>
    </FormContainer>
  );
}

export default FormUser;
