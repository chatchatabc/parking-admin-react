import { DatePicker, Form, FormInstance, Input, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import { parkingLotCreate } from "../../../domain/services/parkingService";
import { globalStateUpdate } from "../../redux/slices/globalState";
import MyButton from "../common/MyButton";
import React from "react";

type Props = {
  title: string;
  formRef: FormInstance;
};

function UserBanForm({ title, formRef }: Props) {
  const [method, setMethod] = React.useState("BAN");
  const dispatch = useDispatch();
  const drawerForm = useSelector((state: any) => state.drawerForm);

  async function onFinish(e: any) {
    // const openDaysFlag = e.openDaysFlag as number[];
    // const businessHoursEnd = e.businessHoursEnd as Dayjs;
    // const businessHoursStart = e.businessHoursStart as Dayjs;

    // e.businessHoursEnd = businessHoursEnd.toISOString();
    // e.businessHoursStart = businessHoursStart.toISOString();
    // e.capacity = Number(e.capacity);
    // e.latitude = Number(e.latitude);
    // e.longitude = Number(e.longitude);
    // e.openDaysFlag = openDaysFlag.reduce((acc, curr) => {
    //   return acc | curr;
    // }, 0);

    return console.log(e);

    const response = await parkingLotCreate(e);

    // if (response.errors && response.errors.length > 0) {
    //   return message.error("Parking lot creation failed");
    // }

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
      <div className="flex flex-wrap [&>*]:px-2">
        <Form.Item name="userUuid" hidden />
        <Form.Item
          name="method"
          className="w-1/2"
          label="Method"
          rules={[{ message: "Need some input", required: true }]}
          initialValue={method}
        >
          <Select
            onChange={(value) => {
              setMethod(value);
            }}
            options={[{ value: "UNBAN" }, { value: "BAN" }]}
          />
        </Form.Item>

        {method === "BAN" && (
          <>
            <Form.Item
              className="w-1/2"
              name="until"
              label="Ban Until"
              rules={[
                {
                  message: "Need some input",
                  required: true,
                },
              ]}
            >
              <DatePicker showTime className="w-full" />
            </Form.Item>
            <Form.Item
              className="w-full"
              name="reason"
              label="Reason"
              rules={[
                {
                  message: "Need some input",
                  required: true,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </>
        )}

        {method === "UNBAN" && (
          <Form.Item
            className="w-full"
            name="unbanReason"
            label="Unban Reason"
            rules={[
              {
                message: "Need some input",
                required: true,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        )}

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

export default UserBanForm;
