import APIManager from 'api'
import APIName from './APIName'
import { IRegister } from 'store/RegisterStore.d'
import { IProfile } from 'store/ProfileStore.d'
import { IAccount } from 'store/AuthenStore.d'

class RegisterAPI {
  async createProfile(profile: IProfile, account: IAccount) {
    try {
      const data: IRegister = {
        profile,
        account,
      }
      const response = await APIManager.post(APIName.register, data)
      return response.data
    } catch (err) {
      console.log(err)
      return ''
    }
  }
}

export default new RegisterAPI()
