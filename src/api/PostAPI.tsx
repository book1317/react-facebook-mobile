import axios from 'axios'
import { IPost } from 'store/PostStore.d'

class PostAPI {
  async createPost(post: IPost) {
    try {
      const data = post
      console.log('data', post)
      const response = await axios.post(`http://localhost:8080/post`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
      return response.data
    } catch (error) {
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      return ''
    }
  }

  async getPosts() {
    try {
      const res = await axios.get(`http://localhost:8080/post`, {})
      return res.data
    } catch (err) {}
  }
}

export default new PostAPI()
