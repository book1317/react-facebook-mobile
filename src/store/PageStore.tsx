import { observable, action, autorun } from "mobx";

export default class PageStores {
  @observable currentPage = { id: "-", name: "No Song" };

  @action
  addMusic(id: any, name: any) {
    this.currentPage = { id: id, name: name };
  }
}