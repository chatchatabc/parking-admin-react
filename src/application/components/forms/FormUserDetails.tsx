import { Form, Input, message } from "antd";
import {
  userRoleOptionsGet,
  userUpdate,
} from "../../../domain/services/userService";
import { useDispatch, useSelector } from "react-redux";
import SelectAsync from "../select/SelectAsync";
import MyButton from "../common/MyButton";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import { globalStateUpdate } from "../../redux/slices/globalState";
import { utilGenerateRandomNumber } from "../../../domain/utils/commonUtils";

type Props = {
  title?: string;
  formRef: any;
};

function FormUserDetails({ formRef, title }: Props) {
  const dispatch = useDispatch();
  const drawerForm = useSelector((state: any) => state.drawerForm);

  async function onFinish(e: any) {
    const response = await userUpdate(e);

    if (response.errors) {
      return message.error("User update failed");
    }

    message.success("User updated successfully");
    formRef.resetFields();

    // Close the drawer
    dispatch(
      drawerFormUpdate({
        show: false,
      })
    );

    // This is a hack to force the table to refresh
    dispatch(
      globalStateUpdate({
        reset: utilGenerateRandomNumber(),
      })
    );
  }

  return (
    <Form name={title} onFinish={onFinish} layout="vertical" form={formRef}>
      <div className="flex flex-wrap [&>*]:px-2">
        <Form.Item name="userUuid" hidden />
        <Form.Item name="username" className="w-1/3" label="Username">
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          className="w-1/3"
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
          className="w-1/3"
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
          className="w-1/3"
          name="roles"
          label="Roles"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          {SelectAsync({
            placeholder: "Roles",
            getData: userRoleOptionsGet,
            mode: "multiple",
          })}
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

        <Form.Item className="w-full">
          <MyButton
            loading={drawerForm.loading}
            htmlType="submit"
            className="w-full block"
          >
            Submit
          </MyButton>
        </Form.Item>
      </div>
    </Form>
  );
}

export default FormUserDetails;
