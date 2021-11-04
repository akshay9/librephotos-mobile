import api from '../index'
import { store } from '@/Store/index'
import { AuthState, storeToken } from '@/Store/Auth'

function select(state: { auth: AuthState }) {
  return state.auth
}

export default async () => {
  const authState = select(store.getState())
  const refreshToken = authState.refresh.token

  const res = await api
    .post('/auth/token/refresh/', {
      refresh: refreshToken,
    })
    .then(response => {
      store.dispatch(storeToken(response.data))
      // return response.data
    })
    .catch(console.log)
  return res
}
