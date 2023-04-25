import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authCheckSession, authLogout } from "../../domain/service/authService";
import Sidebar from "../components/Sidebar";
import { Modal } from "antd";

function HomeLayout() {
  const navigate = useNavigate();
  const { confirm } = Modal;

  function handleLogout() {
    confirm({
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

  React.useEffect(() => {
    if (!authCheckSession()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <header className="bg-blue-300 border-b-2 p-2 flex items-center border-blue-900">
        {/* Left */}
        <div className="flex items-center space-x-2">
          <div className="w-32">
            <div className="relative pb-[40%] bg-white">
              <p className="absolute">Logo Here</p>
            </div>
          </div>
          <h1 className="text-xl font-medium">Davao Parking Dashboard</h1>
        </div>

        {/* Right */}
        <div className="ml-auto flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full border border-blue-900 bg-white"></div>
          <p>Admin</p>
        </div>
        <button
          onClick={handleLogout}
          className="ml-4 py-1 px-4 bg-red-500 text-white rounded-md transition hover:opacity-90"
        >
          Logout
        </button>
      </header>
      <div className="flex flex-1">
        <div className="w-[300px] bg-blue-300 border-r-2 py-1 border-blue-900">
          <Sidebar />
        </div>
        <div className="flex-1 p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;
