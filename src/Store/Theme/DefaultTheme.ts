import { createAction } from '@reduxjs/toolkit'
import { ThemePayload } from './theme.type'

export default {
  initialState: {},
  action: createAction('theme/setDefaultTheme'),
  reducers(state, { payload }: ThemePayload) {
    if (!state.theme) {
      state.theme = payload.theme
      state.darkMode = payload.darkMode
    }
  },
}
