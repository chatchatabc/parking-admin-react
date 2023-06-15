import { Drawer, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import FormUserDetails from "../forms/FormUserDetails";
import { useForm } from "antd/es/form/Form";
import React from "react";
import FormParkingCreate from "../forms/FormParkingCreate";
import FormParkingUpdate from "../forms/FormParkingUpdate";
import MyButton from "../common/MyButton";
import UserBanForm from "../forms/UserBanForm";
import ParkingLotRateForm from "../forms/ParkingLotRateForm";
import VehicleForm from "../forms/VehicleForm";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import { globalStateUpdate } from "../../redux/slices/globalState";
import UserCreateForm from "./UserCreateForm";

function DrawerDynamicForm() {
  const dispatch = useDispatch();
  const drawerForm = useSelector((state: any) => state.drawerForm);
  const [form] = useForm();

  async function handleSubmit(
    sendData: (
      values: Record<string, any>
    ) => Promise<AxiosResponseData<any> | AxiosResponseError>,
    values: Record<string, any>
  ): Promise<AxiosResponseData<any> | AxiosResponseError> {
    const response = await sendData(values);

    if (response.errors) {
      response.errors.forEach((error) => {
        message.error(error.message);
      });

      return response;
    }

    form.resetFields();
    // Close the drawer
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

    return response;
  }

  React.useEffect(() => {
    if (drawerForm.data) {
      form.setFieldsValue(drawerForm.data);
    } else {
      form.resetFields();
    }
  }, [drawerForm.data]);

  return (
    <Drawer
      width={640}
      title={drawerForm.title}
      placement="right"
      onClose={() => {
        dispatch(drawerFormUpdate({ show: false }));
      }}
      open={drawerForm.show}
      extra={
        <MyButton
          onClick={() => {
            form.submit();
          }}
          loading={drawerForm.loading}
        >
          {drawerForm.mode === "create" ? "Add" : "Update"}
        </MyButton>
      }
    >
      {drawerForm.content === "parkingCreate" && (
        <FormParkingCreate formRef={form} title={drawerForm.title} />
      )}
      {drawerForm.content === "parkingUpdate" && (
        <FormParkingUpdate formRef={form} title={drawerForm.title} />
      )}
      {drawerForm.content === "userCreate" && (
        <UserCreateForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
        />
      )}
      {drawerForm.content === "userDetails" && (
        <FormUserDetails formRef={form} title={drawerForm.title} />
      )}
      {drawerForm.content === "userBan" && (
        <UserBanForm formRef={form} title={drawerForm.title} />
      )}
      {drawerForm.content === "parkingLotRate" && (
        <ParkingLotRateForm formRef={form} title={drawerForm.title} />
      )}
      {drawerForm.content === "vehicle" && (
        <VehicleForm formRef={form} title={drawerForm.title} />
      )}
    </Drawer>
  );
}

export default DrawerDynamicForm;
