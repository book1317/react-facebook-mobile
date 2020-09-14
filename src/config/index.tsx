import configLocal from './config.local.json'

interface IConfig {
  baseURL: string
}

const getEnv = (env: string) => {
  switch (env) {
    case 'dev':
      return configLocal
    default:
      return configLocal
  }
}

const env = getEnv('dev')

const config: IConfig = {
  baseURL: env.baseURL,
}

export default config
