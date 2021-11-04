import { AlbumType } from '@/Components/PreviewTile'
import { store } from '@/Store/index'
import { extractBaseUrl } from '../Config'

type SourceAlbumPeopleType = {
  id: number
  name: string
  face_count: number
  face_photo_url: string
  face_url: string
}

export const albumPeopleMapper = (
  albumPeopleResult: SourceAlbumPeopleType[],
) => {
  if (
    typeof albumPeopleResult === 'undefined' ||
    albumPeopleResult.length < 1
  ) {
    return []
  }

  let finalmap = albumPeopleResult.map(item => {
    return {
      id: item.id,
      title: item.name,
      url:
        extractBaseUrl(store.getState()) +
        item.face_photo_url.replace('.webp', ''),
    } as AlbumType
  })

  return finalmap
}
