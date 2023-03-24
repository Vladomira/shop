import React, { FC, useContext } from "react";
import { Button, Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { DevicesProps } from "../utils/store-types";
import star from "../assets/star.png";
import basketImg from "../assets/basket.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { Context } from "..";
import { createBasketDevice } from "../api/basketApi";
import { toast } from "react-toastify";
import { Notification } from "./Notification";

export type DeviceItemProp = {
   device: DevicesProps;
};

export const DeviceItem: FC<DeviceItemProp> = ({ device }) => {
   let navigate = useNavigate();
   const { user, basket } = useContext(Context);
   const { id, img, name, rating, price } = device;

   const onCartClick = () => {
      const userId = user.user.id;

      createBasketDevice({ userId, deviceId: id })
         .then(
            (data) => (
               // eslint-disable-next-line no-sequences
               basket.basketDevicesIds.push(data.deviceId),
               toast.success("Device was added to cart")
            )
         )
         .catch((error) => toast(error?.response?.data?.message));
   };

   return (
      <Col md={3} className="m-3">
         <Card
            style={{
               width: "150px",
               outline: " 1px solid red",
               cursor: "pointer",
               padding: "5px 8px",
            }}
            border="light"
         >
            <div onClick={() => navigate(`${DEVICE_ROUTE}/${id}`)}>
               <Image
                  width={150}
                  height={150}
                  src={`${process.env.REACT_APP_API_URL}${img}`}
               />
               <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                  <div>{name}</div>
                  <div className="d-flex align-items-center ">
                     <div>{rating}</div>
                     <Image width={18} height={18} src={star} />
                  </div>
               </div>
               <div className="d-flex justify-content-between mt-3 align-items-center">
                  {name}
               </div>
            </div>
            {user.isAuth && (
               <Button
                  variant="secondary"
                  className="ml-0 d-inline p-0"
                  style={{ padding: 0 }}
                  onClick={onCartClick}
               >
                  <Image width={35} height={35} src={basketImg} />
               </Button>
            )}
         </Card>
         <Notification />
      </Col>
   );
};
