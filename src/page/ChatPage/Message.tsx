import React from 'react'
import { MdThumbUp } from 'react-icons/md'
import css from './Message.module.scss'

interface IMessageProp {
  message: string
  isMine?: boolean
}
interface IMessageState {}
export default class Message extends React.PureComponent<
  IMessageProp,
  IMessageState
> {
  render() {
    const { message } = this.props
    return (
      <div
        className={
          this.props.isMine ? css.myMessageContainer : css.otherMessageContainer
        }
      >
        {message !== '/like' ? (
          <div className={css.messageBorder}>{message}</div>
        ) : (
          <MdThumbUp size={50} color={'#3f98f3'} />
        )}
      </div>
    )
  }
}
