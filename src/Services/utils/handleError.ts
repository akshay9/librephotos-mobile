export default function ({ config, message, data, status }: any) {
  console.log('Error: ', status, config.url)
  return Promise.reject({ message, data, status })
}
