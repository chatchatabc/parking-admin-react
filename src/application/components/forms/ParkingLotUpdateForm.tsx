import { Checkbox, Form, FormInstance, Input, TimePicker } from "antd";
import { parkingLotUpdate } from "../../../domain/services/parkingLotService";
import MyButton from "../common/MyButton";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import dayjs from "dayjs";

type Props = {
  title: string;
  formRef: FormInstance;
  handleSubmit: (
    sendData: (
      values: Record<string, any>
    ) => Promise<AxiosResponseData | AxiosResponseError>,
    values: Record<string, any>,
    successMessage: string
  ) => Promise<AxiosResponseData | AxiosResponseError>;
  loading: boolean;
};

function ParkingLotUpdateForm({
  title,
  formRef,
  handleSubmit,
  loading,
}: Props) {
  return (
    <Form
      name={title}
      onFinish={(e) => {
        handleSubmit(parkingLotUpdate, e, "Parking lot updated successfully");
      }}
      layout="vertical"
      form={formRef}
    >
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
          getValueProps={(value) => {
            return { value: dayjs(value) };
          }}
        >
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
          getValueProps={(value) => {
            return { value: dayjs(value) };
          }}
        >
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
            loading={loading}
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

export default ParkingLotUpdateForm;
