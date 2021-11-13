import { AlbumType } from '@/Components/PreviewTile'
import { AlbumListItemType } from '@/Containers/Albums/AlbumListContainer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'album',
  initialState: {
    albumsCustom: [],
    albumsPeople: [],
    albumsThing: [],

    photoViewData: { loading: false, dataType: 'grid', data: [] },
    albumViewData: { loading: false, data: [] },
  } as AlbumState,
  reducers: {
    setPhotoViewData: (
      state,
      action: PayloadAction<Partial<PhotoViewState>>,
    ) => {
      state.photoViewData = { ...state.photoViewData, ...action.payload }
    },
    setAlbumViewData: (
      state,
      action: PayloadAction<Partial<AlbumViewState>>,
    ) => {
      state.photoViewData = { ...state.photoViewData, ...action.payload }
    },
    updateAlbums: (state, action: PayloadAction<Partial<AlbumState>>) => {
      if (typeof action.payload.albumsCustom !== 'undefined') {
        state.albumsCustom = action.payload.albumsCustom
      }
      if (typeof action.payload.albumsPeople !== 'undefined') {
        state.albumsPeople = action.payload.albumsPeople
      }
      if (typeof action.payload.albumsThing !== 'undefined') {
        state.albumsThing = action.payload.albumsThing
      }
    },
  },
})

export const { setAlbumViewData, setPhotoViewData, updateAlbums } =
  slice.actions

export default slice.reducer

type PhotoViewState = {
  loading: boolean
  dataType: 'grid' | 'timeline'
  data: any
}

type AlbumViewState = {
  loading: false
  data: any
}

export type AlbumState = {
  albumsCustom: AlbumType[]
  albumsPeople: AlbumType[]
  albumsThing: AlbumListItemType[]

  photoViewData: PhotoViewState
  albumViewData: AlbumViewState
}
