import APIManager from 'api/APIManager'
import APIName from './APIName'
import { IComment, IPost } from 'store/PostStore.d'

class PostAPI {
  async createPost(post: IPost) {
    try {
      const data = post
      console.log('post', post)
      const response = await APIManager.post(APIName.posts, data)
      return response.data
    } catch (error) {
      console.log('error ===>', error)
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
      return ''
    }
  }

  async getPosts() {
    try {
      const response = await APIManager.get(APIName.posts)
      return response.data
    } catch (error) {
      console.log('error ===>', error)
      return ''
    }
  }

  async getPostById(postId: string) {
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
