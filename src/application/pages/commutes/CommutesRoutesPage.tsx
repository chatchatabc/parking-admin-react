import CommutesRoutesMap from "../../components/commutes/CommutesRoutesMap";

function CommutesRoutesPage() {
  return (
    <div className="flex flex-wrap p-2 bg-bg1">
      <div className="p-2 w-full">
        <div className="bg-bg2 rounded-lg p-4">
          <header>
            <h1 className="text-xl font-bold">Routes</h1>
          </header>

          <section className="mt-2">
            <CommutesRoutesMap />
          </section>
        </div>
      </div>
    </div>
  );
}

export default CommutesRoutesPage;
