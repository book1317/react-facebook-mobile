import React from 'react'
import facebook_image from '../../image/logo.png'
import { Link } from 'react-router-dom'
import './homePageStyle.scss'
import {
  FaSearch,
  FaFacebookMessenger,
  FaMapMarkerAlt,
  FaVideo,
  FaImages,
} from 'react-icons/fa'
import { inject, observer } from 'mobx-react'
import StorySlider from './Story/StorySlider'
import Post from './Post/Post'
import { IPost, IPostStore } from 'store/PostStore.d'
import profileImage from 'image/profile1.png'
import { IProfile, IProfileStore } from 'store/ProfileStore.d'
import { initProfile } from 'store/ProfileStore'

type MyProps = { profile: IProfileStore; getProfiles?: any; post: IPostStore }
type MyState = {
  posts?: any[]
  message?: any
  data?: any
  isLoading: boolean
  myProfile?: IProfile
}

@inject('profile', 'post')
@observer
export default class HomePage extends React.Component<MyProps, MyState> {
  state = {
    posts: [],
    isLoading: true,
    message: 'eiei',
    myProfile: initProfile(),
  }

  onClickLogin = () => {}

  handleKeyDown = async (e?: any) => {
    const { myProfile, posts } = this.state
    console.log('e.value', e.target.value)
    if (e.key === 'Enter' && e.target.value !== '') {
      const newPostData: IPost = {
        content: e.target.value,
        like: 0,
        comments: [],
        owner: myProfile,
      }
      e.target.value = ''
      const newPost = await this.props.post.createPost(newPostData)
      const newPosts = posts.concat(newPost)
      this.setState({ posts: newPosts })
    }
  }

  async componentDidMount() {
    try {
    } finally {
      await this.props.post.getPost()
      const posts = this.props.post.getPostsJS()
      const myProfile = this.props.profile.getProfileJS()
      this.setState({ posts, myProfile, isLoading: false })
    }
  }

  render() {
    const { myProfile, posts, isLoading } = this.state

    return (
      <React.Fragment>
        {!isLoading && (
          <div className="home-page">
            <div className="home-header-container">
              <img alt="" className="home-facebook-logo" src={facebook_image} />
              <Link className="home-icon-container circle-container" to="/">
                <FaSearch className="home-header-icon" />
              </Link>
              <Link className="home-icon-container circle-container" to="/">
                <FaFacebookMessenger className="home-header-icon" />
              </Link>
            </div>
            <div className="home-above-content">
              <div className="home-profile-comment-container">
                <img
                  alt=""
                  src={myProfile.image || profileImage}
                  className="circle-container home-profile-image-container"
                />
                <input
                  className="home-profile-comment-input"
                  placeholder="What's on your mind?"
                  onKeyDown={this.handleKeyDown}
                />
              </div>
              <div className="home-option-container">
                <div className="home-option-icon-container">
                  <FaVideo className="home-option-icon video" />
                  <span className="text-after-icon">Live</span>
                  <div className="home-option-icon-border" />
                </div>
                <div className="home-option-icon-container">
                  <FaImages className="home-option-icon photo" />
                  <span className="text-after-icon">Photo</span>
                  <div className="home-option-icon-border" />
                </div>
                <div className="home-option-icon-container">
                  <FaMapMarkerAlt className="home-option-icon check-in" />
                  <span className="text-after-icon">Check-in</span>
                </div>
              </div>
            </div>
            <StorySlider />
            {posts.length > 0 &&
              posts.map((post: IPost) => (
                <Post postData={post} key={post.id} myProfile={myProfile} />
              ))}
            <div style={{ marginBottom: 60 }} />
          </div>
        )}
      </React.Fragment>
    )
  }
}

const defautlPost = [
  {
    id: '5e93195d47938ea9ece87f26',
    content: 'Breaking Newsssss',
    like: 10,
    comment: [
      { id: 2, content: 'hello', like: 0 },
      { id: 2, content: 'eiei', like: 2 },
    ],
    ownerProfile: {
      id: '',
      firstname: '',
      lastname: '',
      image: '',
    },
  },
]

const allPost = [
  {
    id: '5e93195d47938ea9ece87f26',
    content: 'Breaking Newsssss',
    like: 10,
    comment: [
      { id: '5e93267bd172cbca9fb193cd', content: 'hello', like: 0 },
      { id: '5e93267bd172cbca9fb193cd', content: 'eiei', like: 2 },
    ],
  },
  {
    id: '5e93267bd172cbca9fb193cd',
    content: 'Playing Timeeeeeeee',
    like: 15,
    comment: [
      { id: '5e93195d47938ea9ece87f26', content: 'haha', like: 0 },
      { id: '5e93293d77d2db0f4249b3bb', content: 'haha', like: 0 },
    ],
  },
  {
    id: '5e93293d77d2db0f4249b3bb',
    content: 'Ya Hu`````````',
    like: 15,
    comment: [],
  },
]
