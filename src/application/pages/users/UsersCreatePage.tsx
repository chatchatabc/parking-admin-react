import { Button, Form, Input } from "antd";
import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";

function UsersCreatePage() {
  const [form] = useForm();
  const navigate = useNavigate();

  return (
    <div className="flex-1 px-4">
      {/* Breadcrumbs */}
      <section className="py-2">
        <Breadcrumbs />
      </section>

      <section className="flex justify-between my-2">
        <Button
          onClick={() => {
            navigate("/users");
          }}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            form.submit();
          }}
          className="bg-primary text-white"
        >
          Save
        </Button>
      </section>

      <Form
        form={form}
        className="flex gap-4"
        onFinish={(values) => {
          console.log(values);
        }}
        layout="vertical"
        autoComplete="off"
      >
        {/* Left side */}
        <section className="w-1/4">
          {/* 1st row */}
          <div className="border-2 border-primary bg-bg1 p-2 pb-8 rounded-lg">
            <header>
              <h1 className="text-lg font-bold">User Avatar</h1>
            </header>
            <div className="w-1/2 mx-auto">
              <div className="pb-[100%] border-2 border-primary rounded-full"></div>
            </div>
            <button className="mt-4 bg-primary block w-fit mx-auto text-white px-4 py-1 rounded-md transition hover:bg-secondary">
              Select Avatar
            </button>
          </div>
        </section>

        {/* Right Side */}
        <section className="flex-1">
          <div className="border-2 border-primary bg-bg1 p-2 pb-8 rounded-lg">
            <header>
              <h1 className="text-lg font-bold">User Information</h1>
            </header>

            <div className="flex flex-wrap p-2 [&>*]:w-1/4 [&>*]:px-2">
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
                label="Password"
                name="password"
                rules={[
                  {
                    message: "Need some input",
                    required: true,
                  },
                ]}
              >
                <Input.Password placeholder="password" />
              </Form.Item>

              <Form.Item label="Email">
                <Input placeholder="email" />
              </Form.Item>

              <Form.Item label="Status">
                <Input placeholder="status" />
              </Form.Item>

              <div style={{ width: "100%" }}>
                <Button htmlType="submit" className="hidden">
                  submit
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Form>
    </div>
  );
}

export default UsersCreatePage;
