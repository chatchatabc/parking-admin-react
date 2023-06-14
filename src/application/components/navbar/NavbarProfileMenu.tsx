import { Modal, message } from "antd";
import React from "react";
import { authLogout } from "../../../domain/services/authService";
import { useNavigate } from "react-router-dom";

interface Props {
  setProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavbarProfileMenu({ setProfileMenu }: Props) {
  const { confirm } = Modal;
  const navigate = useNavigate();

  function handleLogout() {
    confirm({
      zIndex: 1010,
      title: "Are you sure?",
      content: "You will be logged out of the system.",
      onOk() {
        return new Promise(async (resolve) => {
          const response = await authLogout();
          if (response.errors) {
            message.error("Failed to save logout activity!");
          } else {
            message.success("Logout successful!");
          }
          resolve(true);
        }).finally(() => {
          navigate("/login");
        });
      },
      closable: true,
      okText: "Logout",
      okButtonProps: {
        danger: true,
      },
      maskClosable: true,
    });
  }

  return (
    <div className="flex min-w-[200px] flex-col bg-bg2 text-t2 -m-2 rounded-lg">
      <button
        onClick={() => {
          setProfileMenu(false);
          navigate("/profile");
        }}
        className="py-2 text-left block rounded-md transition px-2 hover:bg-bg3 hover:text-t1"
      >
        My Profile
      </button>

      <button
        onClick={handleLogout}
        className="py-2 text-left block rounded-md transition px-2 hover:bg-bg3 hover:text-t1"
      >
        Logout
      </button>
    </div>
  );
}

export default NavbarProfileMenu;
