import { IProfile } from './ProfileStore.d'

export interface IPost {
  id?: string
  content: string
  like: string[]
  comments: IComment[]
  ownerId: string
  ownerProfile?: IProfile
}

export interface IComment {
  id?: string
  content: string
  like: string[]
  ownerId: string
}

export interface IPostStore {
  getPostsJS: () => IPost[]
  getPosts: () => void
  getPostById: (postId: string) => Promise<IPost>
  createPost: (post: IPost) => any
  createComment: (comment: IComment, postId: string) => Promise<IPost>
}

export const initPost = {
  comments: [],
  content: '',
  like: [],
  ownerId: '',
}

export const initComment = {
  content: '',
  like: [],
  ownerId: '',
}
