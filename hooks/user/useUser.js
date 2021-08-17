import { useQuery } from 'react-query'
import api from '../../utils/api'
import { USER_URL } from '../../utils/constants'

const getUser = async ({ queryKey }) => {
  const token = queryKey[1]
  const { data } = await api().get(USER_URL, {
    headers: { Authorization: 'Bearer ' + token },
  })
  return data
}

export default function useUser(token, options = {}) {
  return useQuery([USER_URL, token], getUser, options)
}
