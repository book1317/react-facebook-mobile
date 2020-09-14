import APIManager from 'api'
import APIName from './APIName'
import { IRegister } from 'store/RegisterStore.d'

class RegisterAPI {
  async createProfile(
    firstname: string,
    lastname: string,
    username: string,
    password: string
  ) {
    try {
      const data: IRegister = {
        profile: {
          firstname: firstname,
          lastname: lastname,
        },
        account: {
          username: username,
          password: password,
        },
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
