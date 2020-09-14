import React from 'react'
import { inject, observer } from 'mobx-react'
import { FaRegThumbsUp } from 'react-icons/fa'
import css from './postStyle.module.scss'
import { IComment } from 'store/PostStore.d'
import { IProfile } from 'store/ProfileStore.d'
import profileImage from 'image/profile1.png'

interface ICommentProps {
  comment: IComment
  profile?: IProfile
}
interface ICommentState {
  like: number
  count: number
  isLike: boolean
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
    }
  }

  handleLikeButton = (e: any) => {
    const { isLike } = this.state
    if (isLike) this.setState({ like: this.state.like - 1 })
    else this.setState({ like: this.state.like + 1 })
    this.setState({ isLike: !isLike })
  }

  render() {
    const { content, owner } = this.props.comment
    const { like } = this.state
    return (
      <div className={css.commentContainer}>
        <img
          alt=""
          src={owner.image || profileImage}
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
