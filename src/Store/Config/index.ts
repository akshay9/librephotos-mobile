import { createSlice } from '@reduxjs/toolkit'
import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import { FileLogger } from 'react-native-file-logger'
import ChangeBaseURL from './ChangeBaseURL'
import ConfigureLogging from './ConfigureLogging'

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  baseurl: 'http://192.168.0.107:3000',
  logging: true,
} as ConfigState

const slice = createSlice({
  name: 'config',
  initialState:  {
    baseurl: 'http://192.168.0.107:3000',
    logging: true,
  } as ConfigState,
  reducers: {
    changeBaseURL: (state, { payload }) => {
      if (typeof payload.baseurl !== 'undefined') {
        state.baseurl = payload.baseurl
      }
    },
    configureLogging: (state, { payload }) => {
      if (typeof payload.logging !== 'undefined') {
        state.logging = payload.logging
  
        if (payload.logging === false) {
          FileLogger.debug('Logging: Enabled')
        } else {
          FileLogger.debug('Logging: Disabled')
          FileLogger.deleteLogFiles()
        }
      }
    }
  }
})

export const { changeBaseURL, configureLogging } = slice.actions

export default slice.reducer

// export default buildSlice(
//   'config',
//   [ChangeBaseURL, ConfigureLogging],
//   sliceInitialState,
// ).reducer

export type ConfigState = {
  baseurl: string
  logging: boolean
}
