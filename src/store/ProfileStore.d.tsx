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
  getMyProfileById: (id: string) => void
  getMyProfileJS: () => IProfile
  setMyProfile: (profile: IProfile) => void
  setIsLogin: (isLogin: boolean) => void
  getIsLogin: () => boolean
  updateProfileImage: (id: string, pofileImage: string) => Promise<IProfile>
  setMyProfileId: (id: string) => void
  getMyProfileId: () => string
}

export const initProfile = {
  id: '',
  firstname: '',
  lastname: '',
  image: '',
}
