import { Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";

function DrawerForm() {
  const dispatch = useDispatch();
  const drawerForm = useSelector((state: any) => state.drawerForm);

  return (
    <Drawer
      title="Basic Drawer"
      placement="right"
      onClose={() => {
        dispatch(drawerFormUpdate({ show: false }));
      }}
      open={drawerForm.show}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}

export default DrawerForm;
