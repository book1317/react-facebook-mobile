import { IProfile } from './ProfileStore.d'
import { initProfile } from './ProfileStore'

export interface IPost {
  id?: string
  content: string
  like: number
  comments: IComment[]
  owner: IProfile
}

export interface IComment {
  id?: string
  content: string
  like: number
  owner: IProfile
}

export interface IPostStore {
  getPostsJS: () => IPost[]
  getPost: () => void
  createPost: (post: IPost) => any
  createComment: (comment: IComment, postId: string) => Promise<any>
}

export const initPost = {
  id: '',
  comments: [],
  content: '',
  like: 0,
  isLike: false,
  owner: initProfile(),
}
