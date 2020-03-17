import { observable, action, autorun } from "mobx";
import profile1 from "../image/profile1.png";

export default class ProfileStore {
  @observable imageSrc = "/../image/profile1.png";

  @action
  addMusic(id: any, name: any) {
    // this.currentPage = { id: id, name: name };
  }
}
