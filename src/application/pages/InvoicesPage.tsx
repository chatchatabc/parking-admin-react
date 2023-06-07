import InvoicesTable from "../components/tables/InvoicesTable";

function UsersPage() {
  return (
    <div className="p-4 bg-bg1 w-full relative">
      {/* {error && <ErrorMessageComp />} */}
      <section className="bg-bg2 p-4 space-y-2 rounded-lg w-full">
        {/* Table Title */}
        <header className="flex justify-between">
          <h2 className="text-xl font-bold">Invoice History</h2>
        </header>

        <section>
          <InvoicesTable />
        </section>
      </section>
    </div>
  );
}

export default UsersPage;
