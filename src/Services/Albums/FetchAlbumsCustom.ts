import { store } from '@/Store'
import { updateAlbums } from '@/Store/Album'
import { myAlbumMapper } from '../DataMapper'
import api from '../index'
import fetchData, { ResponseType } from '../utils/fetchData'

export default (
  setData: React.Dispatch<React.SetStateAction<ResponseType>> = () => {},
): Promise<any> => {
  const request = api
    .get('/albums/user/list', {
      timeout: 10000,
    })
    .then(response => {
      return myAlbumMapper(response.data?.results)
    })
    .then(results => {
      store.dispatch(updateAlbums({ albumsCustom: results }))
      return results
    })

  return fetchData(request, setData)
}
