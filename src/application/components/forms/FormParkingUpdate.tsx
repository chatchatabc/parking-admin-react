import { Checkbox, Form, FormInstance, Input, TimePicker, message } from "antd";
import type { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import { parkingLotUpdate } from "../../../domain/services/parkingService";
import { globalStateUpdate } from "../../redux/slices/globalState";
import MyButton from "../common/MyButton";

type Props = {
  title: string;
  formRef: FormInstance;
};

function FormParkingUpdate({ title, formRef }: Props) {
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

    const response = await parkingLotUpdate(e);

    if (response.errors && response.errors.length > 0) {
      return message.error("Parking lot update failed");
    }

    message.success("Parking lot updated successfully");
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
          className="w-full"
          name="parkingLotUuid"
          label="Parking Lot UUID"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          className="w-full"
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
          className="w-1/2"
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
          className="w-1/2"
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
          className="w-full"
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
          className="w-1/2"
          name="availableSlots"
          label="Available Slots"
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
          className="w-1/2"
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
          className="w-1/2"
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
          className="w-1/2"
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
          className="w-full"
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
          className="w-full"
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

export default FormParkingUpdate;
