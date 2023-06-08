import { Form, FormInstance, Input, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import { globalStateUpdate } from "../../redux/slices/globalState";
import MyButton from "../common/MyButton";
import { userAllOptionsGet } from "../../../domain/services/userService";
import SelectAsyncSearch from "../select/SelectAsyncSearch";
import { vehicleCreate } from "../../../domain/services/vehicleService";

type Props = {
  title: string;
  formRef: FormInstance;
};

function VehicleForm({ title, formRef }: Props) {
  const dispatch = useDispatch();
  const drawerForm = useSelector((state: any) => state.drawerForm);

  async function onFinish(e: any) {
    const response = await vehicleCreate(e);

    if (response.errors && response.errors.length > 0) {
      return message.error("Vehicle creation failed");
    }

    message.success("Vehicle created successfully");
    formRef.resetFields();

    dispatch(
      drawerFormUpdate({
        show: false,
      })
    );

    // This is a hack to force the table to refresh
    dispatch(
      globalStateUpdate({
        reset: Math.random() * 100000000000000000,
      })
    );
  }

  return (
    <Form name={title} onFinish={onFinish} layout="vertical" form={formRef}>
      <div className="flex flex-wrap [&>*]:px-2">
        <Form.Item
          className="w-1/2"
          name="userUuid"
          label="Username"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
          hidden={formRef.getFieldValue("userUuid") !== undefined}
        >
          {SelectAsyncSearch({
            placeholder: "Username",
            getData: userAllOptionsGet,
          })}
        </Form.Item>

        <Form.Item
          name="plateNumber"
          className="w-1/2"
          label="Plate Number"
          rules={[{ message: "Need some input", required: true }]}
        >
          <Input placeholder="Plate Number" />
        </Form.Item>

        <Form.Item
          name="name"
          className="w-1/2"
          label="Vehicle Name"
          rules={[{ message: "Need some input", required: true }]}
        >
          <Input placeholder="Vehicle Name" />
        </Form.Item>

        <Form.Item
          name="type"
          className="w-1/2"
          label="Vehicle Type"
          rules={[{ message: "Need some input", required: true }]}
          initialValue={1}
        >
          <Select
            options={[
              {
                label: "Car",
                value: 1,
              },
              {
                label: "Motorcycle",
                value: 0,
              },
            ]}
          />
        </Form.Item>

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

export default VehicleForm;
