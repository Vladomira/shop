import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Card, Form, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userApi";
import { Notification } from "../components/Notification";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { AxiosError } from "axios";

type ErrorType = { data: { message: string } };

const Auth = observer(() => {
   const { user } = useContext(Context);
   const location = useLocation();
   let navigate = useNavigate();
   const isLogin = location.pathname === LOGIN_ROUTE;
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");

   const onClick = async () => {
      try {
         let data;
         if (isLogin) {
            data = await login(email, password);
         } else {
            data = await registration(email, password);
         }
         user.setUser(user);
         user.setIsAuth(true);
         data && navigate(SHOP_ROUTE);
      } catch (error) {
         const err = error as AxiosError;
         if (err.response) {
            const { data } = err.response as ErrorType;

            toast.error(data?.message);
         }
      }
   };

   return (
      <Container
         className="d-flex justify-content-center align-items-center"
         style={{ height: window.innerHeight - 54 }}
      >
         <Card style={{ width: 600 }} className="p-5">
            <h2 className="m-auto">
               {isLogin ? "Authorization" : "Registartion"}
            </h2>
            <Form className="d-flex flex-column">
               <FormControl
                  className="mt-3"
                  placeholder="Type your email"
                  onChange={({ target: { value } }) => setEmail(value)}
               />
               <FormControl
                  className="mt-3"
                  placeholder="Type your password"
                  type="password"
                  onChange={({ target: { value } }) => setPassword(value)}
               />
               <div
                  style={{
                     marginTop: 6,
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "space-between",
                  }}
               >
                  {isLogin ? (
                     <div>
                        No account yet?
                        <NavLink
                           to={REGISTRATION_ROUTE}
                           style={{ marginLeft: "4px" }}
                        >
                           Signin
                        </NavLink>
                     </div>
                  ) : (
                     <div>
                        Already have an account?
                        <NavLink to={LOGIN_ROUTE} style={{ marginLeft: "4px" }}>
                           Log in
                        </NavLink>
                     </div>
                  )}

                  <Button
                     variant="outline-success"
                     className="mt-3 align-self-end"
                     onClick={onClick}
                  >
                     {isLogin ? "Login" : "Signin"}
                  </Button>
               </div>
            </Form>
         </Card>
         <Notification />
      </Container>
   );
});

export default Auth;
