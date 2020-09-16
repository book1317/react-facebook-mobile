import React from 'react'
import { inject, observer } from 'mobx-react'
import { FaRegThumbsUp } from 'react-icons/fa'
import css from './postStyle.module.scss'
import { IComment } from 'store/PostStore.d'
import { initProfile, IProfile, IProfileStore } from 'store/ProfileStore.d'
import profileImage from 'image/profile1.png'

interface ICommentProps {
  comment: IComment
  profile?: IProfileStore
}
interface ICommentState {
  like: number
  count: number
  isLike: boolean
  ownerProfile: IProfile
}

@inject('profile')
@observer
export default class Comment extends React.Component<
  ICommentProps,
  ICommentState
> {
  constructor(props?: any) {
    super(props)
    this.state = {
      like: props.like || 0,
      count: 0,
      isLike: false,
      ownerProfile: initProfile,
    }
  }

  async componentDidMount() {
    const { comment } = this.props
    const ownerProfile =
      (await this.props.profile?.getOtherProfileById(comment.owner_id)) ||
      initProfile
    this.setState({ ownerProfile })
  }

  handleLikeButton = (e: any) => {
    const { isLike } = this.state
    if (isLike) this.setState({ like: this.state.like - 1 })
    else this.setState({ like: this.state.like + 1 })
    this.setState({ isLike: !isLike })
  }

  render() {
    const { content } = this.props.comment
    const { like, ownerProfile } = this.state
    return (
      <div className={css.commentContainer}>
        <img
          alt=""
          src={ownerProfile.image || profileImage}
          className={`${css.profileImage} ${css.circleContainer} ${css.mini}`}
        />
        <span className={css.commentText}>{content}</span>
        <div className={css.commentOptionContainer}>
          <div className={css.commentTimeText}>1 HOUR AGO</div>
          <div className={css.textAfterIcon} onClick={this.handleLikeButton}>
            Like
          </div>
          <div className={css.textAfterIcon}>Reply</div>
          <FaRegThumbsUp className={css.textAfterIcon} />
          <div className={css.textAfterIcon}>{like}</div>
        </div>
      </div>
    )
  }
}
