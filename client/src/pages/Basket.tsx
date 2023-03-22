import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { fetchDeviceById } from "../api/deviceApi";
import { BasketDevicesProps, DevicesProps } from "../utils/store-types";

export const Basket = () => {
   const { user, basket, devices } = useContext(Context);
   const [basketDevices, setBasketDevices] = useState<DevicesProps[]>([]);

   useEffect(() => {
      // id && fetchDeviceById(id).then((data) => setDevice(data));
      if (user.user.id) {
         // const res= basket.basketDevicesIds.map(())
      }
   }, []);
   // console.log("basketDevices", basketDevices);

   return (
      <div>
         {/* {basketDevices.length > 0 &&
            basketDevices.map((el) => {
               return <p>{el.name}</p>;
            })} */}
      </div>
   );
};
