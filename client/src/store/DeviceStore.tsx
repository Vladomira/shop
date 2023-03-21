import { makeAutoObservable } from "mobx";
import {
   initSelectedType,
   TypesProps,
   DevicesProps,
} from "../utils/initialData";

export default class DeviceStore {
   private _types: TypesProps[];
   private _brands: TypesProps[];
   private _devices: DevicesProps[];
   private _selectedType: TypesProps;
   private _selectedBrand: TypesProps;
   private _page: number;
   private _totalCount: number;
   private _limit: number;

   constructor() {
      this._types = [];
      this._brands = [];
      this._devices = [];
      this._selectedType = initSelectedType;
      this._selectedBrand = initSelectedType;
      this._page = 1;
      this._limit = 3;
      this._totalCount = 0;
      makeAutoObservable(this);
   }

   setTypes(prop: TypesProps[]) {
      this._types = prop;
   }
   setBrands(prop: TypesProps[]) {
      this._brands = prop;
   }
   setDevices(device: DevicesProps[]) {
      this._devices = device;
   }
   setSelectedType(type: TypesProps) {
      this._selectedType = type;
   }
   setSelectedBrand(brand: TypesProps) {
      this._selectedBrand = brand;
   }
   setPage(page: number) {
      this._page = page;
   }
   setLimit(limit: number) {
      this._limit = limit;
   }
   setTotalCount(count: number) {
      this._totalCount = count;
   }

   get types() {
      return this._types;
   }
   get brands() {
      return this._brands;
   }

   get devices() {
      return this._devices;
   }
   get selectedType() {
      this.setPage(1);
      return this._selectedType;
   }
   get selectedBrand() {
      this.setPage(1);
      return this._selectedBrand;
   }

   get page() {
      return this._page;
   }
   get limit() {
      return this._limit;
   }
   get totalCount() {
      return this._totalCount;
   }
}
