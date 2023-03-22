export type TypesProps = {
   id: number | string;
   name: string;
};
export type DevicesProps = {
   id: number | string;
   name: string;
   price: number | null;
   rating: number | null;
   img: string;
};
export type BasketDevicesProps = DevicesProps & {
   brandId: number;
   createdAt: string;
   info: DeviceInfoProps[];
   typeId: number;
   updatedAt: string;
};
export type DeviceInfoProps = DevicesProps & {
   info: [{ title: string; description: string }];
};
export const initialDevice: DeviceInfoProps = {
   id: "",
   name: "",
   price: null,
   rating: null,
   img: "",
   info: [{ title: "", description: "" }],
};

export const initSelectedType: TypesProps = { id: "", name: "" };
export type UserProps = {
   user: boolean;
   id: number | null;
};
export const userInit = {
   user: false,
   id: null,
};
export type GetUserData = {
   email: string;
   exp: number;
   iat: number;
   id: number;
   role: string;
};
export type BasketData = {
   basketId: number;
   createdAt: string;
   deviceId: number;
   id: number;
   updatedAt: string;
};
