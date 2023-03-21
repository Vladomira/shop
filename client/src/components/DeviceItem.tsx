import React, { FC } from "react";
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { DevicesProps } from "../utils/initialData";
import star from "../assets/star.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

export type DeviceItemProp = {
   device: DevicesProps;
};

export const DeviceItem: FC<DeviceItemProp> = ({ device }) => {
   let navigate = useNavigate();

   return (
      <Col md={3} onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}>
         <Card style={{ width: "150px", cursor: "pointer" }} border="light">
            <Image
               width={150}
               height={150}
               src={`${process.env.REACT_APP_API_URL}${device.img}`}
            />
            <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
               <div>Samsung...</div>
               <div className="d-flex align-items-center">
                  <div>{device.rating}</div>
                  <Image width={18} height={18} src={star} />
               </div>
            </div>
            <div>{device.name}</div>
         </Card>
      </Col>
   );
};
