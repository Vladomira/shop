import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import bigStar from "../assets/bigStar.png";
import { fetchDeviceById } from "../api/deviceApi";
import { DeviceInfoProps, initialDevice } from "../utils/store-types";

export const DevicePage = () => {
   const [device, setDevice] = useState<DeviceInfoProps>(initialDevice);
   const { id } = useParams();

   useEffect(() => {
      id && fetchDeviceById(id).then((data) => setDevice(data));
   }, []);

   return (
      <Container className="mt-5">
         <Row>
            <Col md={4}>
               <Image
                  width={300}
                  height={300}
                  src={`${process.env.REACT_APP_API_URL}${device.img}`}
               />
            </Col>
            <Col md={4}>
               <Row className="d-flex flex-column align-items-center">
                  <h2>{device.name}</h2>
                  <div
                     className="d-flex align-items-center justify-content-center"
                     style={{
                        background: `url(${bigStar}) no-repeat center center`,
                        width: 240,
                        height: 240,
                        backgroundSize: "cover",
                        fontSize: 64,
                     }}
                  >
                     {device.rating}
                  </div>
               </Row>
            </Col>
            <Col md={4}>
               <Card
                  className="d-flex flex-column align-items-center justify-content-around"
                  style={{
                     width: 300,
                     height: 300,
                     fontSize: 32,
                     border: "5px solid lightgray",
                  }}
               >
                  <h3>From: {device.price} monets.</h3>
                  <Button variant={"outline-dark"}>Add to cart</Button>
               </Card>
            </Col>
         </Row>
         <Row className="d-flex flex-column m-3">
            <h1>Characteristics</h1>
            {device.info.length > 0 &&
               device.info.map((el, index) => (
                  <Row
                     key={index}
                     style={{
                        background:
                           index % 2 === 0 ? "lightgray" : "transparent",
                        padding: 10,
                     }}
                  >
                     {el.title}: {el.description}
                  </Row>
               ))}
         </Row>
      </Container>
   );
};
