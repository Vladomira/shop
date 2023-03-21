import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Context } from "..";
import { BrandBar } from "../components/BrandBar";
import { DeviceList } from "../components/DeviceList";
import { Pages } from "../components/Pages";
import { TypeBar } from "../components/TypeBar";
import { fetchBrands, fetchTypes, fetchDevices } from "../http/deviceApi";

const Shop = observer(() => {
   const { devices } = useContext(Context);
   const { selectedBrand, selectedType, page, limit } = devices;

   useEffect(() => {
      fetchTypes().then((data) => devices.setTypes(data));
      fetchBrands().then((data) => devices.setBrands(data));
      fetchDevices(selectedType.id, selectedBrand.id, page, limit).then(
         (data) => {
            devices.setDevices(data.rows);
            devices.setTotalCount(data.count);
         }
      );
   }, []);
   useEffect(() => {
      fetchDevices(selectedType.id, selectedBrand.id, page, limit).then(
         (data) => {
            devices.setDevices(data.rows);
            devices.setTotalCount(data.count);
         }
      );
   }, [devices.page, selectedType.id, selectedBrand.id]);
   return (
      <Container>
         <Row className="mt-2">
            <Col md={3}>
               <TypeBar />
            </Col>
            <Col md={9}>
               <BrandBar />
               <DeviceList />
               <Pages />
            </Col>
         </Row>
      </Container>
   );
});

export default Shop;
