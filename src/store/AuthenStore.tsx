import { observable } from "mobx";
// import { IAccount } from "./AuthenStore.d";

class AuthStore {
  @observable isLogin: boolean;
  constructor() {
    this.isLogin = false;
  }

  initProfile() {
    return {
      id: 0,
      firstname: "",
      lastname: "",
      image: "",
    };
  }
}

export default new AuthStore();
