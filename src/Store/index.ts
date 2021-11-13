import AsyncStorage from '@react-native-async-storage/async-storage'
import { AnyAction, combineReducers, Reducer } from 'redux'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { getConfig } from '@/Config'

import api from '@/Services/index'

import auth, { AuthState } from './Auth'
import album from './Album'
import config from './Config'
import photos from './Photos'
import gallery from './Gallery'
import gallerylist from './GalleryList'
import startup from './Startup'
import search from './Search'
import theme from './Theme'

const reducers = combineReducers({
  auth,
  album,
  config,
  photos,
  gallery,
  gallerylist,
  startup,
  search,
  theme,
})

// Reset Redux Store in case of User Logout
export type RootState = ReturnType<typeof reducers>
const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'USER_LOGOUT') {
    state = {} as RootState
  }
  return reducers(state, action)
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'config', 'gallery', 'theme'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })

    middlewares.push(thunk)

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
      console.log('Debugging..')
    }

    return middlewares
  },
})

store.subscribe(listener)

function select(state: { auth: AuthState }) {
  return state.auth
}

function listener() {
  var authState = select(store.getState())
  if (authState.access) {
    api.defaults.headers.common.Authorization =
      'Bearer ' + authState.access.token
  }

  api.defaults.baseURL = getConfig(store.getState().config.baseurl).API_URL
}

const persistor = persistStore(store)

export { store, persistor }
