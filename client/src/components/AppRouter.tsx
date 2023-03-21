import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Context } from "..";
import Shop from "../pages/Shop";
import { authRoutes, publicRoutes } from "../routes";
import ErrorPage from "./ErrorPage";
import { NavBar } from "./Layouts/Navbar";

export const AppRouter = () => {
   const { user } = useContext(Context);

   return (
      <div>
         <Routes>
            <Route path="/" element={<NavBar />}>
               <Route index element={<Shop />} />
               {publicRoutes.map(({ path, Component }) => {
                  return (
                     <Route key={path} path={path} element={<Component />} />
                  );
               })}
               {user.isAuth &&
                  authRoutes.map(({ path, Component }) => {
                     return (
                        <Route key={path} path={path} element={<Component />} />
                     );
                  })}

               <Route path="*" element={<ErrorPage />} />
            </Route>
         </Routes>
      </div>
   );
};
// {
//    /* <Route path={ADMIN_ROUTE} element={<Admin />} /> */
// }
// {
//    /* <Route path={BASKET_ROUTE + "/:id"} element={<DevicePage />} /> */
// }
// {
//    /* <Route path={BASKET_ROUTE} element={<Basket />} /> */
// }
// {
//    /* <Route path={LOGIN_ROUTE} element={<Auth />} /> */
// }
// {
//    /* <Route path={REGISTRATION_ROUTE} element={<Auth />} /> */
// }
