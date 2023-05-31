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
        return new Promise(async (resolve, reject) => {
          const response = await authLogout();
          if (response.errors) {
            reject(response);
          }
          resolve(true);
        })
          .then((response: any) => {
            message.success(response.message ?? "Logout successful!");
            navigate("/login");
          })
          .catch((response: any) => {
            message.error(response.message ?? "Logout failed");
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
