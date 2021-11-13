import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedin: false,
    access: {},
    refresh: {},
    authData: {},
  } as AuthState,
  reducers: {
    storeToken: (state, { payload }) => {
      if (typeof payload.access !== 'undefined') {
        state.access = {
          token: payload.access,
          ...jwtDecode(payload.access),
        }
      }
      if (typeof payload.refresh !== 'undefined') {
        state.refresh = {
          token: payload.refresh,
          ...jwtDecode(payload.refresh),
        }
      }

      state.isLoggedin = true
    },
    logoutUser: state => {
      state.isLoggedin = false
      state.access = {}
      state.refresh = {}
    },
  },
})

export const { storeToken, logoutUser } = slice.actions

export default slice.reducer

export type AuthState = {
  isLoggedin: boolean
  access: any
  refresh: any
  authData: any
}
