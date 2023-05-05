import React from "react";
import FormContainer from "./FormContainer";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";

function FormParking() {
  const dispatch = useDispatch();
  const drawerForm = useSelector((state: any) => state.drawerForm);

  async function handleSubmit(values: Record<string, any>) {
    dispatch(drawerFormUpdate({ ...drawerForm, loading: true }));

    dispatch(drawerFormUpdate({ ...drawerForm, loading: false }));
  }

  return (
    <FormContainer onFinish={handleSubmit}>
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
    </FormContainer>
  );
}

export default FormParking;
