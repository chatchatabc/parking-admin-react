import { Input, Table } from "antd";
import { useNavigate } from "react-router-dom";

function UsersListPage() {
  const navigate = useNavigate();

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
      <section className="bg-slate-300 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-2xl font-medium">User Activity</h2>
        </header>

        {/* Table Actions */}
        <section className="flex gap-2">
          {/* Search bar */}
          <div className="flex space-x-2">
            <Input className="p-2 w-64" placeholder="Search for Users" />
            <button className="h-full px-4 bg-blue-500 rounded-md text-white flex items-center">
              Search
            </button>
          </div>

          <button
            onClick={() => {
              navigate("/users/create");
            }}
            className="bg-blue-500 ml-auto text-white px-4 py-1 rounded-md"
          >
            Create User +
          </button>
        </section>
        <section>
          <Table dataSource={dataSource} columns={columns} />
        </section>
      </section>
    </div>
  );
}

export default UsersListPage;
