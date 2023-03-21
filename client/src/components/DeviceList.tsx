import React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { DeviceItem } from "./DeviceItem";

export const DeviceList = observer(() => {
   const { devices } = useContext(Context);

   return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
         {devices.devices.length > 0 &&
            devices.devices.map((device) => (
               <DeviceItem key={device.id} device={device} />
            ))}
      </div>
   );
});
