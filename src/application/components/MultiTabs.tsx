import { Tabs } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { globalStateUpdate } from "../redux/slices/globalState";
import { utilGenerateRandomNumber } from "../../domain/utils/commonUtils";

function MultiTabs() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [items, setItems] = React.useState([
    {
      key: "/",
      label: "Home",
    },
  ]);
  const [activeKey, setActiveKey] = React.useState("/");

  function handleRemove(targetKey: string) {
    if (items.length > 1) {
      // If there are more than one tab
      setItems(items.filter((item: any) => item.key !== targetKey));
      if (targetKey === activeKey) {
        // If the tab to be closed is the active tab
        const newItems = items.filter((item: any) => item.key !== targetKey);
        const targetKeyIndex = items.findIndex(
          (item: any) => item.key === targetKey
        );
        navigate(newItems[targetKeyIndex - 1].key);
      }
    } else if (items[0].key !== "/") {
      // If the last tab is not the home page
      setItems([
        {
          key: "/",
          label: "Home",
        },
      ]);
      navigate("/");
    }
  }

  React.useEffect(() => {
    // Remove tab using hotkey ctrl + w
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "w") {
        handleRemove(activeKey);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  React.useEffect(() => {
    const path = location.pathname;
    let pathName = path.split("/").join(" ");

    if (pathName === " ") {
      pathName = "Home";
    }

    if (items.find((item: any) => item.key === path)) {
      setActiveKey(path);
    } else {
      setItems([...items, { key: path, label: pathName }]);
      setActiveKey(path);
    }

    dispatch(
      globalStateUpdate({
        reset: utilGenerateRandomNumber(),
      })
    );
  }, [location.pathname]);

  return (
    <Tabs
      className="bg-bg3 -mb-4 text-t1"
      size="small"
      activeKey={activeKey}
      type="editable-card"
      onChange={(key: string) => {
        navigate(key);
      }}
      items={items}
      onEdit={(
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        _: string
      ) => {
        handleRemove(targetKey as string);
      }}
      hideAdd
    />
  );
}

export default MultiTabs;
