import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { Outlet, useNavigate } from "react-router-dom";
import { Context } from "../..";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { CustomLink } from "./CustomLink";

export const NavBar = observer(() => {
   const { user } = useContext(Context);
   let navigate = useNavigate();

   const logOut = () => {
      user.setUser({});
      user.setIsAuth(false);
   };
   return (
      <>
         <Navbar bg="dark" variant="dark">
            <Container>
               <CustomLink to={SHOP_ROUTE}>DeviceShop</CustomLink>
               <Nav className="ml-auto">
                  {user.isAuth ? (
                     <Nav>
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
