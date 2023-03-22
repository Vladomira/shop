import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { Outlet, useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";

import { Context } from "../..";
import {
   ADMIN_ROUTE,
   BASKET_ROUTE,
   LOGIN_ROUTE,
   SHOP_ROUTE,
} from "../../utils/consts";
import { CustomLink } from "./CustomLink";
import basketImg from "../../assets/basket.png";
import { fetchUserBasket } from "../../api/basketApi";
import { userInit, BasketData } from "../../utils/store-types";

export const NavBar = observer(() => {
   const { user, basket } = useContext(Context);
   let navigate = useNavigate();
   const [userBasket, setUserBasket] = useState<number | null>(null);

   const logOut = () => {
      user.setUser(userInit);
      user.setIsAuth(false);
      localStorage.setItem("token", "");
      navigate(SHOP_ROUTE);
   };
   useEffect(() => {
      user?.user?.id &&
         fetchUserBasket({ userId: user.user.id }).then(
            (data: BasketData[]) => {
               setUserBasket(data.length);
               basket.setBasketId(data[0].basketId);
               basket.setBasketDevicesIds(data.map(({ deviceId }) => deviceId));
            }
         );
   }, [user.user.id]);

   return (
      <>
         <Navbar bg="dark" variant="dark" className="pt-3 pb-3">
            <Container>
               <CustomLink to={SHOP_ROUTE}>DeviceShop</CustomLink>
               <Nav className="ml-auto">
                  {user.isAuth ? (
                     <Nav>
                        {/* <NavLink to={ADMIN_ROUTE}>Admin panel</NavLink>
                        <NavLink to={""} onClick={() => logOut()}>
                           {" "}
                           Out
                        </NavLink> */}
                        <Button
                           variant="secondary"
                           onClick={() => navigate(ADMIN_ROUTE)}
                        >
                           Admin panel
                        </Button>
                        <Button
                           variant="secondary"
                           onClick={() => logOut()}
                           style={{ marginLeft: "12px" }}
                        >
                           Out
                        </Button>
                        <Button
                           variant="secondary"
                           onClick={() => navigate(BASKET_ROUTE)}
                           className="d-flex align-items-center justify-content-center"
                           style={{
                              marginLeft: "12px",
                              padding: 0,
                              border: "2px solid #6c757d",
                              position: "relative",
                           }}
                        >
                           <Image
                              width={35}
                              height={40}
                              src={basketImg}
                              rounded
                           />
                           <p
                              style={{
                                 position: "absolute",
                                 color: "#6c757d",
                                 background: "gold",
                                 padding: "0px 6px",
                                 borderRadius: "100%",
                                 fontWeight: 700,
                                 top: "-10px",
                                 right: "-10px",
                              }}
                           >
                              {userBasket}
                           </p>
                        </Button>
                     </Nav>
                  ) : (
                     <Nav>
                        <Button
                           variant="secondary"
                           onClick={() => navigate(LOGIN_ROUTE)}
                        >
                           Authorization
                        </Button>
                     </Nav>
                  )}
               </Nav>
            </Container>
         </Navbar>

         <main
            style={{
               display: "flex",
               justifyContent: "center",
               flexDirection: "column",
               padding: "0px 16px",
            }}
         >
            <Outlet />
         </main>
      </>
   );
});
