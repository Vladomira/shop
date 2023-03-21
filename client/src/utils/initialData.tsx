export type TypesProps = {
   id: number | string;
   name: string;
};
export const initialTypes: TypesProps[] = [
   {
      id: 1,
      name: "Tech",
   },
   {
      id: 2,
      name: "Phones",
   },
   {
      id: 3,
      name: "Laptops",
   },
   {
      id: 4,
      name: "TVs",
   },
];
export const initialBrands: TypesProps[] = [
   {
      id: 1,
      name: "Apple",
   },
   {
      id: 2,
      name: "Samsung",
   },
   {
      id: 3,
      name: "Lenovo",
   },
   {
      id: 4,
      name: "Asus",
   },
];
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
