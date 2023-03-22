import { makeAutoObservable } from "mobx";
import { DevicesProps } from "../utils/store-types";

export default class BasketStore {
   private _basketId: number | null;
   // private _basketDevicesInfo: DevicesProps[];
   private _basketDevicesIds: number[];

   constructor() {
      this._basketId = null;
      // this._basketDevicesInfo = [];
      this._basketDevicesIds = [];

      makeAutoObservable(this);
   }

   // setBasketDevices(devices: DevicesProps[]) {
   //    this._basketDevicesInfo = devices;
   // }
   setBasketId(id: number) {
      this._basketId = id;
   }
   setBasketDevicesIds(devices: number[]) {
      this._basketDevicesIds = devices;
   }

   // get basketDevices() {
   //    return this._basketDevicesInfo;
   // }
   get basketId() {
      return this._basketId;
   }
   get basketDevicesIds() {
      return this._basketDevicesIds;
   }
}
