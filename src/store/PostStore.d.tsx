export interface IPost {
  id?: string
  content: string
  like: number
  comments: IComment[]
  ownerId: string
}

export interface IComment {
  id?: string
  content: string
  like: number
  ownerId: string
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
  ownerId: '',
}

export const initComment = {
  content: '',
  like: 0,
  ownerId: '',
}
