import APIManager from 'api/APIManager'
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

  async getProfileByID(id: string) {
    try {
      const res = await APIManager.get(`/profile/${id}`)
      return res.data
    } catch (err) {
      console.log(err)
      return ''
    }
  }

  async getProfileByAccount(account: IAccount) {
    try {
      // const data = {
      //   username: account.username,
      //   password: account.password,
      // }
      const res = await APIManager.post(APIName.login, account)
      return res.data
    } catch (err) {
      console.log(err)
      return ''
    }
  }

  async updateProfileImageByID(id: string, imageProfile: string) {
    try {
      const data = { image: imageProfile }
      const path = `${APIName.profile}/image/${id}`
      const res = await APIManager.patch(path, data)
      return res.data
    } catch (err) {
      console.log(err)
      return ''
    }
  }
}

export default new ProfileAPI()
