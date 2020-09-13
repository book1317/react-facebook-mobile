import { IProfile } from './ProfileStore.d'

export interface IPost {
  id?: string
  content: string
  like: number
  comments: IComment[]
  isLike?: boolean
  owner: IProfile
}

export interface IComment {
  id: string
  content: string
  like: number
  isLike: boolean
  owner: IProfile
}

export interface IPostStore {
  getPostsJS: () => IPost[]
  getPost: () => void
  createPost: (post: IPost) => any
}
