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

  constructor() {
    this.myProfile = this.initSchema();
    this.profile = this.initSchema();
    this.profiles = this.initSchema();
  }

  initSchema() {
    // return {
    //   id: 0,
    //   firstname: "",
    //   lastname: "",
    //   image: "",
    // };
    return this.PROFILE()[0];
  }

  @action
  setName(name: string) {
    // this.name = name;
  }

  // @action
  // getProfileById(id: number): any {
  //   return this.PROFILE().find((e: any) => e.id === id);
  // }

  @action
  async getProfileById(id: number) {
    const res = await ProfileAPI.getProfileByID(id);
    this.profile = res || this.initSchema();
  }

  @action
  getProfileByIdJS() {
    return toJS(this.profile);
  }

  @action
  async getProfiles() {
    const res = await ProfileAPI.getProfiles();
    this.profiles = res || this.initSchema();
  }

  @action
  getProfilesJS() {
    return toJS(this.profiles);
  }

  PROFILE(): any {
    return [
      {
        id: 1,
        firstname: "Raweewat",
        lastname: "Ngeabprasert",
        image: profile1,
      },
      { id: 2, firstname: "Amornpat", lastname: "Jumpla", image: profile2 },
      { id: 3, firstname: "Wisarut", lastname: "Kawidam", image: profile3 },
    ];
  }
}

export default new ProfileStore();
