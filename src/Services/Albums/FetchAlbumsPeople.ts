import { store } from '@/Store'
import { updateAlbums } from '@/Store/Album'
import { albumPeopleMapper } from '../DataMapper'
import api from '../index'
import fetchData, { ResponseType } from '../utils/fetchData'

export default (
  setData: React.Dispatch<React.SetStateAction<ResponseType>> = () => {},
): Promise<any> => {
  const request = api
    .get('/persons/', {
      timeout: 10000,
    })
    .then(response => {
      return albumPeopleMapper(response.data?.results)
    })
    .then(results => {
      store.dispatch(updateAlbums({ albumsPeople: results }))
      return results
    })

  return fetchData(request, setData)
}
