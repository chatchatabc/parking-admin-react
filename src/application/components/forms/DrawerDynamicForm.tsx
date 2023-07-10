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
import VehicleModelForm from "./VehicleModelForm";
import VehicleTypeForm from "./VehicleTypeForm";
import VehicleBrandForm from "./VehicleBrandForm";
import VehicleVerifyForm from "./VehicleVerifyForm";
import UserAvatarForm from "./UserAvatarForm";
import VehicleBrandLogoForm from "./VehicleBrandLogoForm";

function DrawerDynamicForm() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const drawerForm = useSelector((state: any) => state.drawerForm);
  const [form] = useForm();

  async function handleSubmit(
    sendData: (
      values: Record<string, any>
    ) => Promise<AxiosResponseData<any> | AxiosResponseError>,
    values: Record<string, any>,
    successMessage: string
  ): Promise<AxiosResponseData<any> | AxiosResponseError> {
    setLoading(true);

    const response = await sendData(values);

    if (response.errors) {
      response.errors.forEach((error) => {
        message.error(error.message);
      });
      setLoading(false);
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

    setLoading(false);
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
          loading={loading}
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
          loading={loading}
        />
      )}
      {drawerForm.content === "parkingUpdate" && (
        <ParkingLotUpdateForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
      {drawerForm.content === "userCreate" && (
        <UserCreateForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
      {drawerForm.content === "userAvatar" && (
        <UserAvatarForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={loading}
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
        <VehicleForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
      {drawerForm.content === "vehicleBrand" && (
        <VehicleBrandForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
      {drawerForm.content === "vehicleBrandLogo" && (
        <VehicleBrandLogoForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
      {drawerForm.content === "vehicleType" && (
        <VehicleTypeForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
      {drawerForm.content === "jeepneyCreate" && (
        <JeepneyCreateForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
      {drawerForm.content === "vehicleModel" && (
        <VehicleModelForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
      {drawerForm.content === "vehicleVerify" && (
        <VehicleVerifyForm
          formRef={form}
          title={drawerForm.title}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </Drawer>
  );
}

export default DrawerDynamicForm;
