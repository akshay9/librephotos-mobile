import { AxiosResponse } from 'axios'

export const defaultResponse = {
  loading: false,
  data: null,
  error: null,
} as ResponseType

export default function (
  promise: Promise<any>,
  setData: React.Dispatch<React.SetStateAction<ResponseType>>,
) {
  let response = { ...defaultResponse, ...{ loading: true } }
  setData(response)

  return promise
    .then((res: any) => {
      response.loading = false
      response.data = res.data

      setData({ ...response })
      return res.data
    })
    .catch(error => {
      console.log('Error', response, error)
      response.loading = false
      response.error = error

      setData({ ...response })

      // throw error
    })
}

export type ResponseType = {
  loading: boolean
  data: any
  error: AxiosResponse<any> | null
}
