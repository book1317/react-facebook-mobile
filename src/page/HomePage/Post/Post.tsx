import React from 'react'
import './postStyle.scss'
import { FaRegThumbsUp, FaShare, FaRegCommentAlt } from 'react-icons/fa'
import Comment from './Comment'
import { inject, observer } from 'mobx-react'
import profileImage from 'image/profile2.png'
import { IComment, IPost, IPostStore } from 'store/PostStore.d'
import { IProfile } from 'store/ProfileStore.d'

type MyProps = {
  myProfile: IProfile
  postData: IPost
  post?: IPostStore
}
type MyState = {}

@inject('profile', 'post')
@observer
export default class Post extends React.Component<MyProps, MyState> {
  componentDidMount() {
    // this.setState({ ...this.props });
  }

  handleKeyDown = (e: any) => {
    console.log('type of', Object.prototype.toString.call(e))
    if (e.key === 'Enter' && e.target.value !== '') {
      this.onComment(e)
    }
  }

  onComment = async (e: any) => {
    const { myProfile, postData } = this.props
    const newCommentData: IComment = {
      content: e.target.value,
      like: 0,
      isLike: false,
      owner: myProfile,
    }
    // const newComment = await this.props.post?.createComment(newCommentData)
    // const newComments = this.props.postData.comments.concat(newComment as any)
    const newComments = postData.comments.concat(newCommentData as any)
    postData.comments = newComments
    e.target.value = ''
    this.setState({})
  }

  handleLikeButton = (e?: any) => {
    const { postData } = this.props
    if (postData.isLike) postData.like--
    else postData.like++
    postData.isLike = !postData.isLike
  }

  render() {
    const { postData } = this.props
    const { owner, content, like, comments, isLike } = postData
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
            {(firstname && `${firstname} ${lastname}`) || 'Profile Name'}
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

        {postData.comments.map((comment, index) => (
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
