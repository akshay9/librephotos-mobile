import {
  buildAsyncState,
  buildAsyncActions,
  buildAsyncReducers,
} from '@thecodingmachine/redux-toolkit-wrapper'
import api from '@/Services'
import { preprocessserver } from '../../Services/Config'
import { getConfig } from '@/Config'
import AuthUser from './AuthUser'
import ChangeBaseURL from '../Config/ChangeBaseURL'

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions(
    'auth/loginUser',
    async ({ server, username, password }, { dispatch }) => {
      const baseurl = preprocessserver(server)

      await api
        .post(
          '/auth/token/obtain/',
          {
            username: username.trim(),
            password: password,
          },
          {
            baseURL: getConfig(baseurl).API_URL,
          },
        )
        .then(response => {
          dispatch(ChangeBaseURL.action({ baseurl: baseurl }))
          dispatch(AuthUser.action(response.data))
          dispatch(AuthUser.action({ isLoggedin: true }))
        })
    },
  ),
  reducers: buildAsyncReducers({ itemKey: null }), // We do not want to modify some item by default
}
