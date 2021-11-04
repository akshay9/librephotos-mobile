import api from '../index'
import { getConfig } from '@/Config'
import { preprocessserver } from '../Config'

export default (
  server: string,
  username: string,
  password: string,
): Promise<any> => {
  const baseurl = preprocessserver(server)
  return api.post(
    '/auth/token/obtain/',
    {
      username: username.trim(),
      password: password,
    },
    {
      baseURL: getConfig(baseurl).API_URL,
    },
  )
}
