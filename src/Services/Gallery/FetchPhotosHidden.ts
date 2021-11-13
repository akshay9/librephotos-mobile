import { store } from '@/Store'
import { updateGallery } from '@/Store/Gallery'
import { photoMapper } from '../DataMapper'
import api from '../index'
import fetchData, { ResponseType } from '../utils/fetchData'

export default (
  setData: React.Dispatch<React.SetStateAction<ResponseType>> = () => {},
): Promise<any> => {
  const request = api
    .get('/photos/hidden/', {
      timeout: 10000,
    })
    .then(response => {
      return photoMapper(response.data?.results)
    })
    .then(results => {
      store.dispatch(updateGallery({ photosHidden: results }))
      return results
    })

  return fetchData(request, setData)
}
