import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Jeepney } from "../../../domain/models/JeepneyModel";
import { jeepneyGetAll } from "../../../domain/services/jeepneyService";
import { Spin, message } from "antd";
import DynamicTable from "../../components/tables/DynamicTable";
import SelectAsync from "../../components/select/SelectAsync";
import {
  routeGet,
  routeGetAllOptions,
  routeGetWithNodesAndEdges,
} from "../../../domain/services/routeService";
import { Route } from "../../../domain/models/RouteModel";

function CommutesMapPage() {
  const map = React.useRef<Record<string, any> | null>(null);

  const [loading, setLoading] = React.useState(true);
  const [routes, setRoutes] = React.useState<Route[]>([]);
  const [selectedRoutes, setSelectedRoutes] = React.useState<string[]>([]);
  const [jeepneys, setJeepneys] = React.useState<Jeepney[]>([]);

  // Data fetch and map initialization
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

        const responseRoutesPromise = selectedRoutes.map(
          async (selectedRoute) => {
            const response = await routeGetWithNodesAndEdges({
              keyword: selectedRoute,
            });

            if (response.errors) {
              response.errors.forEach((error) => {
                message.error(error.message);
              });
            } else {
              return response.data;
            }
          }
        );

        const responseRoutes = await Promise.all(responseRoutesPromise);

        setRoutes(responseRoutes.filter((route) => route) as Route[]);
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

  // Drawing of routes
  React.useEffect(() => {
    if (map?.current) {
      routes.forEach((route) => {
        const coordinates = route.nodes?.map((node) => {
          return [node.longitude, node.latitude];
        });

        const routeId = `route-${String(route.routeUuid)}`;
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

        // Add name to the line
        map.current?.addSource(routeId, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates,
            },
          },
        });

        map.current?.addLayer({
          id: routeId,
          type: "line",
          source: routeId,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": `#${randomColor}`,
            "line-width": 8,
          },
        });
      });
    }

    return () => {
      if (map?.current) {
        routes.forEach((route) => {
          const routeId = `route-${String(route.routeUuid)}`;
          if (map?.current?.getLayer(routeId)) {
            map?.current?.removeLayer(routeId);
          }
          if (map?.current?.getSource(routeId)) {
            map?.current?.removeSource(routeId);
          }
        });
      }
    };
  }, [routes]);

  console.log(routes);

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
              value: routes.map((route) => route.routeUuid),
              className: "w-3/4",
              getData: routeGetAllOptions,
              placeholder: "Select Route",
              mode: "multiple",
              onChange: (value) => {
                setSelectedRoutes(value);
                setLoading(true);
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
