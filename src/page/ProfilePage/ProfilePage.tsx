import React from 'react'
import ProfileFriend from './ProfileFriend/ProfileFriend'
import ProfileMyImage from './ProfileMyImage/ProfileMyImage'
import css from './ProfilePage.module.scss'
import { inject, observer } from 'mobx-react'
import imageProfile from 'image/profile1.png'
import { IProfile, IProfileStore, initProfile } from 'store/ProfileStore.d'
import history from 'utils/History'
import { FaCamera } from 'react-icons/fa'

interface IProfilePageProps {
  profile: IProfileStore
  location?: any
}
interface IProfilePageState {
  myProfile: IProfile
}

@inject('profile')
@observer
export default class ProfilePage extends React.Component<
  IProfilePageProps,
  IProfilePageState
> {
  constructor(props: IProfilePageProps) {
    super(props)
    this.state = {
      myProfile: initProfile,
    }
  }

  async componentDidMount() {
    console.log('dimount')
    const pathname = history.location.pathname
    const splitPathname = pathname.split('/')

    let myProfile = this.props.profile.getMyProfileJS()
    if (splitPathname.length > 2) {
      console.log('splitPathname', splitPathname)
      const profileId = splitPathname.slice(-1)[0]
      await this.props.profile.getProfileById(profileId)
      myProfile = this.props.profile.getProfileJS()
    } else {
      const profileId = localStorage['myProfileId']
      console.log('profileId', profileId)

      await this.props.profile.getMyProfileById(profileId)
      myProfile = this.props.profile.getMyProfileJS()
    }
    // const param = qs.parse(this.props.location.search, {
    //   ignoreQueryPrefix: true,
    // })

    this.setState({ myProfile })
  }

  changeProfileImage = async (event: any) => {
    try {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(img)
        reader.onloadend = async () => {
          const { myProfile } = this.state
          const newImage = reader.result as any
          await this.props.profile.updateProfileImage(
            myProfile.id || '',
            newImage
          )
          const profileId = localStorage['myProfileId']
          await this.props.profile.getMyProfileById(profileId)
          const newProfile = this.props.profile.getMyProfileJS()
          this.setState({
            myProfile: newProfile,
          })
        }
      }
    } catch (err) {}
  }

  render() {
    const { myProfile } = this.state
    return (
      <div className={css.container}>
        <div className={css.header}>
          {myProfile.firstname} {myProfile.lastname}
        </div>
        <div className={css.imageContainer}>
          <img
            alt=""
            className={css.timeline}
            src={`https://img.huffingtonpost.com/asset/5dcc613f1f00009304dee539.jpeg?cache=QaTFuOj2IM&ops=crop_834_777_4651_2994%2Cscalefit_720_noupscale`}
          />

          <div className={css.profileImageContainer}>
            <img
              alt=""
              className={css.profileImage}
              src={myProfile.image || imageProfile}
            />
            <div className={css.cameraIcon}>
              <input
                type="file"
                className={css.profileImageInput}
                onChange={this.changeProfileImage}
              />
              <FaCamera size={20} color={'#1c76f2'} />
            </div>
          </div>
        </div>
        <div className={css.name}>
          <div>
            {myProfile.firstname} {myProfile.lastname}
          </div>
        </div>
        <div className={css.buttonContainer}>
          <button className={css.storyButton}>Add Friend</button>
          <button className={css.dotButton}>...</button>
        </div>
        <div className={css.detailContainer}>
          <span className={css.detailTopic}>Works at </span>
          <span className={css.detailText}>
            King Mongkut's Institute of Technology Ladkrabang
          </span>
        </div>
        <ProfileMyImage />
        <ProfileFriend />
      </div>
    )
  }
}
