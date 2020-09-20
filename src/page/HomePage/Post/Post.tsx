import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { FaRegThumbsUp, FaShare, FaRegCommentAlt } from 'react-icons/fa'
import css from './postStyle.module.scss'
import history from 'utils/History'
import {
  IComment,
  IPost,
  IPostStore,
  initPost,
  initComment,
} from 'store/PostStore.d'
import { initProfile, IProfile, IProfileStore } from 'store/ProfileStore.d'
import Comment from './Comment'
import profileImage from 'image/profile1.png'

interface IPostProps {
  profile?: IProfileStore
  myProfile: IProfile
  postData: IPost
  post?: IPostStore
}

interface IPostState {
  isLike: boolean
  post: IPost
  ownerProfile: IProfile
}

@inject('profile', 'post')
@observer
export default class Post extends Component<IPostProps, IPostState> {
  state = {
    isLike: false,
    post: initPost,
    ownerProfile: initProfile,
  }

  async componentDidMount() {
    const { postData } = this.props
    const ownerProfile =
      (await this.props.profile?.getOtherProfileById(postData.ownerId)) ||
      initProfile
    this.setState({ post: postData, ownerProfile })
  }

  getOwnerProfileById = (ownerId: string) => {
    const profiles = this.props.profile?.getOtherProfilesJs()
    const ownerProfile = profiles?.find((profile) => profile.id === ownerId)
    return ownerProfile
  }

  handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      this.onComment(e)
    }
  }

  onComment = async (e: any) => {
    const { myProfile, postData } = this.props
    let newCommentData: IComment = initComment
    newCommentData.content = e.target.value
    newCommentData.ownerId = myProfile.id || ''

    e.target.value = ''
    const postId = postData.id || ''
    const newPost: IPost = await this.props.post?.createComment(
      newCommentData,
      postId
    )!
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

  gotoOtherProfile = () => {
    const ownerId = this.state.ownerProfile.id
    history.push('/profile/' + ownerId)
  }

  render() {
    const { post, isLike, ownerProfile } = this.state
    const { content, like, comments } = post
    const { firstname, lastname, image } = ownerProfile

    return (
      <div className={css.postContainer}>
        <div className={css.titleContainer}>
          <img
            alt=""
            src={image || profileImage}
            className={`${css.profileImage} ${css.circleContainer}`}
            onClick={this.gotoOtherProfile}
          />
          <span className={css.profileName}>
            {(firstname && lastname && `${firstname} ${lastname}`) ||
              'Profile Name'}
          </span>
        </div>
        <div className={css.date}>Yesterday at 12:13</div>
        <div className={css.content}>{content}</div>
        <div className={css.status}>
          <div>
            <FaRegThumbsUp />
            <span className={css.textAfterIcon}>{like}</span>
          </div>
          <div>
            <div className={css.rightDetail}>{comments.length} Comments</div>
          </div>
        </div>
        <div className={css.interactContainer}>
          <div className={css.item}>
            <FaRegThumbsUp color={isLike ? '#3f98f3' : ''} />
            <span onClick={this.handleLikeButton} className={css.textAfterIcon}>
              Like
            </span>
          </div>
          <div className={css.item}>
            <FaRegCommentAlt />
            <span className={css.textAfterIcon}>Comment</span>
          </div>
          <div className={css.item}>
            <FaShare />
            <span className={css.textAfterIcon}>Share</span>
          </div>
        </div>

        {comments.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}

        <input
          className={css.commentInput}
          placeholder="Write a comment...."
          onKeyDown={this.handleKeyDown}
        />
      </div>
    )
  }
}
