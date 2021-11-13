import { AlbumType } from '@/Components/PreviewTile'
import { store } from '@/Store'
import { setPhotoViewData } from '@/Store/Album'

export default (albumItem: AlbumType, index: number): void => {
  store.dispatch(
    setPhotoViewData({
      loading: false,
      dataType: 'grid',
      data: store.getState().album.albumsThing[index].photos,
    }),
  )
}
