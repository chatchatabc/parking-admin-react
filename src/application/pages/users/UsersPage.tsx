import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";

import UsersTable from "../../components/tables/UsersTable";
import MyButton from "../../components/common/MyButton";
import { Select } from "antd";
import React from "react";
import { globalStateUpdate } from "../../redux/slices/globalState";
import { utilGenerateRandomNumber } from "../../../domain/utils/commonUtils";
import { userGetFilters } from "../../../domain/services/userService";

function UsersPage() {
  // Local States
  const [sort, setSort] = React.useState("username,1");

  // React Router
  const dispatch = useDispatch();

  // Sort options
  const options = userGetFilters();

  return (
    <div className="p-4 bg-bg1 w-full relative">
      {/* {error && <ErrorMessageComp />} */}
      <section className="bg-bg2 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex">
          <h2 className="text-xl font-bold">Users</h2>
          <Select
            suffixIcon={
              <svg
                className="w-6 h-6 text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M8 16H4l6 6V2H8zm6-11v17h2V8h4l-6-6z"
                />
              </svg>
            }
            onChange={(value) => {
              setSort(value);
              dispatch(
                globalStateUpdate({
                  reset: utilGenerateRandomNumber(),
                })
              );
            }}
            className="w-48 ml-auto mr-2"
            value={sort}
            options={options}
          />
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
