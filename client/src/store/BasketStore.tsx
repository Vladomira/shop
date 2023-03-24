import { makeAutoObservable } from "mobx";
import { DevicesProps } from "../utils/store-types";

export default class BasketStore {
   getBasketDevicesIds(arg0: string, getBasketDevicesIds: any) {
      throw new Error("Method not implemented.");
   }
   private _basketId: number | null;
   private _basketDevices: DevicesProps[];
   private _basketDevicesIds: number[];

   constructor() {
      this._basketId = null;
      this._basketDevices = [];
      this._basketDevicesIds = [];

      makeAutoObservable(this);
   }

   setBasketDevices(device: DevicesProps[]) {
      this._basketDevices = device;
   }
   setBasketId(id: number) {
      this._basketId = id;
   }
   setBasketDevicesIds(devices: number[]) {
      this._basketDevicesIds = devices;
   }

   get basketDevices() {
      return this._basketDevices;
   }
   get basketId() {
      return this._basketId;
   }
   get basketDevicesIds() {
      return this._basketDevicesIds;
   }
}
