import React from "react";
import { Map } from "react-map-gl";

type Props = React.ComponentProps<typeof Map>;

function MapBox({ children, ...props }: Props) {
  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      mapStyle={"mapbox://styles/mapbox/streets-v12"}
      {...props}
    >
      {children}
    </Map>
  );
}

export default MapBox;
