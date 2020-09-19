import config from 'config'
import axios from 'axios'
import humps from 'humps'

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
      const jsonPayload = humps.decamelizeKeys(data)
      const url = `${baseURL}${path}`
      const response = await axios.post(url, jsonPayload, headers)
      const json = humps.camelizeKeys(response.data)
      return json
    } catch (err) {
      console.log('post error ====>', err)
      return err
    }
  }

  put = async (path: string, data: any) => {
    try {
      const jsonPayload = humps.decamelizeKeys(data)
      const url = `${baseURL}${path}`
      const response = await axios.put(url, jsonPayload, headers)
      const json = humps.camelizeKeys(response.data)
      return json
    } catch (err) {
      console.log('post error ====>', err)
      return err
    }
  }

  patch = async (path: string, data: any) => {
    try {
      const jsonPayload = humps.decamelizeKeys(data)
      const url = `${baseURL}${path}`
      const response = await axios.patch(url, jsonPayload, headers)
      const json = humps.camelizeKeys(response.data)
      return json
    } catch (err) {
      console.log('post error ====>', err)
      return err
    }
  }

  get = async (path: string) => {
    try {
      const url = `${baseURL}${path}`
      const response = await axios.get(url, headers)
      const json = humps.camelizeKeys(response.data)
      return json
    } catch (err) {
      console.log('get error ====>', err)
      return err
    }
  }
}

export default new APIManager()
