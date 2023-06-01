import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import FormUser from "../forms/FormUser";
import FormParking from "../forms/FormParking";
import FormUserDetails from "../forms/FormUserDetails";
import { useForm } from "antd/es/form/Form";
import React from "react";
import FormUserCreate from "../forms/FormUserCreate";

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
        <Button
          className="bg-primary text-white"
          onClick={() => {
            form.submit();
          }}
          loading={drawerForm.loading}
        >
          {drawerForm.mode === "create" ? "Add" : "Update"}
        </Button>
      }
    >
      {drawerForm.content === "parking" && <FormParking />}
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
