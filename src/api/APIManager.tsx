import config from 'config'
import axios from 'axios'
import humps from 'humps'

const http = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
}

const baseURL = config.baseURL
const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
}

class APIManager {
  fetch = async (method: string, path: string, data?: any) => {
    try {
      const jsonPayload = humps.decamelizeKeys(data)
      const url = `${baseURL}${path}`
      let response = {}

      switch (method) {
        case http.GET:
          response = await axios.get(url, headers)
          break
        case http.POST:
          response = await axios.post(url, jsonPayload, headers)
          break
        case http.PUT:
          response = await axios.put(url, jsonPayload, headers)
          break
        case http.PATCH:
          response = await axios.patch(url, jsonPayload, headers)
          break
      }
      const json = humps.camelizeKeys(response)
      return json
    } catch (err) {
      console.log('post error ====>', err)
      return err
    }
  }

  get = async (path: string) => {
    const response = this.fetch(http.GET, path)
    return response
  }

  post = async (path: string, data: any) => {
    const response = this.fetch(http.POST, path, data)
    return response
  }

  put = async (path: string, data: any) => {
    const response = this.fetch(http.PUT, path, data)
    return response
  }

  patch = async (path: string, data: any) => {
    const response = this.fetch(http.PATCH, path, data)
    return response
  }
}

export default new APIManager()
