import React from "react";
import { Route, RouteNode } from "../../../domain/models/RouteModel";
import {
  routeGetAllNodesAndEdges,
  routeGetNodes,
} from "../../../domain/services/routeService";
import { message } from "antd";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { MapboxDrawOptions } from "mapbox__mapbox-gl-draw";

function CommutesRoutesMap() {
  const map = React.useRef<Record<string, any> | null>(null);
  const draw = React.useRef<Record<string, any> | null>(null);

  const [loading, setLoading] = React.useState<boolean>(true);
  const [nodes, setNodes] = React.useState<RouteNode[]>([]);
  const [routes, setRoutes] = React.useState<Route[]>([]);

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

        const response2 = await routeGetAllNodesAndEdges({});

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

    if (!draw?.current) {
      const drawOptions: MapboxDrawOptions = {
        displayControlsDefault: false,
      };
      draw.current = new MapboxDraw(drawOptions);
    }

    if (!map?.current) {
      map.current = new mapboxgl.Map({
        container: "commutesRoutesMap",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [125.60355, 7.077729],
        zoom: 13, // starting zoom
        useWebGL2: true,
      });
      map.current?.addControl(draw.current);
    }
  }, [loading]);

  React.useEffect(() => {
    if (map?.current && draw?.current) {
      routes.forEach((route) => {
        const sortedEdges = route.edges?.sort((a, b) => {
          if (a.nodeFrom !== b.nodeFrom) {
            return (a.nodeFrom ?? 0) - (b.nodeFrom ?? 0);
          } else {
            return (a.nodeTo ?? 0) - (b.nodeTo ?? 0);
          }
        });

        const coordinates = sortedEdges
          ?.map((edge) => {
            const node = nodes.find((node) => node.id === edge.nodeFrom);
            return [node?.longitude, node?.latitude];
          })
          .filter((coordinate) => coordinate[0] !== undefined);
        coordinates?.push(coordinates[0]);

        // const coordinates = route.nodes?.map((node) => {
        //   return [node.longitude, node.latitude];
        // });

        const routeId = `route-${String(route.routeUuid)}`;
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

        if (map.current?.getSource(routeId)) {
          map.current.removeLayer(routeId);
          map.current.removeSource(routeId);
        }

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
  }, [routes]);

  return (
    <div>
      <div className="w-full h-[600px]" id="commutesRoutesMap"></div>
    </div>
  );
}

export default CommutesRoutesMap;
