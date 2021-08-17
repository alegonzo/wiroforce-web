import { useQuery } from 'react-query'
import api from '../../utils/api'
import { USERS_URL } from '../../utils/constants'

const getUsers = async ({ queryKey: [url, token, page, size, search] }) => {
  const { data } = await api().get(url, {
    headers: { Authorization: 'Bearer ' + token },
    params: {
      page,
      size,
      search,
    },
  })
  return data
}

export default function useUsers({ token, page, size, search }, options = {}) {
  return useQuery([USERS_URL, token, page, size, search], getUsers, options)
}
