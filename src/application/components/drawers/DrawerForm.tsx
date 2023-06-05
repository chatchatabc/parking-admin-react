import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import FormUserDetails from "../forms/FormUserDetails";
import { useForm } from "antd/es/form/Form";
import React from "react";
import FormUserCreate from "../forms/FormUserCreate";
import FormParkingCreate from "../forms/FormParkingCreate";
import FormParkingUpdate from "../forms/FormParkingUpdate";
import MyButton from "../common/MyButton";

function DrawerForm() {
  const dispatch = useDispatch();
  const drawerForm = useSelector((state: any) => state.drawerForm);
  const [form] = useForm();

  React.useEffect(() => {
    if (drawerForm.data) {
      form.setFieldsValue(drawerForm.data);
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
        <FormUserCreate formRef={form} title={drawerForm.title} />
      )}
      {drawerForm.content === "userDetails" && (
        <FormUserDetails formRef={form} title={drawerForm.title} />
      )}
    </Drawer>
  );
}

export default DrawerForm;
