import { formRefHandler } from "../../layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";

import UsersTable from "../../components/tables/UsersTable";

function UsersPage() {
  // React Router
  const dispatch = useDispatch();

  return (
    <div className="px-4 pb-4 w-full relative">
      {/* {error && <ErrorMessageComp />} */}
      <section className="bg-bg4 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Users</h2>
          <button
            onClick={() => {
              formRefHandler.resetFields();
              dispatch(
                drawerFormUpdate({
                  show: true,
                  title: "Create User",
                  content: "userCreate",
                  mode: "create",
                })
              );
            }}
            className="bg-primary ml-auto text-white px-4 py-1 rounded-md transition hover:bg-secondary"
          >
            Create User +
          </button>
        </header>

        <section>
          <UsersTable />
        </section>
      </section>
    </div>
  );
}

export default UsersPage;
