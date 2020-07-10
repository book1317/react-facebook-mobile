import { observable, action, toJS } from "mobx";
import profile1 from "../image/profile1.png";
import profile2 from "../image/profile2.png";
import profile3 from "../image/profile3.png";
import ProfileAPI from "../api/ProfileAPI";
import { IProfile } from "./ProfileStore.d";
import { IAccount } from "./AuthenStore.d";

export class ProfileStore {
  @observable profile: IProfile;
  @observable profiles: IProfile[];
  @observable isLogin: boolean;

  constructor() {
    this.profile = this.initProfile();
    this.profiles = this.initProfiles();
    this.isLogin = false;
  }

  initProfile() {
    return {
      id: "",
      firstname: "Raweewat",
      lastname: "Ngeabprasert",
      image: "",
    };
  }

  initProfiles() {
    return [
      {
        id: "",
        firstname: "",
        lastname: "",
        image: "",
      },
    ];
    //return this.PROFILE()[0];
  }

  @action
  setIsLogin(isLogin: boolean) {
    this.isLogin = isLogin;
  }

  @action
  async getProfileByAccount(account: IAccount) {
    const res = await ProfileAPI.getProfileByAccount(account);
    this.profile = res || this.initProfile();
  }

  @action
  getProfileByAccountJS() {
    return toJS(this.profile);
  }

  @action
  async getProfileById(id: number) {
    const res = await ProfileAPI.getProfileByID(id);
    this.profile = res || this.initProfile();
  }

  @action
  getProfileByIdJS() {
    return toJS(this.profile);
  }

  @action
  async getProfiles() {
    const res = await ProfileAPI.getProfiles();
    this.profiles = res || this.initProfiles();
  }

  @action
  getProfilesJS() {
    return toJS(this.profiles);
  }

  PROFILE(): any {
    return [
      {
        id: "5e93195d47938ea9ece87f26",
        firstname: "Raweewat",
        lastname: "Ngeabprasert",
        image: profile1,
      },
      {
        id: "5e93267bd172cbca9fb193cd",
        firstname: "Amornpat",
        lastname: "Jumpla",
        image: profile2,
      },
      {
        id: "5e93293d77d2db0f4249b3bb",
        firstname: "Wisarut",
        lastname: "Kawidam",
        image: profile3,
      },
    ];
  }
}

export default new ProfileStore();
