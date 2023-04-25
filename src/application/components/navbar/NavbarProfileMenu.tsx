import { Modal } from "antd";
import React from "react";
import { authLogout } from "../../../domain/service/authService";
import { Link, useNavigate } from "react-router-dom";

function NavbarProfileMenu() {
  const { confirm } = Modal;
  const navigate = useNavigate();

  function handleLogout() {
    confirm({
      zIndex: 1010,
      title: "Are you sure?",
      content: "You will be logged out of the system.",
      onOk() {
        authLogout();
        navigate("/login");
        close();
      },
      onCancel() {
        close();
      },
      okText: "Logout",
      okButtonProps: {
        danger: true,
      },
      maskClosable: true,
    });
  }

  return (
    <div className="flex text-left min-w-[200px] flex-col">
      <Link
        to="/profile"
        className="py-1 rounded-md transition hover:text-blue-500"
      >
        My Profile
      </Link>

      <button
        onClick={handleLogout}
        className="py-1 mt-4 text-left block rounded-md transition hover:text-blue-500"
      >
        Logout
      </button>
    </div>
  );
}

export default NavbarProfileMenu;
