import { Button, Form, Input } from "antd";
import { userRolesGet } from "../../../domain/services/userService";
import { useSelector } from "react-redux";
import SelectAsync from "../select/SelectAsync";

function FormUserDetails() {
  const drawerForm = useSelector((state: any) => state.drawerForm);

  return (
    <Form>
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
        >
          <SelectAsync
            placeholder="Roles"
            getData={userRolesGet}
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

export default FormUserDetails;
