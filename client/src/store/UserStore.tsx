import { makeAutoObservable } from "mobx";
import { UserProps, userInit } from "../utils/store-types";

export default class UserStore {
   private _isAuth: boolean;
   private _user: UserProps;

   constructor() {
      this._isAuth = false;
      this._user = userInit;
      makeAutoObservable(this);
   }

   setIsAuth(prop: boolean) {
      this._isAuth = prop;
   }
   setUser(prop: UserProps) {
      this._user = prop;
   }

   get isAuth() {
      return this._isAuth;
   }

   get user() {
      return this._user;
   }
}
