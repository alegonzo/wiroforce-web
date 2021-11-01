import { useQuery } from 'react-query'
import { api } from '../../utils/api'
import { USERS_URL } from '../../utils/constants'

const getUsers = async ({ queryKey: [url, page, size, search] }) => {
  const { data } = await api(url, {
    method: 'get',
    params: {
      page,
      size,
      search,
    },
  })
  return data
}

export default function useUsers({ page, size, search }, options = {}) {
  return useQuery([USERS_URL, page, size, search], getUsers, options)
}
