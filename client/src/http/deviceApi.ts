import { $authHost, $host } from ".";

export const createType = async (type: string) => {
   const { data } = await $authHost.post("api/type", { name: type });
   return data;
};
export const fetchTypes = async () => {
   const { data } = await $host.get("api/type");
   return data;
};
export const createBrand = async (brand: string) => {
   const { data } = await $authHost.post("api/brand", { name: brand });
   return data;
};
export const fetchBrands = async () => {
   const { data } = await $host.get("api/brand");
   return data;
};
export const createDevice = async (device: {}) => {
   const { data } = await $authHost.post("api/device", device);
   return data;
};
export const fetchDevices = async (
   typeId?: number | string,
   brandId?: number | string,
   page?: number,
   limit: number = 5
) => {
   const { data } = await $host.get("api/device", {
      params: {
         typeId,
         brandId,
         page,
         limit,
      },
   });
   return data;
};
export const fetchDeviceById = async (id: string) => {
   const { data } = await $host.get(`api/device/${id}`);
   return data;
};
