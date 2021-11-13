import { AlbumType } from '@/Components/PreviewTile'
import { store } from '@/Store'
import { setPhotoViewData } from '@/Store/Album'
import { photoMapper } from '../DataMapper'
import api from '../index'

export default (albumItem: AlbumType, _index: number): Promise<any> => {
  store.dispatch(setPhotoViewData({ loading: true, data: [] }))

  const request = api
    .get('/albums/user/' + albumItem.id, {
      timeout: 10000,
    })
    .then(response => {
      return photoMapper(response.data?.grouped_photos || [])
    })
    .then(results => {
      store.dispatch(
        setPhotoViewData({
          loading: false,
          dataType: 'timeline',
          data: results,
        }),
      )
      return results
    })

  return request
}
