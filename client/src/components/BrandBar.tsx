import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { Context } from "..";

export const BrandBar = observer(() => {
   const { devices } = useContext(Context);
   return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
         {devices.brands.length > 0 &&
            devices.brands.map((brand) => (
               <Card
                  style={{ cursor: "pointer" }}
                  key={brand.id}
                  className="p-3"
                  onClick={() => devices.setSelectedBrand(brand)}
                  border={
                     brand.id === devices.selectedBrand.id ? "danger" : "light"
                  }
               >
                  {brand.name}
               </Card>
            ))}
      </div>
   );
});
