import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";

export const Context = createContext({
   user: new UserStore(),
   devices: new DeviceStore(),
});

const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement
);
root.render(
   <Context.Provider
      value={{ user: new UserStore(), devices: new DeviceStore() }}
   >
      <React.StrictMode>
         <App />
      </React.StrictMode>
   </Context.Provider>
);

reportWebVitals();
