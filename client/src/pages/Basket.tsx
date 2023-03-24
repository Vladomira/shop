import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { fetchBasketDevices } from "../api/basketApi";
import { DeviceItem } from "../components/DeviceItem";
import { DevicesProps } from "../utils/store-types";

export const Basket = () => {
   const { user } = useContext(Context);
   const [basketDevices, setBasketDevices] = useState<DevicesProps[]>([]);

   useEffect(() => {
      if (user.user.id) {
         fetchBasketDevices({ userId: user.user.id }).then((data) =>
            setBasketDevices(data)
         );
      }
   }, []);
   return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
         {basketDevices.length > 0 &&
            basketDevices.map((device) => (
               <DeviceItem key={device.id} device={device} />
            ))}
      </div>
   );
};
