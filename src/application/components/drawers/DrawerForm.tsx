import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import FormUser from "../forms/FormUser";

function DrawerForm() {
  const dispatch = useDispatch();
  const drawerForm = useSelector((state: any) => state.drawerForm);

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
            dispatch(drawerFormUpdate({ show: false }));
          }}
        >
          {drawerForm.mode === "create" ? "Add" : "Update"}
        </Button>
      }
    >
      {drawerForm.content === "user" && <FormUser />}
    </Drawer>
  );
}

export default DrawerForm;
