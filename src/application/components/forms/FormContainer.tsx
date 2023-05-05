import { Form, FormInstance } from "antd";
import React from "react";
import { formRefHandler } from "../../layouts/HomeLayout";

interface Props {
  children: React.ReactNode;
  onFinish?: (values: any) => void;
}

function FormContainer({ children, onFinish }: Props) {
  return (
    <Form
      form={formRefHandler}
      onFinish={onFinish}
      name="basic"
      layout="vertical"
      autoComplete="off"
    >
      {children}
      {!onFinish && (
        <p className="text-xs text-red-500">No submit function set.</p>
      )}
    </Form>
  );
}

export default FormContainer;
