import { $authHost } from ".";

type UserBasketProps = {
   userId: string | number | null;
};
type BasketProps = UserBasketProps & {
   deviceId: string | number;
};

export const createBasketDevice = async ({ userId, deviceId }: BasketProps) => {
   const { data } = await $authHost.post("api/basket", { userId, deviceId });
   return data;
};

export const fetchUserBasket = async (userId: UserBasketProps) => {
   const { data } = await $authHost.get(`api/basket/${userId}`);
   return data;
};
// export const fetchBasketDevices = async () => {
//    const { data } = await $authHost.get(`api/basket`);
//    console.log("data", data);
//    return data;
// };
