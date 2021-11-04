import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import ChangeBaseURL from './ChangeBaseURL'
import ConfigureLogging from './ConfigureLogging'

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  baseurl: 'http://192.168.0.107:3000',
  logging: true,
} as ConfigState

export default buildSlice(
  'config',
  [ChangeBaseURL, ConfigureLogging],
  sliceInitialState,
).reducer

export type ConfigState = {
  baseurl: string
  logging: boolean
}
