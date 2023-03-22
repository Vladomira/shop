import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import BasketStore from "./store/BasketStore";

export const Context = createContext({
   user: new UserStore(),
   devices: new DeviceStore(),
   basket: new BasketStore(),
});

const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement
);
root.render(
   <Context.Provider
      value={{
         user: new UserStore(),
         devices: new DeviceStore(),
         basket: new BasketStore(),
      }}
   >
      <React.StrictMode>
         <App />
      </React.StrictMode>
   </Context.Provider>
);

reportWebVitals();
