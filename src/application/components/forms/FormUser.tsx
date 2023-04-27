import { Button, Form, Input } from "antd";
import FormContainer from "./FormContainer";

function FormUser() {
  return (
    <FormContainer>
      <div className="flex flex-wrap gap-x-2">
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
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
        </Form.Item>

        <Form.Item
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
        </Form.Item>

        <Form.Item
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
        </Form.Item>

        <Form.Item
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
        </Form.Item>

        <Form.Item className="w-full">
          <Button htmlType="submit" className="bg-primary text-white">
            Submit
          </Button>
        </Form.Item>
      </div>
    </FormContainer>
  );
}

export default FormUser;
