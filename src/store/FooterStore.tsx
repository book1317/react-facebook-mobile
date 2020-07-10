import { observable } from "mobx";

class FooterStore {
  @observable isShow: boolean;
  constructor() {
    this.isShow = true;
  }
}

export default new FooterStore();
