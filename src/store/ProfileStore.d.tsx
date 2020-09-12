import { IAccount } from './AuthenStore.d'

export interface IProfile {
  id: string
  firstname: string
  lastname: string
  image: string
}

export interface IProfileStore {
  getProfileByAccount: (account: IAccount) => void
  getProfileJS: () => IProfile
  getProfilesJS: () => IProfile[]
  setProfile: (profile: IProfile) => void
  setIsLogin: (isLogin: boolean) => void
}
