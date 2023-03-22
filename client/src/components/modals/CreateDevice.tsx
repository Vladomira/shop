import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import {
   Button,
   Col,
   Dropdown,
   Form,
   Modal,
   ModalProps,
   Row,
} from "react-bootstrap";
import { Context } from "../..";
import { createDevice, fetchBrands, fetchTypes } from "../../api/deviceApi";

type InfoProps = {
   id: number;
   title: string;
   description: string;
   date: number;
};

export const CreateDeviceComponent: FC<ModalProps> = observer(
   ({ show, onHide }) => {
      const { devices } = useContext(Context);
      const [name, setName] = useState<string>("");
      const [price, setPrice] = useState<number | string>("");
      const [file, setFile] = useState<File | string>("");
      const [info, setInfo] = useState<InfoProps[]>([]);

      useEffect(() => {
         fetchTypes().then((data) => devices.setTypes(data));
         fetchBrands().then((data) => devices.setBrands(data));
      }, []);
      const addInfo = () => {
         setInfo([
            ...info,
            { title: "", description: "", id: 0, date: Date.now() },
         ]);
      };

      const removeInfo = (number: number) =>
         setInfo(info.filter((i) => i.date !== number));

      const changeInfo = (key: string, value: string, number: number) => {
         setInfo(
            info.map((i) => (i.date === number ? { ...i, [key]: value } : i))
         );
      };
      const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
         const { files } = event.target;
         const selectedFiles = files as FileList;
         setFile(selectedFiles?.[0]);
      };

      const addDevice = () => {
         try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", `${price}`);
            formData.append("img", file);
            formData.append("brandId", `${devices.selectedBrand.id}`);
            formData.append("typeId", `${devices.selectedType.id}`);
            formData.append("info", JSON.stringify(info));
            createDevice(formData).then((data) => onHide && onHide());
         } catch (error) {
            alert(error);
         }
      };

      return (
         <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title-vcenter">
                  Add device
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
                  <>
                     <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                           {devices.selectedType.name || "Choose type"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                           {devices.types.map((type) => (
                              <Dropdown.Item
                                 onClick={() => devices.setSelectedType(type)}
                                 key={type.id}
                              >
                                 {type.name}
                              </Dropdown.Item>
                           ))}
                        </Dropdown.Menu>
                     </Dropdown>
                     <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                           {devices.selectedBrand.name || "Choose brand"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                           {devices.brands.map((brand) => (
                              <Dropdown.Item
                                 onClick={() => devices.setSelectedBrand(brand)}
                                 key={brand.id}
                              >
                                 {brand.name}
                              </Dropdown.Item>
                           ))}
                        </Dropdown.Menu>
                     </Dropdown>
                     <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Type name of device"
                     />
                     <Form.Control
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Type price of device"
                        type="number"
                     />
                     <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                     />
                     <hr />
                     <Button variant={"outline-dark"} onClick={addInfo}>
                        Add new device
                     </Button>
                     {info?.length > 0 &&
                        info.map(({ title, date, description }) => (
                           <Row className="mt-4" key={date}>
                              <Col md={4}>
                                 <Form.Control
                                    value={title}
                                    onChange={({ target: { value } }) =>
                                       changeInfo("title", value, date)
                                    }
                                    placeholder="title"
                                 />
                              </Col>
                              <Col md={4}>
                                 <Form.Control
                                    value={description}
                                    onChange={({ target: { value } }) =>
                                       changeInfo("description", value, date)
                                    }
                                    placeholder="description"
                                 />
                              </Col>
                              <Col md={4}>
                                 <Button
                                    onClick={() => removeInfo(date)}
                                    variant={"outline-danger"}
                                 >
                                    Delete
                                 </Button>
                              </Col>
                           </Row>
                        ))}
                  </>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="outline-danger" onClick={onHide}>
                  Close
               </Button>
               <Button variant="outline-success" onClick={addDevice}>
                  Add
               </Button>
            </Modal.Footer>
         </Modal>
      );
   }
);
