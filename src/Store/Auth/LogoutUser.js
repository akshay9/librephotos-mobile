import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {
    access: {},
    refresh: {},
    isLoggedin: false,
  },
  action: createAction('auth/logoutUser'),
  reducers(state) {
    state.isLoggedin = false
    state.access = {}
    state.refresh = {}
  },
}
