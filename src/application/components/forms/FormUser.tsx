import { Button, Form, Input, message } from "antd";
import FormContainer from "./FormContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  userCreateProfile,
  userRoleList,
} from "../../../domain/service/userService";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import SelectGraphql from "../select/SelectGraphql";
import { globalStateUpdate } from "../../redux/slices/globalState";

function FormUser() {
  const drawerForm = useSelector((state: any) => state.drawerForm);
  const dispatch = useDispatch();

  async function onFinish(values: any) {
    dispatch(drawerFormUpdate({ ...drawerForm, loading: true }));

    const response = await userCreateProfile(values);

    if (response.error) {
      message.error(response.message ?? "Something went wrong");
    } else {
      message.success("User created successfully");
      dispatch(drawerFormUpdate({ show: false }));
      dispatch(globalStateUpdate({ reset: true }));
    }

    dispatch(
      drawerFormUpdate({
        ...drawerForm,
        show: response.error ? true : false,
        loading: false,
      })
    );
  }

  return (
    <FormContainer onFinish={onFinish}>
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

        <Form.Item
          name="roles"
          label="Roles"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          <SelectGraphql
            placeholder="Roles"
            optionsGet={userRoleList}
            mode="multiple"
          />
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

export default FormUser;
