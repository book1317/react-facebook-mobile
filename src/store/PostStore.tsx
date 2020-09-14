import { observable, toJS } from 'mobx'
import { IComment, IPost } from './PostStore.d'
import PostAPI from 'api/PostAPI'
import { initProfile } from './ProfileStore'
class PostStore {
  @observable posts: IPost[]
  constructor() {
    this.posts = initPosts()
  }

  getPostsJS() {
    return toJS(this.posts)
  }

  createPost = async (post: IPost) => {
    const newPost = await PostAPI.createPost(post)
    return newPost
  }

  createComment = async (comment: IComment, postId: string) => {
    const newComment = await PostAPI.createComment(comment, postId)
    return newComment
  }

  getPost = async () => {
    const resp = await PostAPI.getPosts()
    console.log('resp', resp)
    this.posts = resp || initPosts()
  }
}

export const initPost = () => ({
  id: '5e93195d47938ea9ece87f26',
  comments: [],
  content: 'Breaking Newsssss',
  like: 0,
  isLike: false,
  owner: initProfile(),
})

const initPosts = () => [
  {
    id: '5e93195d47938ea9ece87f26',
    content: 'Breaking Newsssss',
    like: 0,
    isLike: false,
    owner: {
      id: '',
      firstname: '',
      lastname: '',
      image: '',
    },
    comments: [
      {
        id: '5e93267bd172cbca9fb193cd',
        content: 'hello',
        like: 0,
        isLike: false,
        owner: {
          id: '',
          firstname: '',
          lastname: '',
          image: '',
        },
      },
      {
        id: '5e93267bd172cbca9fb193cd',
        content: 'eiei',
        like: 0,
        isLike: false,
        owner: {
          id: '',
          firstname: '',
          lastname: '',
          image: '',
        },
      },
    ],
  },
  {
    id: '5e93195d47938ea9ece87f26',
    content: 'Hello World',
    like: 0,
    isLike: false,
    owner: {
      id: '',
      firstname: '',
      lastname: '',
      image: '',
    },
    comments: [
      {
        id: '5e93267bd172cbca9fb193cd',
        content: 'hello',
        like: 0,
        isLike: false,
        owner: {
          id: '',
          firstname: '',
          lastname: '',
          image: '',
        },
      },
      {
        id: '5e93267bd172cbca9fb193cd',
        content: 'eiei',
        like: 0,
        isLike: false,
        owner: {
          id: '',
          firstname: '',
          lastname: '',
          image: '',
        },
      },
    ],
  },
]

export default new PostStore()
