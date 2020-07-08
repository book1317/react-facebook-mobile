import { observable, action, toJS } from "mobx";

class FooterStore {
  @observable isShow: boolean;
  constructor() {
    this.isShow = true;
  }
}

export default new FooterStore();
