export interface IPost {
  id?: string
  content: string
  like: number
  comments: IComment[]
  owner_id: string
}

export interface IComment {
  id?: string
  content: string
  like: number
  owner_id: string
}

export interface IPostStore {
  getPostsJS: () => IPost[]
  getPost: () => void
  createPost: (post: IPost) => any
  createComment: (comment: IComment, postId: string) => Promise<any>
}

export const initPost = {
  comments: [],
  content: '',
  like: 0,
  owner_id: '',
}

export const initComment = {
  content: '',
  like: 0,
  owner_id: '',
}
