import { store } from '@/Store/index'
import { getConfigFromState } from '../Config'

type CoverPhotoType = {
  image_hash: string
  video: boolean
}

type OwnerType = {
  first_name: string
  last_name: string
  username: string
}

type SourceMyAlbumType = {
  title: string
  created_on: string
  favorited: boolean
  id: number
  owner: OwnerType
  photo_count: number
  shared_to: Array<any>
  cover_photos: Array<CoverPhotoType>
}

export const myAlbumMapper = (myAlbumResult: SourceMyAlbumType[]) => {
  if (typeof myAlbumResult === 'undefined' || myAlbumResult.length < 1) {
    return []
  }

  let finalmap = myAlbumResult.map(item => {
    return {
      id: item.id,
      title: item.title,
      url:
        getConfigFromState(store.getState()).MEDIA_URL +
        '/square_thumbnails/' +
        item.cover_photos[0].image_hash,
    }
  })

  return finalmap
}
