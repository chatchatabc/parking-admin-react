import React from "react";
import { Route, RouteEdge, RouteNode } from "../../../domain/models/RouteModel";
import {
  routeGetAllWithNodesAndEdges,
  routeGetNodes,
} from "../../../domain/services/routeService";
import { message } from "antd";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MyButton from "../common/MyButton";
import RouteCreateForm from "../forms/RouteCreateForm";
import { useForm } from "antd/es/form/Form";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import Table, { ColumnsType } from "antd/es/table";

function CommutesRoutesMap() {
  const map = React.useRef<Record<string, any> | null>(null);

  const [form] = useForm();
  const [create, setCreate] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [nodes, setNodes] = React.useState<RouteNode[]>([]);
  const [selectedNodes, setSelectedNodes] = React.useState<RouteNode[]>([]);
  const [selectedEdges, setSelectedEdges] = React.useState<RouteEdge[]>([]);
  const [routes, setRoutes] = React.useState<Route[]>([]);

  const columns: ColumnsType<Route> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Route) => {
        return (
          <div className="flex space-x-2 text-xs underline">
            <button
              onClick={() => {
                setSelectedNodes(record.nodes ?? []);
                setSelectedEdges(record.edges ?? []);
                setCreate(true);

                form.setFieldsValue({
                  routeUuid: record.routeUuid,
                  routeId: record.id,
                  name: record.name,
                  slug: record.slug,
                  status: record.status,
                  description: record.description,
                });
              }}
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  async function handleSubmit(
    sendData: (
      values: Record<string, any>
    ) => Promise<AxiosResponseData | AxiosResponseError>,
    values: Record<string, any>,
    successMessage: string
  ): Promise<AxiosResponseData | AxiosResponseError> {
    let response = await sendData({
      ...values,
      nodes: selectedNodes,
      edges: selectedEdges,
    });

    if (response.errors) {
      response.errors.forEach((error) => {
        message.error(error.message);
      });
    } else {
      message.success(successMessage);
      setCreate(false);
      setLoading(true);
    }

    return response;
  }

  // Initialize Data and Map
  React.useEffect(() => {
    if (loading) {
      (async () => {
        const response = await routeGetNodes({
          page: 0,
          size: 1000000,
        });

        if (response.errors) {
          response.errors.forEach((error) => {
            message.error(error.message);
          });
        } else {
          setNodes(response.data?.content || []);
        }

        const response2 = await routeGetAllWithNodesAndEdges({});

        if (response2.errors) {
          response2.errors.forEach((error) => {
            message.error(error.message);
          });
        } else {
          setRoutes(response2.data.content);
        }

        setLoading(false);
      })();
    }

    if (!map?.current) {
      map.current = new mapboxgl.Map({
        container: "commutesRoutesMap",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [125.60355, 7.077729],
        zoom: 13, // starting zoom
        useWebGL2: true,
      });
    }
  }, [loading]);

  // Draw routes
  React.useEffect(() => {
    if (map?.current && !create) {
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
  }, [create, routes]);

  // Draw nodes
  React.useEffect(() => {
    if (map?.current && create) {
      nodes.forEach((node) => {
        const nodeId = `node-${String(node.id)}`;

        map.current?.addSource(nodeId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [node.longitude, node.latitude],
            },
            properties: {
              title: node.poi ?? nodeId,
            },
          },
        });

        map.current?.addLayer({
          id: nodeId,
          type: "circle",
          source: nodeId,
          paint: {
            "circle-radius": 4,
            "circle-color": selectedNodes.some(
              (selectedNode) => selectedNode.id === node.id
            )
              ? "#007cbf"
              : "#ff0000",
          },
        });

        map.current?.on("click", nodeId, () => {
          setSelectedNodes([...selectedNodes, node]);
        });

        map.current?.on("mouseenter", nodeId, () => {
          const canvas = map.current?.getCanvas() as HTMLCanvasElement;
          canvas.style.cursor = "pointer";
          // const coordinates = e.features[0].geometry.coordinates.slice();
          // const { description, title } = e.features[0].properties;

          // enlarge the node
          map.current?.setPaintProperty(nodeId, "circle-radius", 6);
        });

        map.current?.on("mouseleave", nodeId, () => {
          const canvas = map.current?.getCanvas() as HTMLCanvasElement;
          canvas.style.cursor = "";

          // reset the node
          map.current?.setPaintProperty(nodeId, "circle-radius", 4);
        });
      });
    }

    return () => {
      if (map?.current) {
        nodes.forEach((node) => {
          const nodeId = `node-${String(node.id)}`;
          if (map?.current?.getLayer(nodeId)) {
            map?.current?.removeLayer(nodeId);
          }
          if (map?.current?.getSource(nodeId)) {
            map?.current?.removeSource(nodeId);
          }
        });
      }
    };
  }, [create, selectedNodes]);

  // Draw edges
  React.useEffect(() => {
    if (map?.current && create) {
      selectedNodes.forEach((node, index) => {
        if (index < selectedNodes.length - 1) {
          const nodeFrom = node.id;
          const nodeTo = selectedNodes[index + 1].id;

          const edgeId = `edge-${String(nodeFrom)}-${String(nodeTo)}`;

          map.current?.addSource(edgeId, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: [
                  [node.longitude, node.latitude],
                  [
                    selectedNodes[index + 1].longitude,
                    selectedNodes[index + 1].latitude,
                  ],
                ],
              },
            },
          });

          map.current?.addLayer({
            id: edgeId,
            type: "line",
            source: edgeId,
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-width": 8,
            },
          });
        }
      });
    }

    return () => {
      selectedNodes.forEach((node, index) => {
        if (index < selectedNodes.length - 1) {
          const nodeFrom = node.id;
          const nodeTo = selectedNodes[index + 1].id;

          const edgeId = `edge-${String(nodeFrom)}-${String(nodeTo)}`;

          if (map?.current?.getLayer(edgeId)) {
            map?.current?.removeLayer(edgeId);
          }
          if (map?.current?.getSource(edgeId)) {
            map?.current?.removeSource(edgeId);
          }
        }
      });
    };
  }, [create, selectedNodes]);

  return (
    <div className="flex items-stretch">
      <div className="w-1/3 flex">
        <div className="border-2 p-2 rounded-lg w-full">
          <header className="flex justify-between">
            <h2 className="text-lg font-bold">{create ? "Form" : "List"}</h2>
            {create ? (
              <MyButton
                style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }}
                onClick={() => {
                  setCreate(!create);
                }}
              >
                Cancel
              </MyButton>
            ) : (
              <MyButton
                onClick={() => {
                  setCreate(!create);
                  setSelectedNodes([]);
                  form.resetFields();
                }}
              >
                Create Route +
              </MyButton>
            )}
          </header>
          <section className="mt-2 border rounded-lg  overflow-hidden">
            {create ? (
              <div className="bg-white p-2">
                <section>
                  <RouteCreateForm
                    title="Route Create Form"
                    loading={loading}
                    formRef={form}
                    handleSubmit={handleSubmit}
                  />
                </section>

                <section className="text-black">
                  <header>
                    <h3 className="text-lg">Nodes</h3>
                  </header>

                  <section>
                    <ul>
                      {selectedNodes.map((node, index) => {
                        return (
                          <li key={node.id}>
                            <button
                              onClick={() => {
                                // Removed element based from index
                                setSelectedNodes(
                                  selectedNodes.filter(
                                    (_, index1) => index1 !== index
                                  )
                                );
                              }}
                            >
                              {node.id}
                            </button>
                          </li>
                        );
                      })}
                      {selectedNodes.length === 0 && (
                        <li>
                          <span>No nodes selected</span>
                        </li>
                      )}
                    </ul>
                  </section>
                </section>
              </div>
            ) : (
              <div>
                <Table
                  loading={loading}
                  className="myTable"
                  dataSource={routes}
                  columns={columns}
                />
              </div>
            )}
          </section>
        </div>
      </div>
      <div className="w-2/3 h-[600px] px-4">
        <div
          className="w-full h-full rounded-lg overflow-hidden"
          id="commutesRoutesMap"
        ></div>
      </div>
    </div>
  );
}

export default CommutesRoutesMap;
