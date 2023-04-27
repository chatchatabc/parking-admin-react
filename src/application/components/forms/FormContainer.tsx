import { Form } from "antd";
import React from "react";

interface Props {
  children: React.ReactNode;
  onFinish?: (values: any) => void;
}

function FormContainer({ children, onFinish }: Props) {
  return (
    <Form onFinish={onFinish} name="basic" layout="vertical" autoComplete="off">
      {children}
      {!onFinish && (
        <p className="text-xs text-red-500">No submit function set.</p>
      )}
    </Form>
  );
}

export default FormContainer;
