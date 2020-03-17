import { observable, action } from "mobx";
import profile1 from "../image/profile1.png";

export class ProfileStore {
  @observable profileImage = profile1;
  @observable name = "";

  @action
  setName(name: string) {
    this.name = name;
  }
}

let profileStore = new ProfileStore();
export default profileStore;
