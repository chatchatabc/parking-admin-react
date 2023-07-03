import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Jeepney } from "../../../domain/models/JeepneyModel";
import { jeepneyGetAll } from "../../../domain/services/jeepneyService";
import { Spin, message } from "antd";
import DynamicTable from "../../components/tables/DynamicTable";
import SelectAsync from "../../components/select/SelectAsync";
import { routeGetAllOptions } from "../../../domain/services/routeService";
import { Route } from "../../../domain/models/RouteModel";

function CommutesMapPage() {
  const map = React.useRef<Record<string, any> | null>(null);

  const [loading, setLoading] = React.useState(true);
  const [routes, setRoutes] = React.useState<Route[]>([]);
  const [routeSlugs, setRouteSlugs] = React.useState<string[]>([]);
  const [jeepneys, setJeepneys] = React.useState<Jeepney[]>([]);

  React.useEffect(() => {
    if (loading) {
      (async () => {
        const responseJeepneys = await jeepneyGetAll({
          page: 0,
          size: 100000,
        });

        if (responseJeepneys.errors) {
          responseJeepneys.errors.forEach((error) => {
            message.error(error.message);
          });
        } else {
          setJeepneys(responseJeepneys.data.content);
        }

        setLoading(false);
      })();
    }

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: "realtimeMap", // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: [125.60355, 7.077729], // starting position [lng, lat]
        zoom: 13, // starting zoom
      });
    }
  }, [loading]);

  React.useEffect(() => {
    if (loading) {
      (async () => {})();
    }
  }, [routeSlugs]);

  return (
    <div className="flex flex-wrap p-2 bg-bg1">
      <div className="p-2 w-1/3">
        <div className="bg-bg2 rounded-lg p-4">
          {/* Table Title */}
          <header className="flex justify-between">
            <h2 className="text-xl font-bold">Jeepneys</h2>
          </header>

          <section className="mt-2">
            <DynamicTable title="Jeepneys Table" columns={[]} />
          </section>
        </div>
      </div>

      <div className="p-2 w-2/3">
        <div className="bg-bg2 rounded-lg p-4">
          {/* Table Title */}
          <header className="flex justify-between space-x-4">
            <h2 className="text-xl font-bold shrink-0">Realtime Map</h2>
            {SelectAsync({
              className: "w-3/4",
              getData: routeGetAllOptions,
              placeholder: "Select Route",
              mode: "multiple",
              onChange: (value) => {
                setRouteSlugs([...routeSlugs, value]);
              },
            })}
          </header>

          <section className="mt-2 relative">
            <div id="realtimeMap" className="h-96"></div>
            {loading && (
              <div className="absolute top-0 w-full h-full bg-black flex justify-center items-center bg-opacity-50">
                <Spin />
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default CommutesMapPage;
