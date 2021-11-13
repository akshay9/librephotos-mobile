import { AlbumType } from '@/Components/PreviewTile'
import FetchAlbumsCustom from './FetchAlbumsCustom'
import FetchAlbumsPeople from './FetchAlbumsPeople'
import FetchAlbumsThing from './FetchAlbumsThing'
import FetchPhotosCustomAlbum from './FetchPhotosCustomAlbum'
import FetchPhotosPersonAlbum from './FetchPhotosPersonAlbum'
import FetchPhotosThingAlbum from './FetchPhotosThingAlbum'

type PhotoServiceType = {
  [seriveName: string]: (albumItem: AlbumType, index: number) => any
}

export default {
  FetchPhotosCustomAlbum,
  FetchPhotosPersonAlbum,
  FetchPhotosThingAlbum,
} as PhotoServiceType

export { FetchAlbumsCustom, FetchAlbumsPeople, FetchAlbumsThing }
