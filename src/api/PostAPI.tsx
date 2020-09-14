import APIManager from 'api'
import APIName from './APIName'
import { IComment, IPost } from 'store/PostStore.d'

class PostAPI {
  async createPost(post: IPost) {
    try {
      const data = post
      const response = await APIManager.post(APIName.post, data)
      return response.data
    } catch (error) {
      console.log('error ===>', error)
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      return ''
    }
  }

  async createComment(comment: IComment, PostId: string) {
    try {
      const data = comment
      const url = `${APIName.comment}/${PostId}`
      const response = await APIManager.patch(url, data)
      return response.data
    } catch (error) {
      console.log('error ===>', error)
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      return ''
    }
  }

  async getPosts() {
    try {
      const response = await APIManager.get(APIName.post)
      return response.data
    } catch (error) {
      console.log('error ===>', error)
      return ''
    }
  }
}

export default new PostAPI()
