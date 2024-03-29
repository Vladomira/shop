import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";
import { GetUserData } from "../utils/store-types";

export const registration = async (
   email: string,
   password: string
): Promise<GetUserData> => {
   const { data } = await $host.post("api/user/registration", {
      email,
      password,
      role: "ADMIN",
   });
   localStorage.setItem("token", data.token);
   return jwt_decode(data.token);
};
export const login = async (
   email: string,
   password: string
): Promise<GetUserData> => {
   const { data } = await $host.post("api/user/login", {
      email,
      password,
   });
   localStorage.setItem("token", data.token);
   return jwt_decode(data.token);
};
export const checkUser = async (): Promise<GetUserData> => {
   const { data } = await $authHost.get("api/user/auth");
   localStorage.setItem("token", data.token);
   return jwt_decode(data.token);
};
