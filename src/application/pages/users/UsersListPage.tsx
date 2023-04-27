import { Input, Table } from "antd";
import { useDispatch } from "react-redux";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";

function UsersListPage() {
  const dispatch = useDispatch();

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div className="p-4 w-full">
      <section className="bg-bg4 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">User Activity</h2>
        </header>

        {/* Table Actions */}
        <section className="flex gap-2">
          {/* Search bar */}
          <div className="flex space-x-2">
            <Input className="p-2 w-64" placeholder="Search for Users" />
            <button className="h-full px-4 bg-primary rounded-md text-white flex items-center transition hover:bg-secondary">
              Search
            </button>
          </div>

          <button
            onClick={() => {
              dispatch(
                drawerFormUpdate({
                  show: true,
                  title: "Create User",
                  content: "user",
                  mode: "create",
                })
              );
            }}
            className="bg-primary ml-auto text-white px-4 py-1 rounded-md transition hover:bg-secondary"
          >
            Create User +
          </button>
        </section>
        <section>
          <Table
            className={`my-table`}
            dataSource={dataSource}
            columns={columns}
          />
        </section>
      </section>
    </div>
  );
}

export default UsersListPage;
