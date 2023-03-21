import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/AppRouter";
import "bootstrap/dist/css/bootstrap.css";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userApi";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
   const { user } = useContext(Context);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      check()
         .then((data) => {
            user.setUser(true);
            user.setIsAuth(true);
         })
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
