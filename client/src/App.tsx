import React, { useContext, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/AppRouter";
import "bootstrap/dist/css/bootstrap.css";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { checkUser } from "./api/userApi";
import { Spinner } from "react-bootstrap";
import { GetUserData } from "./utils/store-types";

const App = observer(() => {
   const { user } = useContext(Context);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      checkUser()
         .then((data: GetUserData) => {
            const { id } = data;
            user.setUser({ user: true, id: Number(id) });
            user.setIsAuth(true);
         })
         .catch((error) => AxiosError.ERR_BAD_RESPONSE)
         .finally(() => setLoading(false));
   }, []);
   if (loading) {
      return <Spinner animation={"border"} variant="dark" />;
   }

   return (
      <BrowserRouter>
         <AppRouter />
      </BrowserRouter>
   );
});

export default App;
