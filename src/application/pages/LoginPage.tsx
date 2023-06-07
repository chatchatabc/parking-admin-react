import React from "react";
import { authCheckSession, authLogin } from "../../domain/services/authService";
import { useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import MyButton from "../components/common/MyButton";

function LoginPage() {
  const [loading, setLoading] = React.useState(false);
  const [form] = useForm();

  const navigate = useNavigate();

  async function handleLogin(values: any) {
    setLoading(true);

    const response = await authLogin(values);

    if (response.errors) {
      message.error("Failed to login.");
    } else {
      message.success("Login successful.");
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
      <div className="p-16 bg-bg2 rounded-lg w-fit mx-auto">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-t1">
            Davao Parking Dashboard
          </h1>
        </header>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleLogin}
          className="max-w-[300px] mt-8 w-full mx-auto"
        >
          <Form.Item
            className="myFormItem"
            name="username"
            label="Username"
            rules={[
              {
                message: "Need some input",
                required: true,
              },
            ]}
          >
            <Input data-testid="username" placeholder="Username" />
          </Form.Item>

          <Form.Item
            className="myFormItem"
            name="password"
            label="Password"
            rules={[
              {
                message: "Need some input",
                required: true,
              },
            ]}
          >
            <Input.Password data-testid="password" placeholder="password" />
          </Form.Item>

          <Form.Item>
            <MyButton className="w-full" loading={loading} htmlType="submit">
              Login
            </MyButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
