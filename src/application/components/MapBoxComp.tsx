import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

type Props = {
  latitude: number;
  longitude: number;
};

function MapBoxComp({ latitude, longitude }: Props) {
  const map = React.useRef<any | null>(null);

  React.useEffect(() => {
    if (map?.current) {
      return;
    }

    map.current = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [longitude, latitude], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]);

    marker.addTo(map.current);
  }, []);

  return <div className="w-full h-full block" id="map"></div>;
}

export default MapBoxComp;
