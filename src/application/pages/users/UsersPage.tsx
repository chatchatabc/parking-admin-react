import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";

import UsersTable from "../../components/tables/UsersTable";
import MyButton from "../../components/common/MyButton";
import { Select } from "antd";
import React from "react";
import { globalStateUpdate } from "../../redux/slices/globalState";
import { utilGenerateRandomNumber } from "../../../domain/utils/commonUtils";

function UsersPage() {
  const [sort, setSort] = React.useState("username,1");
  // React Router
  const dispatch = useDispatch();

  return (
    <div className="p-4 bg-bg1 w-full relative">
      {/* {error && <ErrorMessageComp />} */}
      <section className="bg-bg2 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex">
          <h2 className="text-xl font-bold">Users</h2>
          <div className="flex ml-auto items-center px-2 space-x-2">
            <p>Sort by:</p>
            <Select
              onChange={(value) => {
                setSort(value);
                dispatch(
                  globalStateUpdate({
                    reset: utilGenerateRandomNumber(),
                  })
                );
              }}
              className="w-48"
              value={sort}
              options={[
                {
                  label: "Username, ASC",
                  value: "username,1",
                },
                {
                  label: "Username, DESC",
                  value: "username,0",
                },
              ]}
            />
          </div>
          <MyButton
            onClick={() => {
              dispatch(
                drawerFormUpdate({
                  show: true,
                  title: "Create User",
                  content: "userCreate",
                  mode: "create",
                })
              );
            }}
          >
            Create User +
          </MyButton>
        </header>

        <section>
          <UsersTable
            extraVariables={{
              sortField: sort.split(",")[0],
              sortBy: Number(sort.split(",")[1]),
            }}
          />
        </section>
      </section>
    </div>
  );
}

export default UsersPage;
