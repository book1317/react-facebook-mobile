import { observable, action, computed, autorun } from "mobx";
import profile1 from "../image/profile1.png";
import profile2 from "../image/profile2.png";
import profile3 from "../image/profile3.png";

export interface IProfileModel {
  id: number;
  name: string;
  sname: string;
  image: string;
}

export class ProfileStore {
  @observable pp = { a: 1, b: 2 };
  @observable id = PROFILE[0].id;
  @observable name = PROFILE[0].name;
  @observable sname = PROFILE[0].sname;
  @observable image = PROFILE[0].image;

  @computed
  get aaa() {
    return this.pp.a;
  }

  @action
  setName(name: string) {
    this.name = name;
  }

  @action
  getProfileById(id: number): any {
    return PROFILE.find(e => e.id === id);
  }

  @action
  setProfileById(id: number): any {
    PROFILE.find(e => e.id === id);
  }
}

export default new ProfileStore();

const PROFILE = [
  {
    id: 0,
    name: "Raweewat",
    sname: "Ngeabprasert",
    image: profile1
  },
  { id: 1, name: "Amornpat", sname: "Jumpla", image: profile2 },
  { id: 2, name: "Wisarut", sname: "Kawidam", image: profile3 }
];
