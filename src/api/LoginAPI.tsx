import APIManager from 'api/APIManager'
import APIName from './APIName'
import { IAccount } from 'store/AuthenStore.d'

class LoginAPI {
  async login(account: IAccount) {
    try {
      const data = account
      const response = await APIManager.post(APIName.login, data)
      return response.data
    } catch (error) {
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      return ''
    }
  }
}

export default new LoginAPI()
