import React from "react";
import { authCheckSession, authLogin } from "../../domain/service/authService";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";

function LoginPage() {
  const [loading, setLoading] = React.useState(false);
  const [form] = useForm();

  const navigate = useNavigate();

  async function handleLogin(values: any) {
    setLoading(true);

    const response = await authLogin(values);

    if (response.error) {
      message.error(response.message);
    } else {
      message.success(response.message ?? "Login successful!");
      navigate("/");
    }

    setLoading(false);
  }

  React.useEffect(() => {
    if (authCheckSession()) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center container mx-auto px-4 lg:px-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Davao Parking Dashboard</h1>
        <h2 className="text-2xl">Login Page</h2>
      </header>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleLogin}
        className="max-w-[300px] mt-8 w-full mx-auto"
      >
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

        <Form.Item>
          <Button
            loading={loading}
            htmlType="submit"
            className="px-4 py-1 bg-blue-500 rounded-md text-white mx-auto block w-fit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
