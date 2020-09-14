import React from 'react'
import './postStyle.scss'
import { FaRegThumbsUp, FaShare, FaRegCommentAlt } from 'react-icons/fa'
import Comment from './Comment'
import { inject, observer } from 'mobx-react'
import profileImage from 'image/profile2.png'
import { IComment, IPost, IPostStore, initPost } from 'store/PostStore.d'
import { IProfile } from 'store/ProfileStore.d'

type MyProps = {
  myProfile: IProfile
  postData: IPost
  post?: IPostStore
}
type MyState = {
  isLike: boolean
  post: IPost
}

@inject('profile', 'post')
@observer
export default class Post extends React.Component<MyProps, MyState> {
  state = {
    isLike: false,
    post: initPost,
  }

  componentDidMount() {
    const { postData } = this.props
    this.setState({ post: postData })
  }

  handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      this.onComment(e)
    }
  }

  onComment = async (e: any) => {
    const { myProfile, postData } = this.props
    const newCommentData: IComment = {
      content: e.target.value,
      like: 0,
      owner: myProfile,
    }
    e.target.value = ''
    const postId = postData.id || ''
    const response = await this.props.post?.createComment(
      newCommentData,
      postId
    )
    const newPost: IPost = response.data
    if (newPost) {
      this.setState({ post: newPost })
    }
  }

  handleLikeButton = (e?: any) => {
    const { postData } = this.props
    const { isLike } = this.state
    if (isLike) postData.like--
    else postData.like++
    this.setState({ isLike: !isLike })
  }

  render() {
    const { post, isLike } = this.state
    const { owner, content, like, comments } = post
    const { firstname, lastname, image } = owner
    return (
      <div className="home-post-container">
        <div className="post-title-container">
          <img
            alt=""
            src={image || profileImage}
            className="post-profile-image circle-container"
          />
          <span className="post-profile-name">
            {(firstname && lastname && `${firstname} ${lastname}`) ||
              'Profile Name'}
          </span>
        </div>
        <div className="post-date">Yesterday at 12:13</div>
        <div className="post-content">{content}</div>
        <div className="post-status">
          <div>
            <FaRegThumbsUp />
            <span className="text-after-icon">{like}</span>
          </div>
          <div>
            <div className="right-detail">{comments.length} Comments</div>
          </div>
        </div>
        <div className="post-interact-container">
          <div className="post-item">
            <FaRegThumbsUp color={isLike ? '#3f98f3' : ''} />
            <span onClick={this.handleLikeButton} className="text-after-icon">
              Like
            </span>
          </div>
          <div className="post-item">
            <FaRegCommentAlt />
            <span className="text-after-icon">Comment</span>
          </div>
          <div className="post-item">
            <FaShare />
            <span className="text-after-icon">Share</span>
          </div>
        </div>

        {comments.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}

        <input
          className="post-comment-input"
          placeholder="Write a comment...."
          onKeyDown={this.handleKeyDown}
        />
      </div>
    )
  }
}
