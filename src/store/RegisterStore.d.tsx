import {IAccount} from "./AuthenStore.d"

export interface IRegister {
    profile: {  
        firstname: string;
        lastname: string;
    }
    account: IAccount
  }
  