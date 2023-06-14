import { Checkbox, Form, FormInstance, Input, TimePicker, message } from "antd";
import type { Dayjs } from "dayjs";
import { userAllOptionsGet } from "../../../domain/services/userService";
import { useDispatch, useSelector } from "react-redux";
import SelectAsyncSearch from "../select/SelectAsyncSearch";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import { parkingLotCreate } from "../../../domain/services/parkingLotService";
import { globalStateUpdate } from "../../redux/slices/globalState";
import MyButton from "../common/MyButton";

type Props = {
  title: string;
  formRef: FormInstance;
};

function FormParkingCreate({ title, formRef }: Props) {
  const dispatch = useDispatch();
  const drawerForm = useSelector((state: any) => state.drawerForm);

  async function onFinish(e: any) {
    const openDaysFlag = e.openDaysFlag as number[];
    const businessHoursEnd = e.businessHoursEnd as Dayjs;
    const businessHoursStart = e.businessHoursStart as Dayjs;

    e.businessHoursEnd = businessHoursEnd.toISOString();
    e.businessHoursStart = businessHoursStart.toISOString();
    e.capacity = Number(e.capacity);
    e.latitude = Number(e.latitude);
    e.longitude = Number(e.longitude);
    e.openDaysFlag = openDaysFlag.reduce((acc, curr) => {
      return acc | curr;
    }, 0);

    const response = await parkingLotCreate(e);

    if (response.errors) {
      return message.error("Parking lot creation failed");
    }

    message.success("Parking lot created successfully");
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
      <div className="flex flex-wrap [&>*]:px-2 [&>*]:w-1/3">
        <Form.Item
          name="userUuid"
          label="Username"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          {SelectAsyncSearch({
            placeholder: "Username",
            getData: userAllOptionsGet,
          })}
        </Form.Item>
        <Form.Item
          style={{ width: "66%" }}
          name="name"
          label="Parking Lot Name"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          <Input placeholder="Parking Lot Name" />
        </Form.Item>

        <Form.Item
          style={{ width: "50%" }}
          name="latitude"
          label="Latitude"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
            {
              pattern: new RegExp(/^[0-9]+(\.[0-9]+)?$/),
              message: "Invalid Latitude",
            },
          ]}
        >
          <Input placeholder="Latitude" />
        </Form.Item>

        <Form.Item
          style={{ width: "50%" }}
          name="longitude"
          label="Longitude"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
            {
              pattern: new RegExp(/^[0-9]+(\.[0-9]+)?$/),
              message: "Invalid Longitude",
            },
          ]}
        >
          <Input placeholder="Longitude" />
        </Form.Item>

        <Form.Item
          style={{ width: "100%" }}
          name="address"
          label="Address"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          <Input placeholder="Address" />
        </Form.Item>

        <Form.Item
          name="capacity"
          label="Total Capacity"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
            {
              pattern: new RegExp(/^[0-9]+$/),
              message: "Invalid Capacity",
            },
          ]}
        >
          <Input placeholder="Total Capacity" />
        </Form.Item>

        <Form.Item
          name="businessHoursStart"
          label="Starting Business Hours"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          {/* Format HH:mm AM/PM */}
          <TimePicker className="w-full" format={"HH:mm a"} />
        </Form.Item>

        <Form.Item
          name="businessHoursEnd"
          label="Ending Business Hours"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          {/* Format HH:mm AM/PM */}
          <TimePicker className="w-full" format={"HH:mm a"} />
        </Form.Item>

        <Form.Item
          style={{ width: "100%" }}
          name="openDaysFlag"
          label="Open Days"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          <Checkbox.Group className="w-full flex">
            <Checkbox value={1}>Sunday</Checkbox>
            <Checkbox value={2}>Monday</Checkbox>
            <Checkbox value={4}>Tuesday</Checkbox>
            <Checkbox value={8}>Wednesday</Checkbox>
            <Checkbox value={16}>Thursday</Checkbox>
            <Checkbox value={32}>Friday</Checkbox>
            <Checkbox value={64}>Saturday</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          style={{ width: "100%" }}
          name="description"
          label="Description"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          <Input.TextArea className="w-full" />
        </Form.Item>

        <Form.Item style={{ width: "100%" }}>
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

export default FormParkingCreate;
