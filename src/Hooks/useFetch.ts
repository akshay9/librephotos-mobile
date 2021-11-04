import { useState, useEffect } from 'react'

interface FetchProps<T> {
  promiseFn: () => Promise<any>
}

export const useFetch = <T>({ promiseFn }: FetchProps<T>) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    setLoading(true)
    promiseFn()
      .then((res: T) => {
        setData(res)
      })
      .catch(setError)
  }, [promiseFn])

  return { data, loading, error }
}
