import { Checkbox, Form, FormInstance, Input, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import { parkingLotUpdateRate } from "../../../domain/services/parkingLotService";
import { globalStateUpdate } from "../../redux/slices/globalState";
import MyButton from "../common/MyButton";

type Props = {
  title: string;
  formRef: FormInstance;
};

function ParkingLotRateForm({ title, formRef }: Props) {
  const dispatch = useDispatch();
  const drawerForm = useSelector((state: any) => state.drawerForm);

  async function onFinish(e: any) {
    const response = await parkingLotUpdateRate(e);

    if (response.errors) {
      return message.error("Parking lot rate update failed");
    }

    message.success("Parking lot rate updated successfully");
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
          name="parkingLotUuid"
          label="Parking Lot UUID"
          tooltip="This is the parking lot UUID"
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
          className="w-1/2"
          name="type"
          label="Type"
          tooltip="This is the parking lot type"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
          initialValue={0}
        >
          <Select
            disabled
            options={[
              { label: "FIXED", value: 0 },
              {
                label: "FLEXIBLE",
                value: 1,
              },
            ]}
            placeholder="Type"
          />
        </Form.Item>

        <Form.Item
          className="w-1/3"
          name="interval"
          label="Interval"
          tooltip="This is the parking lot interval. It can be hourly or daily."
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
          initialValue={0}
        >
          <Select
            options={[
              { label: "HOURLY", value: 0 },
              {
                label: "DAILY",
                value: 1,
              },
            ]}
            placeholder="Interval"
          />
        </Form.Item>

        <Form.Item
          className="w-1/3"
          name="startingRate"
          label="Starting Rate"
          tooltip="This is the parking lot starting rate. Example: 2.50"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
            {
              message: "Invalid currency value",
              pattern: new RegExp(/^\d+(\.\d{1,2})?$/),
            },
          ]}
        >
          <Input placeholder="Starting Rate" />
        </Form.Item>

        <Form.Item
          className="w-1/3"
          name="rate"
          label="Rate"
          tooltip="This is the parking lot rate. Example: 2.50"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
            {
              message: "Invalid currency value",
              pattern: new RegExp(/^\d+(\.\d{1,2})?$/),
            },
          ]}
        >
          <Input placeholder="Rate" />
        </Form.Item>

        <Form.Item
          className="w-1/2"
          name="freeHours"
          label="Free Hours"
          tooltip="This is the parking lot free hours. Example: 2"
          rules={[
            {
              message: "Need some input",
              required: true,
            },
            {
              message: "Positive integers only",
              pattern: new RegExp(/^[0-9]+$/),
            },
          ]}
        >
          <Input placeholder="Free Hours" />
        </Form.Item>

        <Form.Item
          className="w-1/2"
          name="payForFreeHoursWhenExceeding"
          label="Pay Free Hours When Exceeding"
          tooltip="This is the parking lot pay for free hours when exceeding. Example: 2"
          initialValue={true}
          rules={[
            {
              message: "Need some input",
              required: true,
            },
          ]}
          valuePropName="checked"
        >
          <Checkbox />
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

export default ParkingLotRateForm;
