import config from 'config'
import axios from 'axios'

const baseURL = config.baseURL
const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
}

class APIManager {
  post = async (path: string, data: any) => {
    try {
      const url = `${baseURL}${path}`
      const response = await axios.post(url, data, headers)
      return response
    } catch (err) {
      console.log('post error ====>', err)
      return err
    }
  }

  put = async (path: string, data: any) => {
    try {
      const url = `${baseURL}${path}`
      const response = await axios.put(url, data, headers)
      return response
    } catch (err) {
      console.log('post error ====>', err)
      return err
    }
  }

  patch = async (path: string, data: any) => {
    try {
      const url = `${baseURL}${path}`
      const response = await axios.patch(url, data, headers)
      return response
    } catch (err) {
      console.log('post error ====>', err)
      return err
    }
  }

  get = async (path: string) => {
    try {
      const url = `${baseURL}${path}`
      const response = await axios.get(url, headers)
      return response
    } catch (err) {
      console.log('get error ====>', err)
      return err
    }
  }
}

export default new APIManager()
