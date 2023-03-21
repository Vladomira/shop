import { makeAutoObservable } from "mobx";

export default class UserStore {
   private _isAuth: boolean;
   private _user: {};

   constructor() {
      this._isAuth = false;
      this._user = {};
      makeAutoObservable(this);
   }

   setIsAuth(prop: boolean) {
      this._isAuth = prop;
   }
   setUser(prop: {}) {
      this._user = prop;
   }

   get isAuth() {
      return this._isAuth;
   }

   get user() {
      return this._user;
   }
}
