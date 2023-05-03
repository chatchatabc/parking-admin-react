import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import FormUser from "../forms/FormUser";
import { useForm } from "antd/es/form/Form";

function DrawerForm() {
  const dispatch = useDispatch();
  const drawerForm = useSelector((state: any) => state.drawerForm);
  const [form] = useForm();

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
        >
          {drawerForm.mode === "create" ? "Add" : "Update"}
        </Button>
      }
    >
      {drawerForm.content === "user" && <FormUser form={form} />}
    </Drawer>
  );
}

export default DrawerForm;
