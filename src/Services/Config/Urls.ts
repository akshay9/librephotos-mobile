import { ConfigState } from '@/Store/Config'

export const extractBaseUrl = (state: { config: ConfigState }) =>
  state.config.baseurl

export const getConfig = (BASE_URL = 'https://localhost:3000') => {
  return {
    BASE_URL: BASE_URL,
    API_URL: BASE_URL + '/api',
    MEDIA_URL: BASE_URL + '/media',
  }
}

export const getConfigFromState = (state: { config: ConfigState }) =>
  getConfig(extractBaseUrl(state))
