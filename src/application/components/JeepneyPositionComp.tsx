import React from "react";
import { JeepneyPosition } from "../../domain/models/JeepneyModel";
import { webSocketHandler } from "../layouts/HomeLayout";
import { StringCodec, Subscription } from "nats.ws";
import CarIconAsset from "../assets/CarIconAsset";

type Props = {
  jeepneyUuid: string;
};

const sc = StringCodec();

function JeepneyPositionComp({ jeepneyUuid }: Props) {
  const [jeepneyPosition, setJeepneyPosition] =
    React.useState<JeepneyPosition | null>(null);

  React.useEffect(() => {
    let sub: Subscription | null = null;

    if (webSocketHandler) {
      sub = webSocketHandler.subscribe(`jeepney-${jeepneyUuid}`);
      console.log(`Subscribed to jeepney-${jeepneyUuid}`);
      (async () => {
        if (sub) {
          for await (const m of sub) {
            const data = JSON.parse(sc.decode(m.data));
            console.log(data);
            setJeepneyPosition(data.payload);
          }
        }
      })();
    }

    return () => {
      if (sub) {
        sub.unsubscribe();
        console.log(`Unsubscribed to jeepney-${jeepneyUuid}`);
      }
    };
  }, [webSocketHandler]);

  if (!jeepneyPosition) return <div>Loading...</div>;

  return (
    <div className="flex space-x-2 items-center">
      <div
        style={{
          transform: `rotate(${jeepneyPosition?.direction}deg)`,
        }}
        className="transition bg-white p-1 rounded-full"
      >
        <div className="w-6 h-6">
          <CarIconAsset />
        </div>
      </div>
      <span>
        {jeepneyPosition?.latitude}, {jeepneyPosition?.longitude}
      </span>
    </div>
  );
}

export default JeepneyPositionComp;
