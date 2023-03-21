import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Pagination } from "react-bootstrap";
import { Context } from "..";

export const Pages = observer(() => {
   const { devices } = useContext(Context);
   const pages = [];
   const pageCount = Math.ceil(devices.totalCount / devices.limit);

   for (let i = 0; i < pageCount; i++) {
      pages.push(i + 1);
   }
   return (
      <Pagination className="nt-5">
         {pages.length > 0 &&
            pages.map((page) => (
               <Pagination.Item
                  key={page}
                  active={devices.page === page}
                  onClick={() => devices.setPage(page)}
               >
                  {page}
               </Pagination.Item>
            ))}
      </Pagination>
   );
});
