import { Button, Form, Input } from "antd";
import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";

function UsersCreatePage() {
  return (
    <div className="flex-1 px-4">
      {/* Breadcrumbs */}
      <section className="py-2">
        <Breadcrumbs />
      </section>

      <div className="flex gap-4">
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
              Upload Avatar
            </button>
            <p className="text-xs text-center text-yellow-600">
              *This will automatically be saved*
            </p>
          </div>
        </section>

        {/* Right Side */}
        <section className="flex-1">
          <div className="border-2 border-primary bg-bg1 p-2 pb-8 rounded-lg">
            <header>
              <h1 className="text-lg font-bold">User Information</h1>
            </header>

            <Form
              onFinish={(values) => {
                console.log(values);
              }}
              layout="vertical"
              className="flex flex-wrap p-2 [&>*]:w-1/4 [&>*]:px-2"
              autoComplete="off"
            >
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
                <Button
                  htmlType="submit"
                  className="ml-auto w-fit block bg-primary text-white"
                >
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UsersCreatePage;
