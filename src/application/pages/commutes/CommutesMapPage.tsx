import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Jeepney } from "../../../domain/models/JeepneyModel";
import { jeepneyGetAllByRoute } from "../../../domain/services/jeepneyService";
import { Spin, message } from "antd";
import DynamicTable from "../../components/tables/DynamicTable";
import SelectAsync from "../../components/select/SelectAsync";
import {
  routeGetAllOptions,
  routeGetWithNodesAndEdges,
} from "../../../domain/services/routeService";
import { Route } from "../../../domain/models/RouteModel";
import { ColumnsType } from "antd/es/table";
import { webSocketHandler } from "../../layouts/HomeLayout";
import { StringCodec, Subscription } from "nats.ws";

const sc = StringCodec();

function CommutesMapPage() {
  const map = React.useRef<Record<string, any> | null>(null);

  const [loading, setLoading] = React.useState(true);
  const [routes, setRoutes] = React.useState<Route[]>([]);
  const [routeUuids, setRouteUuids] = React.useState<string[]>([]);
  const [jeepneys, setJeepneys] = React.useState<Jeepney[]>([]);

  const columns: ColumnsType<Jeepney> = [
    {
      title: "Plate Number",
      key: "plateNumber",
      dataIndex: "plateNumber",
    },
    {
      title: "Route",
      key: "route",
      render: (record: Jeepney) => {
        return <p>{record.route?.name ?? ""}</p>;
      },
    },
    {
      title: "Location",
      key: "location",
      render: (record: Jeepney) => {
        if (record.position) {
          return (
            <button onClick={() => handleLocateJeepney(record)}>
              {record.position?.latitude ?? ""},{" "}
              {record.position?.longitude ?? ""}
            </button>
          );
        }
        return <p>loading...</p>;
      },
    },
  ];

  function handleLocateJeepney(jeepney: Jeepney) {
    if (jeepney.position) {
      map.current?.flyTo({
        center: [jeepney.position.longitude, jeepney.position.latitude],
        zoom: 17,
      });
    }
  }

  // Map initialization
  React.useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: "realtimeMap", // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: [125.60355, 7.077729], // starting position [lng, lat]
        zoom: 13, // starting zoom
      });

      map.current?.on("load", () => {
        // add car image
        map.current?.loadImage(
          "/images/car-top-view.png",
          (error: any, image: any) => {
            if (error) throw error;
            map.current?.addImage("jeepney", image);
          }
        );
      });
    }
  }, []);

  // Fetch routes and jeeps to be displayed
  React.useEffect(() => {
    if (routeUuids.length > routes.length) {
      (async () => {
        // Add routes
        const newValues = [...routeUuids].filter(
          (item) => !routes.some((route) => route.routeUuid === item)
        );

        const newRoutes = newValues.map(async (routeUuid) => {
          const response = await routeGetWithNodesAndEdges({
            keyword: routeUuid,
          });

          if (response.errors) {
            response.errors.forEach((error) => {
              message.error(error.message);
            });
            return null;
          }

          const route = response.data;

          // Fetch jeepneys
          const responseJeepneys = await jeepneyGetAllByRoute({
            keyword: route.routeUuid ?? "",
          });

          if (responseJeepneys.errors) {
            responseJeepneys.errors.forEach((error) => {
              message.error(error.message);
            });
          } else {
            // Add route to jeepney
            const content = responseJeepneys.data.content.map((jeepney) => {
              return {
                ...jeepney,
                route,
              };
            });

            setJeepneys((prev) => [...prev, ...content]);
          }

          return route;
        });

        const newRoutesData = await Promise.all(newRoutes).then((values) => {
          return values.filter((value) => value) as Route[];
        });

        setRoutes([...routes, ...newRoutesData]);
      })();
    } else {
      // Remove routes
      const newRoutes = [...routes].filter((route) =>
        routeUuids.includes(route.routeUuid ?? "")
      );

      setRoutes(newRoutes);

      // Remove jeepneys
      const newJeepneys = [...jeepneys].filter((jeepney) =>
        routeUuids.includes(jeepney.route?.routeUuid ?? "")
      );

      setJeepneys(newJeepneys);
    }
  }, [routeUuids]);

  // Draw routes, and subscribe to websocket
  React.useEffect(() => {
    // Websocket Channels
    const channels: Subscription[] = [];

    (async () => {
      // Drawing of routes
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

      // Subscribe to websocket
      routes.forEach((route) => {
        const channel = webSocketHandler?.subscribe(`route-${route.slug}`);
        if (channel) {
          (async () => {
            for await (const m of channel) {
              const json = JSON.parse(sc.decode(m.data));
              const data = json.payload;

              const jeepneyIndex = jeepneys.findIndex(
                (jeepney) => jeepney.jeepneyUuid === data.jeepneyUuid
              );

              if (jeepneyIndex !== -1) {
                setJeepneys((prev) => {
                  const newJeepneys = [...prev];
                  newJeepneys[jeepneyIndex].position = data;
                  return newJeepneys;
                });
              }
            }
          })();
          channels.push(channel);
        }
      });

      // Set loading to false
      setLoading(false);
    })();

    return () => {
      // Remove drawn routes
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

      // Unsubscribe websocket
      channels.forEach((channel) => {
        channel.unsubscribe();
      });
    };
  }, [routes]);

  // Draw jeepneys
  React.useEffect(() => {
    if (map?.current) {
      jeepneys.forEach((jeepney) => {
        // Jeepney position
        const position = jeepney.position ?? {
          latitude: 0,
          longitude: 0,
        };

        // Jeepney marker id
        const jeepneyId = `jeepney-${String(jeepney.plateNumber)}`;
        const rotation = jeepney.position?.direction ?? 0;

        // Add jeepney drawing layer and source
        map?.current?.addSource(jeepneyId, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [position.longitude, position.latitude],
            },
          },
        });

        map?.current?.addLayer({
          id: jeepneyId,
          type: "symbol",
          source: jeepneyId,
          layout: {
            "icon-image": "jeepney",
            "icon-size": 0.08,
            "icon-rotate": rotation,
            "icon-allow-overlap": true,
          },
        });
      });
    }

    return () => {
      // Remove drawn jeepneys
      if (map?.current) {
        jeepneys.forEach((jeepney) => {
          const routeId = `jeepney-${String(jeepney.plateNumber)}`;
          if (map?.current?.getLayer(routeId)) {
            map?.current?.removeLayer(routeId);
          }
          if (map?.current?.getSource(routeId)) {
            map?.current?.removeSource(routeId);
          }
        });
      }
    };
  }, [jeepneys]);

  return (
    <div className="flex flex-wrap p-2 bg-bg1">
      <div className="p-2 w-full">
        <div className="bg-bg2 rounded-lg p-4">
          {/* Table Title */}
          <header className="flex justify-between space-x-4">
            <h2 className="text-xl font-bold w-2/3">Realtime Map</h2>
            {SelectAsync({
              getData: routeGetAllOptions,
              className: "w-3/4",
              placeholder: "Select Route",
              mode: "multiple",
              onChange: (values: string[]) => {
                setRouteUuids(values);
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

      <div className="p-2 w-full">
        <div className="bg-bg2 rounded-lg p-4">
          {/* Table Title */}
          <header className="flex justify-between">
            <h2 className="text-xl font-bold">Jeepneys</h2>
          </header>

          <section className="mt-2">
            <DynamicTable
              loading={loading}
              dataSource={jeepneys}
              caption="Jeepneys Table"
              columns={columns}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default CommutesMapPage;
