import React from "react";
import { Route, RouteEdge, RouteNode } from "../../../domain/models/RouteModel";
import {
  routeGetAll,
  routeGetAllNode,
} from "../../../domain/services/routeService";
import { message } from "antd";
import MyButton from "../common/MyButton";
import RouteCreateForm from "../forms/RouteCreateForm";
import { useForm } from "antd/es/form/Form";
import {
  AxiosResponseData,
  AxiosResponseError,
} from "../../../domain/models/AxiosModel";
import Table, { ColumnsType } from "antd/es/table";
import XIconAsset from "../../assets/XIconAsset";
import type { FeatureCollection } from "geojson";
import { Source, Layer, Marker, LayerProps } from "react-map-gl";
import MapBoxComp from "../MapBoxComp";

function CommutesRoutesMap() {
  const [form] = useForm();
  const [create, setCreate] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [nodes, setNodes] = React.useState<RouteNode[]>([]);
  const [selectedNodes, setSelectedNodes] = React.useState<RouteNode[]>([]);
  const [selectedEdges, setSelectedEdges] = React.useState<RouteEdge[]>([]);
  const [routes, setRoutes] = React.useState<Route[]>([]);

  const edgeCoordinates = selectedNodes.map((node) => {
    return [node.longitude, node.latitude];
  });
  const edgeLayer: LayerProps = {
    id: "edge",
    type: "line",
    source: "edge",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#1890ff",
      "line-width": 8,
      "line-opacity": 0.5,
    },
  };
  const edgeGeojson: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: edgeCoordinates,
        },
      },
    ],
  };

  const columns: ColumnsType<Route> = [
    {
      title: "Name",
      key: "name",
      render: (record: Route) => {
        return (
          <div className="flex space-x-2">
            <button
              className="w-6"
              style={{ backgroundColor: record.color ?? "#FFFFFF" }}
              onClick={() => {
                // const coordinates = record.nodes?.map((node) => {
                //   return [node.longitude, node.latitude];
                // });
                // if (coordinates && coordinates?.length > 0) {
                //   map.flyTo({
                //     center: coordinates[0],
                //     zoom: 12,
                //   });
                // }
              }}
            />
            <p>{record.name}</p>
          </div>
        );
      },
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
                  color: record.color,
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

  function handleMoveNode(index: number, moveUp: boolean = true) {
    const nodesCopy = [...selectedNodes];

    if (moveUp) {
      if (index > 0) {
        const temp = nodesCopy[index - 1];
        nodesCopy[index - 1] = nodesCopy[index];
        nodesCopy[index] = temp;
      }
    } else {
      if (index < nodesCopy.length - 1) {
        const temp = nodesCopy[index + 1];
        nodesCopy[index + 1] = nodesCopy[index];
        nodesCopy[index] = temp;
      }
    }

    setSelectedNodes(nodesCopy);
  }

  // Initialize Data and Map
  React.useEffect(() => {
    if (loading) {
      (async () => {
        const response = await routeGetAllNode({
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

        const response2 = await routeGetAll({});

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
  }, [loading]);

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
                          <li key={`${index}-${node}`} className="flex gap-2">
                            <p className="mr-auto">{node.id}</p>
                            <button
                              onClick={() => {
                                handleMoveNode(index, true);
                              }}
                            >
                              Up
                            </button>
                            <button
                              onClick={() => {
                                handleMoveNode(index, false);
                              }}
                            >
                              Down
                            </button>
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
                              <div className="w-4 h-4">
                                <XIconAsset />
                              </div>
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
        <div className="w-full h-full rounded-lg overflow-hidden">
          <MapBoxComp
            initialViewState={{
              longitude: 125.60355,
              latitude: 7.077729,
              zoom: 15,
            }}
          >
            {/* Create routes */}
            {!create && (
              <>
                {routes.map((route) => {
                  const coordinates = route.nodes?.map((node) => {
                    return [node.longitude, node.latitude];
                  });
                  if (!coordinates) {
                    return null;
                  }
                  const routeId = `route-${String(route.routeUuid)}`;

                  const geoJson: FeatureCollection = {
                    type: "FeatureCollection",
                    features: [
                      {
                        type: "Feature",
                        properties: {},
                        geometry: {
                          type: "LineString",
                          coordinates,
                        },
                      },
                    ],
                  };

                  const layer: LayerProps = {
                    id: routeId,
                    type: "line",
                    source: routeId,
                    layout: {
                      "line-join": "round",
                      "line-cap": "round",
                    },
                    paint: {
                      "line-color": route.color ?? "#000",
                      "line-width": 8,
                      "line-opacity": 0.5,
                    },
                  };

                  return (
                    <Source id={routeId} type="geojson" data={geoJson}>
                      <Layer {...layer} />
                    </Source>
                  );
                })}
              </>
            )}

            {/* Create line edges */}
            {create && (
              <Source id={"edge"} type="geojson" data={edgeGeojson}>
                <Layer {...edgeLayer} />
              </Source>
            )}

            {/* Create nodes */}
            {create && (
              <>
                {nodes.map((node) => {
                  return (
                    <Marker
                      key={node.id}
                      longitude={node.longitude}
                      latitude={node.latitude}
                    >
                      <button
                        onClick={() => {
                          setSelectedNodes([...selectedNodes, node]);
                        }}
                        className={`w-3 h-3 rounded-full transition ${
                          selectedNodes.find((n) => n.id === node.id)
                            ? "bg-blue-500"
                            : "bg-red-500"
                        } cursor-pointer hover:scale-150`}
                      ></button>
                    </Marker>
                  );
                })}
              </>
            )}
          </MapBoxComp>
        </div>
      </div>
    </div>
  );
}

export default CommutesRoutesMap;
