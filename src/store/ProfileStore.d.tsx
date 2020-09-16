import { IAccount } from './AuthenStore.d'

export interface IProfile {
  id?: string
  firstname: string
  lastname: string
  image: string
}

export interface IProfileStore {
  getProfileByAccount: (account: IAccount) => void
  getOtherProfileById: (id: string) => Promise<IProfile>
  getOtherProfilesJs: () => IProfile[]
  getProfileById: (id: string) => void
  getProfileJS: () => IProfile
  getProfilesJS: () => IProfile[]
  getMyProfileJS: () => IProfile
  setMyProfile: (profile: IProfile) => void
  setIsLogin: (isLogin: boolean) => void
  getIsLogin: () => boolean
}

export const initProfile = {
  id: '',
  firstname: '',
  lastname: '',
  image: '',
}
