import { Modal, message } from "antd";
import React from "react";
import { authLogout } from "../../../domain/service/authService";
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
        return new Promise(async (resolve, reject) => {
          const response = await authLogout();
          if (response.error) {
            reject();
          }
          resolve(true);
        })
          .then(() => {
            message.success("Logout successful!");
            navigate("/login");
          })
          .catch(() => {
            message.error("Logout failed");
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
    <div className="flex min-w-[200px] flex-col">
      <button
        onClick={() => {
          setProfileMenu(false);
          navigate("/profile");
        }}
        className="py-2 text-left block rounded-md transition hover:text-blue-500"
      >
        My Profile
      </button>

      <button
        onClick={handleLogout}
        className="py-2 text-left block rounded-md transition hover:text-blue-500"
      >
        Logout
      </button>
    </div>
  );
}

export default NavbarProfileMenu;
