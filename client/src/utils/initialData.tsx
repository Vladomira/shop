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
