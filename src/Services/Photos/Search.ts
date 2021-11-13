import api from '@/Services'

export default async (query: string) => {
  const res = await api
    .get('/photos/searchlist/?search=' + encodeURI(query), {
      timeout: 2000,
    })
    .then(response => {
      return response.data
    })
  return res
}
