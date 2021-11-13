import { ImageType } from '@/Components/ImageGrid'
import { TimelineListItemType } from '@/Components/TimelineList'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'gallery',
  initialState: {
    photosWithTimestamp: [],
    photosWithoutTimestamp: [],
    photosFavourites: [],
    photosHidden: [],
    photosRecentlyAdded: [],
    photosPublic: [],
  } as GalleryState,
  reducers: {
    updateGallery: (state, action: PayloadAction<Partial<GalleryState>>) => {
      if (typeof action.payload.photosWithTimestamp !== 'undefined') {
        state.photosWithTimestamp = action.payload.photosWithTimestamp
      }
      if (typeof action.payload.photosWithoutTimestamp !== 'undefined') {
        state.photosWithoutTimestamp = action.payload.photosWithoutTimestamp
      }
      if (typeof action.payload.photosFavourites !== 'undefined') {
        state.photosFavourites = action.payload.photosFavourites
      }
      if (typeof action.payload.photosHidden !== 'undefined') {
        state.photosHidden = action.payload.photosHidden
      }
      if (typeof action.payload.photosRecentlyAdded !== 'undefined') {
        state.photosRecentlyAdded = action.payload.photosRecentlyAdded
      }
      if (typeof action.payload.photosPublic !== 'undefined') {
        state.photosPublic = action.payload.photosPublic
      }
    },
  },
})

export const { updateGallery } = slice.actions

export default slice.reducer

export type GalleryState = {
  photosWithTimestamp: TimelineListItemType[]
  photosWithoutTimestamp: ImageType[]
  photosFavourites: TimelineListItemType[]
  photosHidden: TimelineListItemType[]
  photosRecentlyAdded: ImageType[]
  photosPublic: TimelineListItemType[]
}
