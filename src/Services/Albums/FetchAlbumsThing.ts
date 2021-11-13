import { store } from '@/Store'
import { updateAlbums } from '@/Store/Album'
import { albumThingsMapper } from '../DataMapper'
import api from '../index'
import fetchData, { ResponseType } from '../utils/fetchData'

export default (
  setData: React.Dispatch<React.SetStateAction<ResponseType>> = () => {},
): Promise<any> => {
  const request = api
    .get('/albums/thing/list', {
      timeout: 10000,
    })
    .then(response => {
      return albumThingsMapper(response.data?.results || [])
    })
    .then(results => {
      store.dispatch(updateAlbums({ albumsThing: results }))
      return results
    })

  return fetchData(request, setData)
}
