import { Checkbox, Form, FormInstance, Input, Select, message } from "antd";
import type { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import {
  parkingLotUpdate,
  parkingLotUpdateRate,
} from "../../../domain/services/parkingService";
import { globalStateUpdate } from "../../redux/slices/globalState";
import MyButton from "../common/MyButton";
import React from "react";

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
      if (response.errors.length > 0) {
        return message.error("Parking lot rate update failed");
      }
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
