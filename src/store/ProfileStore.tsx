import { observable, action, toJS } from "mobx";
import profile1 from "../image/profile1.png";
import profile2 from "../image/profile2.png";
import profile3 from "../image/profile3.png";
import ProfileAPI from "../api/ProfileAPI";

export interface IProfile {
  id: number;
  firstname: string;
  lastname: string;
  image: string;
}

export class ProfileStore {
  @observable myProfile: IProfile;
  @observable profile: IProfile;
  @observable profiles: IProfile[];
  @observable isLogin: boolean;

  constructor() {
    this.myProfile = this.initProfileSchema();
    this.profile = this.initProfileSchema();
    this.profiles = this.initProfilesSchema();
    this.isLogin = true;
  }

  initProfileSchema() {
    return {
      id: 0,
      firstname: "",
      lastname: "",
      image: "",
    };
  }

  initProfilesSchema() {
    return [
      {
        id: 0,
        firstname: "",
        lastname: "",
        image: "",
      },
    ];
    //return this.PROFILE()[0];
  }

  @action
  async getProfileByAccount(username: string, password: string) {
    const res = await ProfileAPI.getProfileByAccount(username, password);
    this.profile = res || this.initProfileSchema();
  }

  @action
  getProfileByAccountJS() {
    return toJS(this.profile);
  }

  @action
  async getProfileById(id: number) {
    const res = await ProfileAPI.getProfileByID(id);
    this.profile = res || this.initProfileSchema();
  }

  @action
  getProfileByIdJS() {
    return toJS(this.profile);
  }

  @action
  async getProfiles() {
    const res = await ProfileAPI.getProfiles();
    this.profiles = res || this.initProfilesSchema();
    console.log("res====>", res);
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
