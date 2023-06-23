import CommutesNodesMap from "../../components/commutes/CommutesNodesMap";

function CommutesNodesPage() {
  return (
    <div className="flex flex-wrap p-2 bg-bg1">
      <div className="p-2 w-full">
        <div className="bg-bg2 rounded-lg p-4">
          <section>
            <CommutesNodesMap />
          </section>
        </div>
      </div>
    </div>
  );
}

export default CommutesNodesPage;
