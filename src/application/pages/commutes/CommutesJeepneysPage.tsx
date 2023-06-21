import { useDispatch } from "react-redux";
import MyButton from "../../components/common/MyButton";
import { drawerFormUpdate } from "../../redux/slices/drawers/drawerForm";
import JeepneysTable from "../../components/tables/JeepneysTable";

function CommutesJeepneysPage() {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-wrap p-2 bg-bg1">
      <div className="p-2 w-full">
        <div className="bg-bg2 rounded-lg p-4">
          {/* Table Title */}
          <header className="flex justify-between">
            <h2 className="text-xl font-bold">Jeepneys</h2>

            <MyButton
              onClick={() => {
                dispatch(
                  drawerFormUpdate({
                    show: true,
                    title: "Add Jeepney",
                    content: "jeepneyCreate",
                    mode: "create",
                  })
                );
              }}
            >
              Add Jeepney +
            </MyButton>
          </header>

          <section className="mt-2">
            <JeepneysTable extraVariables={{}} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default CommutesJeepneysPage;
