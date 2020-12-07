import configLocal from './config.local'
import configProd from './config.prod'

interface IConfig {
  baseURL: string
}

const getEnv = (env: string) => {
  switch (env) {
    case 'dev':
      return configLocal
    default:
      return configProd
  }
}

const env = getEnv('dev')

const config: IConfig = {
  baseURL: env.baseURL,
}

export default config
