import React from "react";
import { RouteNode } from "../../../domain/models/RouteModel";
import {
  routeCreateNodeMany,
  routeGetNodes,
  routeUpdateNodeMany,
} from "../../../domain/services/routeService";
import { message } from "antd";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { MapboxDrawOptions } from "mapbox__mapbox-gl-draw";
import MyButton from "../common/MyButton";

function CommutesNodesMap() {
  const map = React.useRef<Record<string, any> | null>(null);
  const draw = React.useRef<Record<string, any> | null>(null);

  const [loading, setLoading] = React.useState(true);
  const [nodes, setNodes] = React.useState<RouteNode[]>([]);

  async function getAllNodes() {
    const mapNodes = draw.current?.getAll();
    const mapFeatures = mapNodes?.features;
    const updatedOldNodes = nodes.map((node) => {
      const newFeature = mapFeatures.find(
        (mapFeature: any) => mapFeature.id === node.id
      );
      node.latitude = newFeature.geometry.coordinates[1];
      node.longitude = newFeature.geometry.coordinates[0];
      return node;
    });
    const response = await routeUpdateNodeMany(updatedOldNodes);
    if (response.errors) {
      response.errors.forEach((error) => {
        message.error(error.message);
      });
    }

    const newNodes = mapFeatures.filter((feature: any) => {
      return !nodes.some((node) => node.id === feature.id);
    });
    const newNodesToSave = newNodes.map((newNode: any) => {
      return {
        poi: "",
        latitude: newNode.geometry.coordinates[1],
        longitude: newNode.geometry.coordinates[0],
      };
    });

    const response2 = await routeCreateNodeMany(newNodesToSave);
    if (response2.errors) {
      response2.errors.forEach((error) => {
        message.error(error.message);
      });
    } else {
      message.success("Nodes updated successfully");
    }
  }

  // Initializations
  React.useEffect(() => {
    if (loading) {
      (async () => {
        const response = await routeGetNodes({ size: 10000000, page: 0 });

        if (response.errors) {
          response.errors.forEach((error) => {
            message.error(error.message);
          });
        } else {
          setNodes(response.data.content);
        }

        setLoading(false);
      })();
    }

    if (!draw?.current) {
      // Draw Options
      const drawOptions: MapboxDrawOptions = {
        displayControlsDefault: false,
        controls: {
          point: true,
        },
      };
      // Add navigation controls
      draw.current = new MapboxDraw(drawOptions);
    }

    if (!map?.current) {
      // Create map with Mapbox
      map.current = new mapboxgl.Map({
        container: "commutesNodesMap", // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: [125.60355, 7.077729], // starting position [lng, lat]
        zoom: 13, // starting zoom
        useWebGL2: true,
      });

      map.current?.addControl(draw.current);

      // map.current?.on("draw.create", (e: any) => {
      //   setNewNodes((prev) => {
      //     const feature = e.features[0];
      //     const date = new Date();
      //     const node: RouteNode = {
      //       id: feature.id,
      //       latitude: feature.geometry.coordinates[1],
      //       longitude: feature.geometry.coordinates[0],
      //       createdAt: date.toISOString(),
      //       poi: "",
      //     };
      //     return [...prev, node];
      //   });
      // });
      // map.current?.on("draw.update", (e: any) => {
      //   const feature = e.features[0];
      //   const isNewNode = newNodes.some((node) => node.id === feature.id);
      //   console.log(isNewNode);
      //   if (isNewNode) {
      //     setNewNodes((prev) => {
      //       const prevFilter = prev.filter((node) => node.id !== feature.id);
      //       const date = new Date();
      //       const node: RouteNode = {
      //         id: feature.id,
      //         latitude: feature.geometry.coordinates[1],
      //         longitude: feature.geometry.coordinates[0],
      //         createdAt: date.toISOString(),
      //         poi: "",
      //       };
      //       return [...prevFilter, node];
      //     });
      //   } else {
      //     setNodes((prev) => {
      //       const prevFilter = prev.filter((node) => node.id !== feature.id);
      //       const date = new Date();
      //       const node: RouteNode = {
      //         id: feature.id,
      //         latitude: feature.geometry.coordinates[1],
      //         longitude: feature.geometry.coordinates[0],
      //         createdAt: date.toISOString(),
      //         poi: "",
      //       };
      //       return [...prevFilter, node];
      //     });
      //   }
      // });
    }
  }, [loading]);

  // Add nodes to map
  React.useEffect(() => {
    if (map?.current && draw?.current) {
      nodes.forEach((node) => {
        draw?.current?.add({
          id: node.id,
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [node.longitude, node.latitude],
          },
        });
      });
    }
  }, [nodes]);

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <div>
          <input
            placeholder="Select a node to change POI"
            className="px-2 py-1 rounded-md w-96"
          />
        </div>
        <MyButton
          onClick={() => {
            getAllNodes();
          }}
        >
          Save Nodes
        </MyButton>
      </div>
      <div className="h-[600px] w-full" id="commutesNodesMap"></div>
    </div>
  );
}

export default CommutesNodesMap;
