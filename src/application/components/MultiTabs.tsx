import { Tabs } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  multiTabsStateAdd,
  multiTabsStateRemove,
  multiTabsStateSetActiveKey,
} from "../redux/slices/multiTabsState";
import { useLocation, useNavigate } from "react-router-dom";

function MultiTabs() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const multiTabsState = useSelector((state: any) => state.multiTabsState);
  const items = multiTabsState.items;

  React.useEffect(() => {
    console.log("location.pathname", location.pathname.split("/"));

    const path = location.pathname;
    let pathName = path.split("/").join(" ");

    if (pathName === " ") {
      pathName = "Home";
    }

    if (items.find((item: any) => item.key === path)) {
      dispatch(multiTabsStateSetActiveKey({ key: path }));
    } else {
      dispatch(
        multiTabsStateAdd({
          key: path,
          label: pathName,
        })
      );
    }
  }, [location.pathname]);

  return (
    <Tabs
      size="small"
      activeKey={multiTabsState.activeKey}
      type="editable-card"
      onChange={(key: string) => {
        navigate(key);
      }}
      items={items}
      onEdit={(
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        _: string
      ) => {
        if (items.length > 1) {
          dispatch(multiTabsStateRemove({ key: targetKey }));
          const newItems = items.filter((item: any) => item.key !== targetKey);
          navigate(newItems[newItems.length - 1].key);
        } else if (items[0].key !== "/") {
          dispatch(multiTabsStateRemove({ key: targetKey }));
          navigate("/");
        }
      }}
      hideAdd
    />
  );
}

export default MultiTabs;
