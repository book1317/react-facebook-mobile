import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import './homePageStyle.scss'
import {
  FaSearch,
  FaFacebookMessenger,
  FaMapMarkerAlt,
  FaVideo,
  FaImages,
} from 'react-icons/fa'
import { initPost, IPost, IPostStore } from 'store/PostStore.d'
import { IProfile, IProfileStore, initProfile } from 'store/ProfileStore.d'
// import StorySlider from './Story/StorySlider'
import Post from './Post/Post'
import facebook_image from 'image/logo.png'
import profileImage from 'image/profile1.png'

interface IHomePageProps {
  profile: IProfileStore
  post: IPostStore
}

interface IHomePageState {
  posts: IPost[]
  isLoading: boolean
  myProfile: IProfile
}

@inject('profile', 'post')
@observer
export default class HomePage extends React.Component<
  IHomePageProps,
  IHomePageState
> {
  state = {
    posts: [],
    isLoading: true,
    myProfile: initProfile,
  }

  async componentDidMount() {
    try {
      const myProfileId = this.props.profile.getMyProfileId()
      await this.props.profile.getMyProfileById(myProfileId)
      const myProfile = this.props.profile.getMyProfileJS()

      await this.props.post.getPosts()
      const posts = this.props.post.getPostsJS()
      this.setState({ posts, myProfile, isLoading: false })
    } catch (err) {}
  }

  handleKeyDown = async (e?: any) => {
    const { myProfile, posts } = this.state
    if (e.key === 'Enter' && e.target.value !== '') {
      let newPostData = initPost
      newPostData.content = e.target.value
      newPostData.ownerId = myProfile.id
      e.target.value = ''
      const newPost = await this.props.post.createPost(newPostData)
      const newPosts = posts.concat(newPost)
      if (newPost) {
        this.setState({ posts: newPosts })
      }
    }
  }

  render() {
    const { myProfile, posts, isLoading } = this.state

    return (
      <Fragment>
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
            {/* <StorySlider /> */}
            {posts.length > 0 &&
              posts.map((post: IPost) => (
                <Post postData={post} key={post.id} myProfile={myProfile} />
              ))}
            <div style={{ marginBottom: 60 }} />
          </div>
        )}
      </Fragment>
    )
  }
}
