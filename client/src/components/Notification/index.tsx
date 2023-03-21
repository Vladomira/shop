import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Notification() {
   return <ToastContainer autoClose={3000} />;
}
