import { useQuery } from 'react-query'
import { api } from '../../utils/api'
import { USER_URL } from '../../utils/constants'

const getUser = async ({ queryKey: [url] }) => {
  const { data } = await api(url)
  return data
}

export default function useUser(options = {}) {
  return useQuery([USER_URL], getUser, options)
}
