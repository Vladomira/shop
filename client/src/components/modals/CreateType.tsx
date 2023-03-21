import React, { FC, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createType } from "../../http/deviceApi";
export type ModalProps = { show: boolean; onHide: () => void };

export const CreateType: FC<ModalProps> = ({ show, onHide }) => {
   const [value, setValue] = useState<string>("");
   const addType = () => {
      createType(value).then((data) => setValue(""));
      onHide();
   };

   return (
      <Modal centered show={show} onHide={() => onHide()}>
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               Add new type
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Form.Control
                  value={value}
                  onChange={({ target: { value } }) => setValue(value)}
                  placeholder={"Type the name of type"}
               />
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={() => onHide()} variant="outline-danger">
               Close
            </Button>
            <Button variant="outline-success" onClick={addType}>
               Добавить
            </Button>
         </Modal.Footer>
      </Modal>
   );
};
