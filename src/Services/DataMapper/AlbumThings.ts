import { ImageType } from '@/Components/ImageGrid'
import { AlbumListItemType } from '@/Containers/Albums/AlbumListContainer'
import { store } from '@/Store/index'
import { getConfigFromState } from '../Config'

type CoverPhotoType = {
  image_hash: string
}

type SourceAlbumThingType = {
  id: number
  title: string
  cover_photos: CoverPhotoType[]
}

export const albumThingsMapper = (
  albumThingsResult: SourceAlbumThingType[],
) => {
  if (
    typeof albumThingsResult === 'undefined' ||
    albumThingsResult.length < 1
  ) {
    return []
  }

  let finalmap = albumThingsResult.map(item => {
    let photos = item.cover_photos.map((photo, index) => {
      return {
        id: index,
        url: photo.image_hash,
      } as ImageType
    })

    return {
      id: item.id + '',
      title: item.title,
      photos: photos,
      url:
        getConfigFromState(store.getState()).MEDIA_URL +
        '/square_thumbnails/' +
        item.cover_photos[0].image_hash,
    } as AlbumListItemType
  })

  return finalmap
}
