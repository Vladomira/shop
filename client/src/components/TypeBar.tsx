import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import ListGroup from "react-bootstrap/ListGroup";

export const TypeBar = observer(() => {
   const { devices } = useContext(Context);
   return (
      <ListGroup>
         {devices.types.length > 0 &&
            devices.types.map((type) => {
               return (
                  <ListGroup.Item
                     key={type.id}
                     style={{ cursor: "pointer" }}
                     onClick={() => devices.setSelectedType(type)}
                     active={type.id === devices.selectedType.id}
                  >
                     {type.name}
                  </ListGroup.Item>
               );
            })}
      </ListGroup>
   );
});
