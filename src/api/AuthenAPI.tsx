import APIManager from 'api'
import APIName from './APIName'
import { IAccount } from 'store/AuthenStore.d'

class AuthenAPI {
  async getProfileByAccount(account: IAccount) {
    try {
      const data = {
        username: account.username,
        password: account.password,
      }
      const response = await APIManager.post(APIName.login, data)
      return response.data
    } catch (err) {
      console.log(err)
      return ''
    }
  }

  async createProfile(
    firstname: string,
    lastname: string,
    username: string,
    password: string
  ) {
    try {
      console.log('Shoot API')
      const data = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
      }
      const response = await APIManager.post(APIName.register, data)
      return response.data
    } catch (err) {
      console.log(err)
    }
  }
}

export default new AuthenAPI()
