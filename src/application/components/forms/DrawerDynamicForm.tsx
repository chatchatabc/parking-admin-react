import { Drawer, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import FormUserDetails from "../forms/FormUserDetails";
import { useForm } from "antd/es/form/Form";
import React from "react";
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
import ParkingLotCreateForm from "./ParkingLotCreateForm";
import ParkingLotUpdateForm from "./ParkingLotUpdateForm";
import JeepneyCreateForm from "./JeepneyCreateForm";
import VehicleBrandCreateForm from "./VehicleBrandCreateForm";
import VehicleBrandUpdateForm from "./VehicleBrandUpdateForm";

function DrawerDynamicForm() {
  const dispatch = useDispatch();
  const drawerForm = useSelector((state: any) => state.drawerForm);
  const [form] = useForm();

  async function handleSubmit(
    sendData: (
      values: Record<string, any>
    ) => Promise<AxiosResponseData<any> | AxiosResponseError>,
    values: Record<string, any>,
    successMessage: string
  ): Promise<AxiosResponseData<any> | AxiosResponseError> {
    const response = await sendData(values);

    if (response.errors) {
      response.errors.forEach((error) => {
        message.error(error.message);
      });
      return response;
    }

    message.success(successMessage);
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
      {drawerForm.content === "parkingLotCreate" && (
        <ParkingLotCreateForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={drawerForm.loading}
        />
      )}
      {drawerForm.content === "parkingUpdate" && (
        <ParkingLotUpdateForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={drawerForm.loading}
        />
      )}
      {drawerForm.content === "userCreate" && (
        <UserCreateForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={drawerForm.loading}
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
      {drawerForm.content === "vehicleBrandCreate" && (
        <VehicleBrandCreateForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={drawerForm.loading}
        />
      )}
      {drawerForm.content === "vehicleBrandUpdate" && (
        <VehicleBrandUpdateForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={drawerForm.loading}
        />
      )}
      {drawerForm.content === "jeepneyCreate" && (
        <JeepneyCreateForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={drawerForm.loading}
        />
      )}
    </Drawer>
  );
}

export default DrawerDynamicForm;
