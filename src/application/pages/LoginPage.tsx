import React from "react";
import { authCheckSession, authLogin } from "../../domain/services/authService";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { utilApiMessageGet } from "../../domain/utils/commonUtils";

function LoginPage() {
  const [loading, setLoading] = React.useState(false);
  const [form] = useForm();

  const navigate = useNavigate();

  async function handleLogin(values: any) {
    setLoading(true);

    const response = await authLogin(values);

    if (response.error) {
      message.error(utilApiMessageGet(response.message));
    } else {
      message.success(utilApiMessageGet(response.message));
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
    <div className="h-screen flex items-center bg-bg1">
      <div className="p-16 bg-bg0 rounded-lg w-fit mx-auto">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Davao Parking Dashboard</h1>
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
    </div>
  );
}

export default LoginPage;
