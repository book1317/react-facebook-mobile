import { observable, action, toJS } from 'mobx'
import profile1 from 'image/profile1.png'
import profile2 from 'image/profile2.png'
import profile3 from 'image/profile3.png'
import ProfileAPI from 'api/ProfileAPI'
import { IProfile, IProfileStore, initProfile } from './ProfileStore.d'
import { IAccount } from './AuthenStore.d'

class ProfileStore implements IProfileStore {
  @observable profile: IProfile
  @observable myProfile: IProfile
  @observable profiles: IProfile[]
  @observable otherProfiles: IProfile[]
  @observable isLogin: boolean
  @observable myProfileId: string

  constructor() {
    this.profile = initProfile
    this.myProfile = initProfile
    this.profiles = []
    this.isLogin = false
    this.otherProfiles = []
    this.myProfileId = ''
  }

  @action
  setIsLogin(isLogin: boolean) {
    this.isLogin = isLogin
  }

  getIsLogin() {
    return this.isLogin
  }

  @action
  async getProfileByAccount(account: IAccount) {
    const res = await ProfileAPI.getProfileByAccount(account)
    this.profile = res.data || initProfile
  }

  @action
  async setMyProfile(profile: IProfile) {
    this.myProfile = profile
  }

  @action
  async getMyProfileById(id: string) {
    try {
      let res = await ProfileAPI.getProfileByID(id)
      this.myProfile = res.data
    } catch {}
  }

  @action
  getMyProfileJS() {
    return toJS(this.myProfile)
  }

  @action
  getProfileByAccountJS() {
    return toJS(this.profile)
  }

  @action
  async getOtherProfileById(id: string) {
    const res = await ProfileAPI.getProfileByID(id)
    if (res) {
      this.otherProfiles.push(res.data)
      return res.data
    }
    return ''
  }

  @action
  getOtherProfilesJs() {
    return toJS(this.otherProfiles)
  }

  @action
  async getProfileById(id: string) {
    try {
      let res = await ProfileAPI.getProfileByID(id)
      this.profile = res.data
    } catch {}
  }

  @action
  getProfileJS() {
    return toJS(this.profile)
  }

  @action
  async getProfiles() {
    const res = await ProfileAPI.getProfiles()
    this.profiles = res.data || initProfile
  }

  @action
  getProfilesJS() {
    return toJS(this.profiles)
  }

  @action
  async updateProfileImage(id: string, imageProfile: string) {
    try {
      let res = await ProfileAPI.updateProfileImageByID(id, imageProfile)
      this.profile = res.data || initProfile
      return res.data
    } catch {}
  }

  @action
  setMyProfileId(id: string) {
    this.myProfileId = id
  }

  @action
  getMyProfileId() {
    return this.myProfileId
  }

  PROFILE(): any {
    return [
      {
        id: '5e93195d47938ea9ece87f26',
        firstname: 'Raweewat',
        lastname: 'Ngeabprasert',
        image: profile1,
      },
      {
        id: '5e93267bd172cbca9fb193cd',
        firstname: 'Amornpat',
        lastname: 'Jumpla',
        image: profile2,
      },
      {
        id: '5e93293d77d2db0f4249b3bb',
        firstname: 'Wisarut',
        lastname: 'Kawidam',
        image: profile3,
      },
    ]
  }
}

export default new ProfileStore()
