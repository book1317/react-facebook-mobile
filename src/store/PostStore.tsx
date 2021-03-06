import { observable, toJS } from 'mobx'
import { IComment, IPost } from './PostStore.d'
import PostAPI from 'api/PostAPI'

class PostStore {
  @observable posts: IPost[]
  constructor() {
    this.posts = []
  }

  getPostsJS() {
    return toJS(this.posts)
  }

  createPost = async (post: IPost) => {
    const newPost = await PostAPI.createPost(post)
    return newPost
  }

  createComment = async (comment: IComment, postId: string) => {
    const response = await PostAPI.createComment(comment, postId)
    return response.data
  }

  getPosts = async () => {
    const resp = await PostAPI.getPosts()
    this.posts = resp?.data || []
  }

  getPostById = async (postId: string) => {
    const resp = await PostAPI.getPostById(postId)
    return resp.data
  }
}

export default new PostStore()
