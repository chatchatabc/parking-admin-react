import React from "react";
import { Outlet } from "react-router-dom";
import { authCheckSession } from "../../domain/services/authService";
import Sidebar from "../components/sidebar/Sidebar";
import MultiTabs from "../components/MultiTabs";
import NoAccessPage from "../pages/NoAccessPage";
import DrawerDynamicForm from "../components/forms/DrawerDynamicForm";
import Navbar from "../components/navbar/Navbar";
import { NatsConnection, connect } from "nats.ws";

export let webSocketHandler: NatsConnection | null = null;

function HomeLayout() {
  const [openSidebar, setOpenSidebar] = React.useState(
    JSON.parse(localStorage.getItem("sidebarState") ?? "true")
  );

  function handleSidebar() {
    setOpenSidebar(!openSidebar);
    localStorage.setItem("sidebarState", JSON.stringify(!openSidebar));
  }

  if (!authCheckSession()) {
    return <NoAccessPage />;
  }

  // Addeventlistener for sidebar resize
  React.useEffect(() => {
    const multitabs = document.querySelector<HTMLElement>("[data-multitabs]");
    const sidebar = document.querySelector<HTMLElement>("[data-sidebar]");

    // Resize multitabs during sidebar resize
    sidebar?.addEventListener("transitionend", () => {
      const sidebarWidth = sidebar?.offsetWidth ?? 0;
      const documentWidth = document.body.offsetWidth;
      const multitabsWidth = documentWidth - sidebarWidth;
      multitabs?.style.setProperty("max-width", `${multitabsWidth}px`);
    });
  }, []);

  // WebSocket
  React.useEffect(() => {
    const webSocketUrl = import.meta.env.VITE_WEB_SOCKET_URL as string;
    (async () => {
      try {
        webSocketHandler = await connect({ servers: [webSocketUrl] });
        console.log(`WebSocket connected to ${webSocketUrl}`);
      } catch (e) {
        console.log(e);
        console.log(`WebSocket failed to connect to ${webSocketUrl}`);
      }
    })();

    return () => {
      if (webSocketHandler) {
        webSocketHandler.drain();
      }
      webSocketHandler = null;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-bg1 text-t1">
      {/* Navbar */}
      <header className="bg-bg2 z-[10] sticky top-0 border-b py-2 px-3 flex items-center border-t2">
        <Navbar open={openSidebar} handleSidebar={handleSidebar} />
      </header>

      {/* Bottom */}
      <div className="flex w-screen">
        {/* Sidebar */}
        <aside
          data-sidebar
          className={`sticky top-[66px] h-[calc(100vh-66px)] bg-bg2 border-r border-t2 ${
            openSidebar ? "min-w-[250px]" : "min-w-[1px]"
          } transition-all ease-linear text-t2 group hover:min-w-[250px]`}
        >
          <Sidebar open={openSidebar} />
        </aside>

        {/* Main */}
        <main className="flex flex-col flex-1">
          {/* Multitabs */}
          <section data-multitabs className="uppercase">
            <MultiTabs />
          </section>

          {/* Outlet */}
          <section className="bg-bg1 flex flex-1 flex-col">
            <Outlet />
          </section>
        </main>
      </div>

      {/* Global components */}
      <DrawerDynamicForm />
    </div>
  );
}

export default HomeLayout;
