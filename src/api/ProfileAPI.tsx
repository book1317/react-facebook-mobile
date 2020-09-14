import APIManager from 'api'
import APIName from './APIName'
import { IAccount } from 'store/AuthenStore.d'

class ProfileAPI {
  async getProfiles() {
    try {
      const res = await APIManager.get(`/profiles`)
      return res.data
    } catch (err) {
      console.log(err)
      return ''
    }
  }

  async getProfileByID(id: number) {
    try {
      const res = await APIManager.get(`/get_profiles/${id}`)
      return res.data
    } catch (err) {
      console.log(err)
      return ''
    }
  }

  async getProfileByAccount(account: IAccount) {
    try {
      const data = {
        username: account.username,
        password: account.password,
      }
      const res = await APIManager.post(APIName.login, data)
      return res.data
    } catch (err) {
      console.log(err)
      return ''
    }
  }
}

export default new ProfileAPI()
