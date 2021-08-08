import axios from 'axios'
import handleError from '@/Services/utils/handleError'
import { Config } from '@/Config'
import { store, persistor } from '@/Store/index'
import AuthUser from '@/Store/Auth/AuthUser'
import { isRefreshTokenExpired } from './Auth/index'

// store.subscribe(listener)

function select(state) {
  return state.auth
}

// export function listener() {
//   var auth = select(store.getState())
//   if (auth.access) {
//     axios.defaults.headers.common.Authorization = 'Bearer ' + auth.access.token
//   }
// }

const instance = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
  },
  timeout: 500,
})

instance.interceptors.response.use(
  response => response,
  function (error) {
    console.log('Refreshing Token..')
    const originalRequest = error.config
    const dispatch = store.dispatch
    const authState = select(store.getState())

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isRefreshTokenExpired(authState)
    ) {
      originalRequest._retry = true

      const refreshToken = authState.refresh.token
      return instance
        .post(Config.API_URL + '/auth/token/refresh/', {
          refresh: refreshToken,
        })
        .then(response => {
          dispatch(AuthUser.action(response.data))

          axios.defaults.headers.common.Authorization =
            'Bearer ' + response.data.access
          originalRequest.headers.Authorization =
            'Bearer ' + response.data.access
          if (originalRequest.baseURL === originalRequest.url.substring(0, 5)) {
            originalRequest.baseURL = ''
          }
          return instance(originalRequest)
        })
    } else {
      console.log(
        'False Data',
        error.response.status,
        originalRequest._retry,
        isRefreshTokenExpired(authState),
      )
    }

    return Promise.reject(error)
  },
)

// instance.interceptors.response.use(
//   response => response,
//   ({ message, response: { data, status } }) => {
//     console.log(data)
//     return handleError({ message, data, status })
//   },
// )

instance.interceptors.response.use(
  response => response,
  ({ message, response: { data, status } }) => {
    console.log(data)
    return handleError({ message, data, status })
  },
)

export default instance